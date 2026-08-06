

"use client";

import { useEffect, useState } from "react";

export default function RecordsPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [search, setSearch] = useState("");
  const [deletedRecord, setDeletedRecord] = useState<any | null>(null);
  const [undoTimer, setUndoTimer] = useState<number | null>(null);

  
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch("/api/reports");
        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          setRecords(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch records:", error);
        
        const localData = JSON.parse(localStorage.getItem("records") || "[]");
        setRecords(localData);
      }
    };

    fetchRecords();
  }, []);

  const handleDelete = async (id: string | number) => {
    try {
      const mongoId = typeof id === "string" ? id : String(id);

      const recordToDelete = records.find((r) => r._id === mongoId || r.id === mongoId);
      if (!recordToDelete) {
        alert("Record not found");
        return;
      }

      const response = await fetch(`/api/reports/${mongoId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        const updated = records.filter((r) => r._id !== mongoId && r.id !== mongoId);
        setRecords(updated);
        setDeletedRecord(recordToDelete);

        if (undoTimer) {
          window.clearTimeout(undoTimer);
        }

        const timer = window.setTimeout(() => {
          setDeletedRecord(null);
          setUndoTimer(null);
        }, 10000);

        setUndoTimer(timer);
      } else {
        alert("Failed to delete record");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete record");
    }
  };

  const restoreDeletedRecord = async () => {
    if (!deletedRecord) return;

    try {
      const restoreData = { ...deletedRecord };
      delete restoreData._id;

      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(restoreData),
      });

      const result = await response.json();

      if (result.success) {
        setRecords([result.data, ...records]);
        setDeletedRecord(null);
        if (undoTimer) window.clearTimeout(undoTimer);
        setUndoTimer(null);
      } else {
        alert("Failed to restore report");
      }
    } catch (error) {
      console.error("Restore error:", error);
      alert("Failed to restore report");
    }
  };

  // Print
  const handlePrint = () => {
    window.print();
  };

  // Filtered records
  const filteredRecords = records.filter((r) =>
    (r.patient?.patientName || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    (r.testName || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 p-8">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-6 text-slate-800">
        📋 Lab Records
      </h1>

      {/* SEARCH BAR */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by patient or test name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {deletedRecord && (
        <div className="mb-4 rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-900 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold">Report deleted</p>
              <p className="text-sm text-emerald-800">
                Undo to restore the deleted report within 10 seconds.
              </p>
            </div>
            <button
              onClick={restoreDeletedRecord}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-white shadow-sm hover:bg-emerald-700"
            >
              Undo Restore
            </button>
          </div>
        </div>
      )}

      {/* RECORDS LIST */}
      {filteredRecords.length === 0 ? (
        <p className="text-gray-500">No records found</p>
      ) : (
        <div className="space-y-4">
          {filteredRecords.map((r) => (
            <div
              key={r._id}
              className="bg-white p-5 rounded-2xl shadow-md flex justify-between items-center hover:shadow-xl transition"
            >

              {/* LEFT */}
              <div>
                <p className="font-semibold text-lg text-slate-800">
                  {r.patient?.patientName || r.patientName || "No Patient"}
                </p>

                <p className="text-gray-600 text-sm">
                  Report ID: {r.reportId || r._id}
                </p>

                <p className="text-gray-500 text-sm">
                  {new Date(r.createdAt || r.date).toLocaleString()}
                </p>

                <div className="mt-3 space-y-1 text-sm text-slate-600">
                  <p className="font-medium text-slate-700">
                    {r.testName || r.title || "Report"}
                  </p>
                  {r.patient?.labNo && (
                    <p>Lab No: {r.patient.labNo}</p>
                  )}
                  {Array.isArray(r.tests) && r.tests.length > 0 && (
                    <p>
                      {r.tests[0].testName || r.tests[0].title || "Test"} • {r.tests[0].result || r.tests[0].col2 || ""}
                    </p>
                  )}
                  {Array.isArray(r.rows) && r.rows.length > 0 && (
                    <p>
                      {r.rows[0].col1 || r.rows[0].test || ""} • {r.rows[0].col2 || r.rows[0].result || ""}
                    </p>
                  )}
                </div>
              </div>

              {/* RIGHT BUTTONS */}
              <div className="flex gap-3">

                <button
                onClick={() => {
                  const pdfUrl = r.pdfUrl || r.url;

                  if (pdfUrl) {
                    window.open(pdfUrl, "_blank", "noopener,noreferrer");
                  }
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm shadow"
              >
                View
              </button>

                <button
                  onClick={() => handleDelete(String(r._id))}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm shadow"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-2xl max-w-lg w-full shadow-2xl print:max-w-full print:mx-0 print-area">

            <h2 className="text-xl font-bold mb-2">
              {selectedRecord.patient?.patientName}
            </h2>

            <p className="text-gray-600 mb-2">
              {selectedRecord.testName}
            </p>

            <p className="text-gray-500 mb-4">
              {selectedRecord.date}
            </p>

            {/* BUTTONS */}
            <div className="flex gap-3">

              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl w-full"
              >
                Print
              </button>

              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-xl w-full"
              >
                Close
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}