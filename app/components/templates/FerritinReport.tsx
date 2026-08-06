// "use client";
// import { useState } from "react";


// import { QRCodeCanvas } from "qrcode.react";

// export default function FerritinReport() {
//   const [rows, setRows] = useState([
//     {
//       test: "Serum Ferritin",
//       result: "250",
//       unit: "ng/mL",
//       range: "Men: 30–350 ng/mL\nWomen: 20–250 ng/mL",
//     },
//   ]);

//   // ================= CHANGE HANDLER =================
//   const handleChange = (index: number, field: string, value: string) => {
//     const updated = [...rows];
//     updated[index] = { ...updated[index], [field]: value };
//     setRows(updated);
//   };

//   // ================= ADD ROW =================
//   const addRow = () => {
//     setRows([
//       ...rows,
//       { test: "", result: "", unit: "", range: "" },
//     ]);
//   };

//   // ================= REMOVE ROW =================
//   const removeRow = (index: number) => {
//     if (rows.length === 1) return;
//     const updated = rows.filter((_, i) => i !== index);
//     setRows(updated);
//   };

//   // ================= CLEAR ALL =================
//   const clearAll = () => {
//     setRows([
//       { test: "", result: "", unit: "", range: "" },
//     ]);
//   };

//   // ================= PRINT =================
//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div className="bg-white text-black min-h-screen p-6 print:p-0">

//       {/* ================= ACTION BUTTONS ================= */}
//       <div className="flex gap-3 mb-4 print:hidden">

//         <button
//           onClick={handlePrint}
//           className="px-4 py-2 bg-blue-600 text-white rounded"
//         >
//           Print
//         </button>

//         <button
//           onClick={addRow}
//           className="px-4 py-2 bg-green-600 text-white rounded"
//         >
//           Add +
//         </button>

//         <button
//           onClick={clearAll}
//           className="px-4 py-2 bg-gray-700 text-white rounded"
//         >
//           Clear All
//         </button>

//       </div>

//       {/* ================= TABLE HEADER ================= */}
//       <div className="grid grid-cols-3 text-center text-sm font-semibold border border-black bg-gray-200">
//         <div className="border p-2">TEST NAME</div>
//         <div className="border p-2">RESULT</div>
//         <div className="border p-2">NORMAL RANGE</div>
//       </div>

//       {/* ================= ROWS ================= */}
//       {rows.map((row, index) => (
//         <div
//           key={index}
//           className="grid grid-cols-3 text-sm border border-black border-t-0 items-center"
//         >

//           {/* TEST */}
//           <input
//             value={row.test}
//             onChange={(e) =>
//               handleChange(index, "test", e.target.value)
//             }
//             className="p-3 outline-none"
//           />

//           {/* RESULT */}
//           <div className="flex items-center gap-2 p-3">
//             <input
//               value={row.result}
//               onChange={(e) =>
//                 handleChange(index, "result", e.target.value)
//               }
//               className="w-20 outline-none"
//             />
//             <input
//               value={row.unit}
//               onChange={(e) =>
//                 handleChange(index, "unit", e.target.value)
//               }
//               className="w-24 outline-none"
//             />
//           </div>

//           {/* RANGE */}
//           <textarea
//             value={row.range}
//             onChange={(e) =>
//               handleChange(index, "range", e.target.value)
//             }
//             className="p-3 outline-none resize-none"
//             rows={2}
//           />

//           {/* REMOVE BUTTON */}
//           <div className="col-span-3 text-right pr-3 pb-2 print:hidden">
//             <button
//               onClick={() => removeRow(index)}
//               className="text-red-600 text-xs"
//             >
//               Remove
//             </button>
//           </div>

//         </div>
//       ))}

//     </div>
//   );
// }