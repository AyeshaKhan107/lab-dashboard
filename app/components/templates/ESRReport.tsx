// "use client";

// import { useState } from "react";
// import { QRCodeCanvas } from "qrcode.react";

// export default function ESRReport({
//   title = "ESR REPORT",
// }: {
//   title?: string;
// }) {

//   // ✅ CURRENT DATE & TIME
//   const now = new Date();

//   const currentDate = now.toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   }).toUpperCase();

//   const currentTime = now.toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   const [data, setData] = useState({
//     patientName: "",
//     labNo: "",
//     age: "Adult",
//     gender: "Male",
//     specimenDate: currentDate,
//     time: currentTime,
//     referredBy: "",
//     indoor: "",
//     address: "Nil",
//     ward: "",
//     esr: "05",
//   });

//   const handleChange = (e: any) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   // ================= PRINT LOGIC (ADDED ONLY) =================
//   const handlePrint = () => {
//     window.print();
//   };

//   // ================= SAVE REPORT =================
//   const saveReport = async () => {
//     try {
//       const response = await fetch("/api/reports", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },

//         body: JSON.stringify({
//           title,
//           patient: data,
//           tests: [
//             {
//               testName: "E.S.R.",
//               result: data.esr,
//               range: "0-15 (Male) / 0-20 (Female)",
//             },
//           ],
//         }),
//       });

//       const result = await response.json();

//       if (result.success) {
//         alert("Report Saved Successfully");
//       } else {
//         alert("Failed To Save Report");
//       }

//     } catch (error) {
//       console.log(error);
//       alert("Server Error");
//     }
//   };

//   const qrValue =
//     typeof window !== "undefined"
//       ? `${window.location.origin}/reports/esr/${data.labNo || "demo"}`
//       : "";

//   return (
//     <div className="bg-gradient-to-br from-slate-100 via-white to-slate-200 min-h-screen p-6 text-black print:bg-white">

//      {/* BUTTONS */}
// <div className="flex gap-3 mb-5 flex-wrap print:hidden">

//   {/* ORIGINAL BUTTONS (UNCHANGED) */}
//   <button
//     onClick={saveReport}
//     className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-xl shadow-lg font-semibold"
//   >
//     Save Report
//   </button>

//   <button
//     onClick={() => window.print()}
//     className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-xl shadow-lg font-semibold"
//   >
//     Print Report
//   </button>

//   {/* ================= ONLY ADDED BUTTONS ================= */}

//   <button
//     onClick={() => alert("Add Row logic not enabled in this version")}
//     className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl shadow-lg font-semibold"
//   >
//     + Add Row
//   </button>

//   <button
//     onClick={() => alert("Remove Row logic not enabled in this version")}
//     className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl shadow-lg font-semibold"
//   >
//     Remove Row
//   </button>

//   <button
//     onClick={() => alert("Add Column logic not enabled in this version")}
//     className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-xl shadow-lg font-semibold"
//   >
//     + Add Column
//   </button>

//   <button
//     onClick={() => alert("Remove Column logic not enabled in this version")}
//     className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-xl shadow-lg font-semibold"
//   >
//     Remove Column
//   </button>

//   <button
//     onClick={() => {
//       setData({
//         patientName: "",
//         labNo: "",
//         age: "Adult",
//         gender: "Male",
//         specimenDate: currentDate,
//         time: currentTime,
//         referredBy: "",
//         indoor: "",
//         address: "Nil",
//         ward: "",
//         esr: "05",
//       });
//     }}
//     className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-xl shadow-lg font-semibold"
//   >
//     Clear All
//   </button>

// </div>

//       {/* REPORT (NO CHANGE AT ALL) */}
//       <div className="max-w-6xl mx-auto bg-white border-[4px] border-blue-700 shadow-2xl rounded-3xl overflow-hidden relative print:shadow-none print:border-[3px]">

//         {/* QR CODE */}
//         <div className="absolute right-6 top-6 z-10 bg-white p-2 rounded-xl shadow-lg">
//           <QRCodeCanvas value={qrValue} size={80} />
//         </div>

//         {/* TITLE */}
//         <div className="text-center py-8 border-b-4 border-blue-700 bg-gradient-to-r from-blue-50 to-slate-100">

//           <h1 className="text-4xl font-extrabold uppercase tracking-[5px] text-slate-800">
//             {title}
//           </h1>

//           <p className="text-blue-700 text-lg mt-2 font-semibold tracking-wide">
//             Erythrocyte Sedimentation Rate
//           </p>

//         </div>

//         {/* PATIENT INFO (NO CHANGE) */}
//         <div className="p-6">

//           <table className="w-full border-2 border-blue-700 border-collapse text-sm mb-8 overflow-hidden rounded-xl">

