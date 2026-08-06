



"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function DynamicTemplate({
  title,
}: {
  title: string;
}) {
  const now = new Date();

  const currentDate = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).toUpperCase();

  const currentTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const currentAMPM = now.getHours() >= 12 ? "PM" : "AM";

  const [patient, setPatient] = useState({
    patientName: "",
    labNo: "",
    age: "Adult",
    gender: "Male",
    specimenDate: currentDate,
    time: currentTime,
    ampm: currentAMPM,
    referredBy: "",
    indoorOutdoor: "Nil",
    address: "Nil",
    ward: "",
  });

  const [tests, setTests] = useState([
    {
      title: "Blood Glucose Fasting",
      result: "89",
      unit: "mg/dl",
      range: "(60-120)",
      urineLabel: "Urine Sugar",
      urineValue: "Nil",
      after: "",
    },
    {
      title: "Blood Glucose Random",
      result: "133",
      unit: "mg/dl",
      range: "(60-160)",
      urineLabel: "Urine Sugar",
      urineValue: "Nil",
      after: "(After 30 min)",
    },
    {
      title: "Blood Glucose Random",
      result: "133",
      unit: "mg/dl",
      range: "(60-160)",
      urineLabel: "Urine Sugar",
      urineValue: "Nil",
      after: "(After 60 min)",
    },
    {
      title: "Blood Glucose Random",
      result: "133",
      unit: "mg/dl",
      range: "(60-160)",
      urineLabel: "Urine Sugar",
      urineValue: "Nil",
      after: "(After 90 min)",
    },
    {
      title: "Blood Glucose Random",
      result: "133",
      unit: "mg/dl",
      range: "(60-160)",
      urineLabel: "Urine Sugar",
      urineValue: "Nil",
      after: "(After 120 min)",
    },
  ]);

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...tests];
    updated[index][field] = value;
    setTests(updated);
  };

  const handlePatientChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };
  const saveReport = async () => {
    try {
      const reportData = {
        reportId: `REP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title,
        testName: title,
        patient,
        tests,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      const response = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Report Saved Successfully");
        setTimeout(() => {
          window.location.href = "/dashboard/record";
        }, 1000);
      } else {
        alert("Failed to save report");
      }
    } catch (error) {
      console.error("Save Report Error:", error);
      alert("Server Error");
    }
  };

  const qrValue = `https://citylab.pk/dashboard/tests/${(title || "test")
    .toLowerCase()
    .replace(/\s+/g, "-")}?labNo=${patient.labNo || "demo"}`;

  return (
    <div className="bg-gradient-to-br from-slate-100 via-white to-slate-200 min-h-screen p-6 text-black print:bg-white">

      {/* BUTTONS */}
      <div className="flex gap-3 mb-5 flex-wrap print:hidden">

        <button
          onClick={() =>
            setTests([
              ...tests,
              {
                title: "",
                result: "",
                unit: "",
                range: "",
                urineLabel: "",
                urineValue: "",
                after: "",
              },
            ])
          }
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl shadow-lg font-semibold"
        >
          + Add Row
        </button>

        <button
          onClick={() => tests.length > 1 && setTests(tests.slice(0, -1))}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl shadow-lg font-semibold"
        >
          Remove Row
        </button>

        {/* ✅ SAVE BUTTON */}
        <button
          onClick={saveReport}
          className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-xl shadow-lg font-semibold"
        >
          Save Report
        </button>

        <button
          onClick={() => window.print()}
          className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-xl shadow-lg font-semibold"
        >
          Print Report
        </button>

      </div>
      <div className="max-w-6xl mx-auto bg-white border-[4px] border-blue-700 shadow-2xl rounded-3xl overflow-hidden relative print:shadow-none print:overflow-visible print:max-w-full print:mx-0 print:border-[3px] print-area">

        {/* QR */}
        <div className="absolute right-6 top-0 z-10 bg-white p-2 rounded-xl shadow-lg print:shadow-none print:right-2 print:top-2">
          <QRCodeCanvas value={qrValue} size={80} />
        </div>
        <div className="text-center py-8  from-blue-50 to-slate-100">
{/* 
          <h1 className="text-4xl font-extrabold uppercase tracking-[5px] text-slate-800">
            {title}
          </h1> */}
{/* 
          <p className="text-blue-700 text-lg mt-2 font-semibold tracking-wide">
            OGTT TEST REPORT
          </p> */}

        </div>

        {/* PATIENT INFO */}
        <div className="p-1">

          <table className="w-full border-2 border-blue-700 border-collapse text-sm mb-8 overflow-hidden rounded-xl">

            <tbody>

              <tr>
                <td className="border border-blue-700 p-1 font-bold bg-blue-50 w-[18%]">
                  Patient Name
                </td>

                <td className="border border-blue-700 p-1">
                  <input
                    name="patientName"
                    value={patient.patientName}
                    onChange={handlePatientChange}
                    className="w-full outline-none bg-transparent"
                  />
                </td>

                <td className="border border-blue-700 p-1 font-bold bg-blue-50">
                  Age
                </td>

                <td className="border border-blue-700 p-1">
                  <input
                    name="age"
                    value={patient.age}
                    onChange={handlePatientChange}
                    className="w-full outline-none bg-transparent"
                  />
                </td>
              </tr>

              <tr>
                <td className="border border-blue-700 p-1 font-bold bg-blue-50">
                  Lab No
                </td>

                <td className="border border-blue-700 p-1">
                  <input
                    name="labNo"
                    value={patient.labNo}
                    onChange={handlePatientChange}
                    className="w-full outline-none bg-transparent"
                  />
                </td>

                <td className="border border-blue-700 p-1 font-bold bg-blue-50">
                  Gender
                </td>

                <td className="border border-blue-700 p-1">
                  <input
                    name="gender"
                    value={patient.gender}
                    onChange={handlePatientChange}
                    className="w-full outline-none bg-transparent"
                  />
                </td>
              </tr>

              <tr>
                <td className="border border-blue-700 p-1 font-bold bg-blue-50">
                  Specimen Date
                </td>

                <td className="border border-blue-700 p-1">
                  <input
                    name="specimenDate"
                    value={patient.specimenDate}
                    onChange={handlePatientChange}
                    className="w-full outline-none bg-transparent"
                  />
                </td>

                <td className="border border-blue-700 p-1 font-bold bg-blue-50">
                  Time
                </td>

                <td className="border border-blue-700 p-1 flex gap-2">
                  <input
                    name="time"
                    value={patient.time}
                    onChange={handlePatientChange}
                    className="w-full outline-none bg-transparent"
                  />

                  <input
                    name="ampm"
                    value={patient.ampm}
                    onChange={handlePatientChange}
                    className="w-14 outline-none bg-transparent"
                  />
                </td>
              </tr>

              <tr>
                <td className="border border-blue-700 p-1 font-bold bg-blue-50">
                  Referred By
                </td>

                <td className="border border-blue-700 p-1">
                  <input
                    name="referredBy"
                    value={patient.referredBy}
                    onChange={handlePatientChange}
                    className="w-full outline-none bg-transparent"
                  />
                </td>

                <td className="border border-blue-700 p-1 font-bold bg-blue-50">
                  Indoor/Outdoor
                </td>

                <td className="border border-blue-700 p-1">
                  <input
                    name="indoorOutdoor"
                    value={patient.indoorOutdoor}
                    onChange={handlePatientChange}
                    className="w-full outline-none bg-transparent"
                  />
                </td>
              </tr>

              <tr>
                <td className="border border-blue-700 p-1 font-bold bg-blue-50">
                  Address
                </td>

                <td className="border border-blue-700 p-1">
                  <input
                    name="address"
                    value={patient.address}
                    onChange={handlePatientChange}
                    className="w-full outline-none bg-transparent"
                  />
                </td>

                <td className="border border-blue-700 p-1 font-bold bg-blue-50">
                  Ward
                </td>

                <td className="border border-blue-700 p-1">
                  <input
                    name="ward"
                    value={patient.ward}
                    onChange={handlePatientChange}
                    className="w-full outline-none bg-transparent"
                  />
                </td>
              </tr>

            </tbody>

          </table>
          
            <div className="p-1 text-black font-bold text-lg mb-2">
              OGTT TEST
            </div>
          <div className="grid grid-cols-4 bg-blue-700 text-white font-bold text-sm rounded-t-2xl overflow-hidden ">

            <div className="p-2 border-r border-white text-sm">
              TEST / PARAMETER
            </div>

            <div className="p-2 border-r border-white text-center text-sm">
              RESULT
            </div>

            <div className="p-2 border-r border-white text-center text-sm">
              UNIT
            </div>

            <div className="p-2 text-center text-sm">
              REFERENCE RANGE
            </div>

          </div>

          {/* RESULTS */}
          <div className="space-y-0 border-x border-b border-blue-700 rounded-b-2xl overflow-hidden">

            {tests.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-2 items-center border-b border-blue-200 p-2 bg-white"
              >

                <div>

                  <input
                    value={item.title}
                    onChange={(e) =>
                      handleChange(index, "title", e.target.value)
                    }
                    className="w-full text-base font-bold text-slate-800 outline-none bg-transparent"
                  />

                  <input
                    value={item.after}
                    onChange={(e) =>
                      handleChange(index, "after", e.target.value)
                    }
                    className="w-full text-sm text-blue-700 font-semibold outline-none bg-transparent mt-1"
                  />

                  <div className="flex gap-2 mt-2">
                    <input
                      value={item.urineLabel}
                      onChange={(e) =>
                        handleChange(index, "urineLabel", e.target.value)
                      }
                      className="w-32 outline-none bg-transparent text-slate-600"
                    />

                    <input
                      value={item.urineValue}
                      onChange={(e) =>
                        handleChange(index, "urineValue", e.target.value)
                      }
                      className="w-20 text-red-600 font-bold outline-none bg-transparent"
                    />
                  </div>

                </div>

                <div className="text-center">
                  <input
                    value={item.result}
                    onChange={(e) =>
                      handleChange(index, "result", e.target.value)
                    }
                    className="w-24 text-center text-xl font-extrabold text-green-700 outline-none bg-transparent"
                  />
                </div>

                <div className="text-center">
                  <input
                    value={item.unit}
                    onChange={(e) =>
                      handleChange(index, "unit", e.target.value)
                    }
                    className="w-24 text-center text-sm outline-none bg-transparent"
                  />
                </div>

                <div className="text-center">
                  <input
                    value={item.range}
                    onChange={(e) =>
                      handleChange(index, "range", e.target.value)
                    }
                    className="w-32 text-center text-sm outline-none bg-transparent text-slate-600"
                  />
                </div>

              </div>
            ))}

          </div>

          {/* FOOTER */}
          <div className="mt-12 border-t-2 border-blue-700 pt-6 flex justify-between items-center text-sm text-slate-600">

            <div>
              <p className="font-semibold">
                Computer Generated Report
              </p>

              <p>No Signature Required</p>
            </div>


          </div>

        </div>

      </div>
    </div>
  );
}