'use client';

import { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function ReportsPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [trash, setTrash] = useState<any[]>([]);

  const [patientName, setPatientName] = useState('');
  const [reportType, setReportType] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'records' | 'trash'>('records');

  // LOAD DATA
  useEffect(() => {
    setRecords(JSON.parse(localStorage.getItem('records') || '[]'));
    setTrash(JSON.parse(localStorage.getItem('trash') || '[]'));
  }, []);

  // SAVE RECORD
  const handleSave = () => {
    if (!patientName || !reportType || !imagePreview) return;

    const id = Date.now();

    const newRecord = {
      id,
      patientName,
      reportType,
      file: imagePreview,
      date: new Date().toLocaleDateString(),

      // QR only for reference (NO routing dependency)
      url: `RECORD-${id}`
    };

    const updated = [...records, newRecord];

    setRecords(updated);
    localStorage.setItem('records', JSON.stringify(updated));

    setPatientName('');
    setReportType('');
    setImagePreview(null);
  };

  // MOVE TO TRASH
  const moveToTrash = (id: number) => {
    const item = records.find(r => r.id === id);
    if (!item) return;

    const updatedRecords = records.filter(r => r.id !== id);
    const updatedTrash = [...trash, item];

    setRecords(updatedRecords);
    setTrash(updatedTrash);

    localStorage.setItem('records', JSON.stringify(updatedRecords));
    localStorage.setItem('trash', JSON.stringify(updatedTrash));
  };

  // RESTORE
  const restore = (id: number) => {
    const item = trash.find(t => t.id === id);
    if (!item) return;

    const updatedTrash = trash.filter(t => t.id !== id);
    const updatedRecords = [...records, item];

    setTrash(updatedTrash);
    setRecords(updatedRecords);

    localStorage.setItem('trash', JSON.stringify(updatedTrash));
    localStorage.setItem('records', JSON.stringify(updatedRecords));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-2xl font-bold mb-6">Reports System</h1>

      {/* FORM */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">

        <div className="space-y-3">

          <input
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Type</option>
            <option>X-Ray</option>
            <option>CT Scan</option>
            <option>MRI</option>
          </select>

          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const reader = new FileReader();
              reader.onload = (ev) => {
                setImagePreview(ev.target?.result as string);
              };
              reader.readAsDataURL(file);
            }}
          />

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Record
          </button>

        </div>

        {imagePreview && (
          <img src={imagePreview} className="max-h-80 rounded" />
        )}
      </div>

      {/* TABS */}
      <div className="flex gap-3 mb-6">

        <button
          onClick={() => setActiveTab('records')}
          className={`px-4 py-2 rounded ${activeTab === 'records' ? 'bg-blue-600 text-white' : 'bg-white'}`}
        >
          Records
        </button>

        <button
          onClick={() => setActiveTab('trash')}
          className={`px-4 py-2 rounded ${activeTab === 'trash' ? 'bg-red-600 text-white' : 'bg-white'}`}
        >
          Trash
        </button>

      </div>

      {/* RECORDS */}
      {activeTab === 'records' && (
        <div className="space-y-3">

          {records.map(r => (
            <div key={r.id} className="bg-white p-4 flex justify-between rounded shadow">

              <div>
                <p className="font-bold">{r.patientName}</p>
                <p>{r.reportType}</p>
              </div>

              <div className="flex gap-2">

                <button
                  onClick={() => setSelectedRecord(r)}
                  className="bg-blue-500 text-white px-3 rounded"
                >
                  View
                </button>

                <button
                  onClick={() => moveToTrash(r.id)}
                  className="bg-red-500 text-white px-3 rounded"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}

        </div>
      )}

      {/* TRASH */}
      {activeTab === 'trash' && (
        <div className="space-y-3">

          {trash.map(t => (
            <div key={t.id} className="bg-gray-200 p-4 flex justify-between rounded">

              <p>{t.patientName}</p>

              <button
                onClick={() => restore(t.id)}
                className="bg-green-600 text-white px-3 rounded"
              >
                Restore
              </button>

            </div>
          ))}

        </div>
      )}

      {/* MODAL */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded w-[400px] text-center">

            <h2 className="text-xl font-bold">{selectedRecord.patientName}</h2>
            <p>{selectedRecord.reportType}</p>

            {selectedRecord.file && (
              <img src={selectedRecord.file} className="w-full my-3 rounded" />
            )}

            {/* QR (STATIC SAFE) */}
            <QRCodeCanvas value={selectedRecord.url} size={150} />

            <p className="text-xs mt-2 text-gray-500">
              {selectedRecord.url}
            </p>

            <button
              onClick={() => setSelectedRecord(null)}
              className="mt-4 bg-gray-800 text-white px-4 py-2 rounded w-full"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}