//             <tbody>

//               <tr>
//                 <td className="border border-blue-700 p-3 font-bold bg-blue-50 w-[18%]">
//                   Patient Name
//                 </td>

//                 <td className="border border-blue-700 p-3">
//                   <input
//                     name="patientName"
//                     value={data.patientName}
//                     onChange={handleChange}
//                     className="w-full outline-none bg-transparent"
//                   />
//                 </td>

//                 <td className="border border-blue-700 p-3 font-bold bg-blue-50">
//                   Age
//                 </td>

//                 <td className="border border-blue-700 p-3">
//                   <input
//                     name="age"
//                     value={data.age}
//                     onChange={handleChange}
//                     className="w-full outline-none bg-transparent"
//                   />
//                 </td>
//               </tr>

//               <tr>
//                 <td className="border border-blue-700 p-3 font-bold bg-blue-50">
//                   Lab No
//                 </td>

//                 <td className="border border-blue-700 p-3">
//                   <input
//                     name="labNo"
//                     value={data.labNo}
//                     onChange={handleChange}
//                     className="w-full outline-none bg-transparent"
//                   />
//                 </td>

//                 <td className="border border-blue-700 p-3 font-bold bg-blue-50">
//                   Gender
//                 </td>

//                 <td className="border border-blue-700 p-3">
//                   <input
//                     name="gender"
//                     value={data.gender}
//                     onChange={handleChange}
//                     className="w-full outline-none bg-transparent"
//                   />
//                 </td>
//               </tr>

//               <tr>
//                 <td className="border border-blue-700 p-3 font-bold bg-blue-50">
//                   Specimen Date
//                 </td>

//                 <td className="border border-blue-700 p-3">
//                   <input
//                     name="specimenDate"
//                     value={data.specimenDate}
//                     onChange={handleChange}
//                     className="w-full outline-none bg-transparent"
//                   />
//                 </td>

//                 <td className="border border-blue-700 p-3 font-bold bg-blue-50">
//                   Time
//                 </td>

//                 <td className="border border-blue-700 p-3">
//                   <input
//                     name="time"
//                     value={data.time}
//                     onChange={handleChange}
//                     className="w-full outline-none bg-transparent"
//                   />
//                 </td>
//               </tr>

//               <tr>
//                 <td className="border border-blue-700 p-3 font-bold bg-blue-50">
//                   Referred By
//                 </td>

//                 <td className="border border-blue-700 p-3">
//                   <input
//                     name="referredBy"
//                     value={data.referredBy}
//                     onChange={handleChange}
//                     className="w-full outline-none bg-transparent"
//                   />
//                 </td>

//                 <td className="border border-blue-700 p-3 font-bold bg-blue-50">
//                   Indoor / Outdoor
//                 </td>

//                 <td className="border border-blue-700 p-3">
//                   <input
//                     name="indoor"
//                     value={data.indoor}
//                     onChange={handleChange}
//                     className="w-full outline-none bg-transparent"
//                   />
//                 </td>
//               </tr>

//               <tr>
//                 <td className="border border-blue-700 p-3 font-bold bg-blue-50">
//                   Address / Cell #
//                 </td>

//                 <td className="border border-blue-700 p-3">
//                   <input
//                     name="address"
//                     value={data.address}
//                     onChange={handleChange}
//                     className="w-full outline-none bg-transparent"
//                   />
//                 </td>

//                 <td className="border border-blue-700 p-3 font-bold bg-blue-50">
//                   Ward #
//                 </td>

//                 <td className="border border-blue-700 p-3">
//                   <input
//                     name="ward"
//                     value={data.ward}
//                     onChange={handleChange}
//                     className="w-full outline-none bg-transparent"
//                   />
//                 </td>
//               </tr>

//             </tbody>

//           </table>

//           {/* TABLE (NO CHANGE AT ALL) */}
//           <div className="grid grid-cols-3 bg-blue-700 text-white font-bold text-sm rounded-t-2xl overflow-hidden">

//             <div className="p-4 border-r border-white">
//               TEST / PARAMETER
//             </div>

//             <div className="p-4 border-r border-white text-center">
//               RESULT
//             </div>

//             <div className="p-4 text-center">
//               REFERENCE RANGE
//             </div>

//           </div>

//           <div className="border-x border-b border-blue-700 rounded-b-2xl overflow-hidden">

//             <div className="grid grid-cols-3 gap-4 items-center p-5 bg-white">

//               <div className="font-semibold text-slate-800">
//                 Erythrocyte Sedimentation Rate (E.S.R.)
//               </div>

//               <div className="text-center">
//                 <input
//                   name="esr"
//                   value={data.esr}
//                   onChange={handleChange}
//                   className="w-24 text-center text-[24px] font-extrabold text-green-700 outline-none bg-transparent"
//                 />
//               </div>

