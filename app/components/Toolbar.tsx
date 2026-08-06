// "use client";

// import { useState } from "react";

// /* =========================
//    TOOLBAR
// ========================= */
// function Toolbar({
//   onPrint,
//   onAdd,
//   onLockToggle,
//   isLocked,
// }: any) {
//   return (
//     <div className="flex gap-3 mb-4 no-print">

//       <button
//         onClick={onAdd}
//         className="px-3 py-2 bg-green-600 text-white rounded"
//       >
//         Add
//       </button>

//       <button
//         onClick={onLockToggle}
//         className={`px-3 py-2 rounded text-white ${
//           isLocked ? "bg-yellow-600" : "bg-gray-600"
//         }`}
//       >
//         {isLocked ? "Unlock Edit" : "Lock Edit"}
//       </button>

//       <button
//         onClick={onPrint}
//         className="px-3 py-2 bg-blue-600 text-white rounded"
//       >
//         Print
//       </button>

//     </div>
//   );
// }

// /* =========================
//    LAYOUT WRAPPER
// ========================= */
// export default function ReportLayout({ children }: any) {
//   const [isLocked, setIsLocked] = useState(false);

//   const handlePrint = () => window.print();

//   const handleAdd = () => {
//     alert("Add functionality here");
//   };

//   return (
//     <div className="p-6 bg-white text-black min-h-screen">

//       {/* GLOBAL TOOLBAR */}
//       <Toolbar
//         onAdd={handleAdd}
//         onPrint={handlePrint}
//         onLockToggle={() => setIsLocked(!isLocked)}
//         isLocked={isLocked}
//       />

//       {/* REPORT CONTENT */}
//       <div className={isLocked ? "pointer-events-none select-none" : ""}>
//         {children}
//       </div>

//     </div>
//   );
// }




"use client";

export default function Toolbar({ onPrint, onClear, onAddTest }: any) {
  return (
    <div className="flex gap-3 mb-4 no-print">

      <button onClick={onPrint} className="px-3 py-2 bg-blue-600 text-white rounded">
        Print
      </button>

      <button onClick={onAddTest} className="px-3 py-2 bg-green-600 text-white rounded">
        Add Test
      </button>

      <button onClick={onClear} className="px-3 py-2 bg-red-600 text-white rounded">
        Clear
      </button>

<button onClick={onClear} className="px-3 py-2 bg-red-600 text-white rounded">
        RemoveTest
      </button>
    </div>
  );
}