//               <div className="text-center text-slate-600 leading-7">
//                 0-15 (Male)
//                 <br />
//                 0-20 (Female)
//               </div>

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }







"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function ESRReport({
  title = "ESR REPORT",
}: {
  title?: string;
}) {

  // ================= DATE & TIME =================
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

  const [data, setData] = useState({
    patientName: "",
    labNo: "",
    age: "Adult",
    gender: "Male",
    specimenDate: currentDate,
    time: currentTime,
    referredBy: "",
    indoor: "",
    address: "Nil",
    ward: "",
    esr: "05",
  });

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // ================= PRINT LOGIC =================
  const handlePrint = () => {
    window.print();
  };

  // ================= SAVE REPORT =================
  const saveReport = async () => {
    try {
      const reportData = {
        reportId: `REP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: "ESR Report",
        testName: "E.S.R.",
        patient: data,
        tests: [
          {
            testName: "E.S.R.",
            result: data.esr,
            range: "0-15 (Male) / 0-20 (Female)",
          },
        ],
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

      const result = await response.json();

      if (result.success) {
        alert("Report Saved Successfully");
      } else {
        alert("Failed to save report");
      }
    } catch (error) {
      console.error("Save Report Error:", error);
      alert("Server Error");
    }
  };

  const qrValue =
    typeof window !== "undefined"
      ? `${window.location.origin}/reports/esr/${data.labNo || "demo"}`
      : "";

  // ================= TABLE STATE (ADDED LOGIC ONLY) =================
  const [columns, setColumns] = useState([
    "TEST / PARAMETER",
    "RESULT/UNIT",
    "REFERENCE RANGE",
  ]);

  const [tests, setTests] = useState([
    {
      col1: "Erythrocyte Sedimentation Rate (E.S.R.)",
      col2: "05",
      col3: "0-15 (Male) / 0-20 (Female)",
    },
  ]);

  // ================= TABLE LOGIC =================
  const handleCellChange = (
    rowIndex: number,
    colKey: string,
    value: string
  ) => {
    const updated = [...tests];
    updated[rowIndex] = {
      ...updated[rowIndex],
      [colKey]: value,
    };
    setTests(updated);
  };

  const addRow = () => {
    const newRow: any = {};
    columns.forEach((_, i) => {
      newRow[`col${i + 1}`] = "";
    });
    setTests([...tests, newRow]);
  };

  const removeRow = () => {
    if (tests.length > 1) {
      setTests(tests.slice(0, -1));
    }
  };

  const addColumn = () => {
    const newIndex = columns.length + 1;

    setColumns([...columns, `COLUMN ${newIndex}`]);

    const updated = tests.map((row) => ({
      ...row,
      [`col${newIndex}`]: "",
    }));

    setTests(updated);
  };

  const removeColumn = () => {
    if (columns.length <= 1) return;

    const key = `col${columns.length}`;

    setColumns(columns.slice(0, -1));

    const updated = tests.map((row) => {
      const copy = { ...row };
      delete copy[key];
      return copy;
    });

    setTests(updated);
  };

  const clearAll = () => {
    const emptyRow: any = {};
    columns.forEach((_, i) => {
      emptyRow[`col${i + 1}`] = "";
    });
    setTests([emptyRow]);
  };

  return (
    <div className="bg-gradient-to-br from-slate-100 via-white to-slate-200 min-h-screen p-6 text-black print:bg-white">

      {/* ================= BUTTONS ================= */}
      <div className="flex gap-3 mb-5 flex-wrap print:hidden">

        <button
          onClick={addRow}
          className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-xl shadow-lg font-semibold"
        >
          +Add row
        </button>

        <button
          onClick={removeRow}
          className="bg-red-700 hover:bg-blue-800 text-white px-5 py-2 rounded-xl shadow-lg font-semibold"
        >
           -Remove Row
        </button>

        <button
          onClick={saveReport}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl shadow-lg font-semibold"
        >
          Save Report
        </button>

        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl shadow-lg font-semibold"
        >
          Print
        </button>

        

        

        <button
          onClick={clearAll}
          className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-xl shadow-lg font-semibold"
        >
          Clear All
        </button>

      </div>

      {/* ================= REPORT ================= */}
      <div className="max-w-6xl mx-auto bg-white border-[4px] border-blue-700 shadow-2xl rounded-3xl overflow-hidden relative print:shadow-none print:overflow-visible print:border-[3px] print:max-w-full print:mx-0 print-area">

        {/* QR CODE */}
        <div className="absolute right-6 top-0 z-10 bg-white p-2 rounded-xl shadow-lg print:shadow-none print:right-2 print:top-2">
          <QRCodeCanvas value={qrValue} size={80} />
        </div>

        {/* TITLE */}
        <div className="text-center py-8  from-blue-50 to-slate-100">

          {/* <h1 className="text-4xl font-extrabold uppercase tracking-[5px] text-slate-800">
            {title}
          </h1>

          <p className="text-blue-700 text-lg mt-2 font-semibold tracking-wide">
            Erythrocyte Sedimentation Rate
          </p> */}

        </div>

        {/* PATIENT INFO */}
        <div className="p-6">

          <table className="w-full border-2 border-blue-700 border-collapse text-sm mb-8 overflow-hidden rounded-xl">

            <tbody>

              <tr>
                <td className="border border-blue-700 p-1 font-bold bg-blue-50 w-[18%]">
                  Patient Name
                </td>
                <td className="border border-blue-700 p-1">
                  <input name="patientName" value={data.patientName} onChange={handleChange} className="w-full outline-none bg-transparent" />
                </td>

                <td className="border border-blue-700 p-1 font-bold bg-blue-50">
                  Age
                </td>
                <td className="border border-blue-700 p-1">
                  <input name="age" value={data.age} onChange={handleChange} className="w-full outline-none bg-transparent" />
                </td>
              </tr>

              <tr>
                <td className="border border-blue-700 p-1 font-bold bg-blue-50">
                  Lab No
                </td>
                <td className="border border-blue-700 p-1">
                  <input name="labNo" value={data.labNo} onChange={handleChange} className="w-full outline-none bg-transparent" />
                </td>

                <td className="border border-blue-700 p-1 font-bold bg-blue-50">
                  Gender
                </td>
                <td className="border border-blue-700 p-1">
                  <input name="gender" value={data.gender} onChange={handleChange} className="w-full outline-none bg-transparent" />
                </td>
              </tr>

              <tr>
                <td className="border border-blue-700 p-1 font-bold bg-blue-50">
                  Specimen Date
                </td>
                <td className="border border-blue-700 p-1">
                  <input name="specimenDate" value={data.specimenDate} onChange={handleChange} className="w-full outline-none bg-transparent" />
                </td>

                <td className="border border-blue-700 p-1 font-bold bg-blue-50">
                  Time
                </td>
                <td className="border border-blue-700 p-1">
                  <input name="time" value={data.time} onChange={handleChange} className="w-full outline-none bg-transparent" />
                </td>
              </tr>

              <tr>
                <td className="border border-blue-700 p-1 font-bold bg-blue-50">
                  Referred By
                </td>
                <td className="border border-blue-700 p-1">
                  <input name="referredBy" value={data.referredBy} onChange={handleChange} className="w-full outline-none bg-transparent" />
                </td>

                <td className="border border-blue-700 p-1 font-bold bg-blue-50">
                  Indoor / Outdoor
                </td>
                <td className="border border-blue-700 p-1">
                  <input name="indoor" value={data.indoor} onChange={handleChange} className="w-full outline-none bg-transparent" />
                </td>
              </tr>

              <tr>
                <td className="border border-blue-700 p-1 font-bold bg-blue-50">
                  Address / Cell #
                </td>
                <td className="border border-blue-700 p-1">
                  <input name="address" value={data.address} onChange={handleChange} className="w-full outline-none bg-transparent" />
                </td>

                <td className="border border-blue-700 p-1 font-bold bg-blue-50">
                  Ward #
                </td>
                <td className="border border-blue-700 p-1">
                  <input name="ward" value={data.ward} onChange={handleChange} className="w-full outline-none bg-transparent" />
                </td>
              </tr>

            </tbody>
          </table>
          <div className="text-black font-bold text-lg mb-2">Erythrocyte Sedimentation Rate (E.S.R.)</div>
          <div className="grid grid-cols-3 bg-blue-700 text-white font-bold text-sm rounded-t-2xl overflow-hidden">

            {columns.map((col, i) => (
              <div key={i} className="p-2 border-r border-white text-center text-sm">
                {col}
              </div>
            ))}

          </div>

          <div className="border-x border-b border-blue-700 rounded-b-2xl overflow-hidden">

            {tests.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-3 gap-2 items-center p-2 bg-white"
              >
                {columns.map((_, colIndex) => (
                  <input
                    key={colIndex}
                    value={row[`col${colIndex + 1}`] || ""}
                    onChange={(e) =>
                      handleCellChange(rowIndex, `col${colIndex + 1}`, e.target.value)
                    }
                    className={
                      colIndex === 1
                        ? "text-center text-xl font-extrabold text-green-700 outline-none bg-transparent"
                        : "text-center text-base outline-none bg-transparent"
                    }
                  />
                ))}
              </div>
            ))}

          </div>

        </div>
      </div>
    </div>
  );
}