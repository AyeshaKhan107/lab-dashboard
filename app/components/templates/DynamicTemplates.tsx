





// "use client";

// import { useState, useRef, useEffect } from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import { useReactToPrint } from "react-to-print";
// import { toJpeg } from "html-to-image";
// import jsPDF from "jspdf";
// import { reportData } from "@/data/reportData";

// const getCurrentDate = () => {
//   const date = new Date();
//   return date
//     .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
//     .toUpperCase();
// };
// const getCurrentTime = () => {
//   const date = new Date();
//   return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
// };
// const getAMPM = () => (new Date().getHours() >= 12 ? "PM" : "AM");

// const parseRange = (normal: string): { low: number | null; high: number | null } => {
//   if (!normal) return { low: null, high: null };
//   const dash = normal.match(/^([\d.]+)\s*[-–]\s*([\d.]+)/);
//   if (dash) return { low: parseFloat(dash[1]), high: parseFloat(dash[2]) };
//   const gt = normal.match(/^[>≥]\s*([\d.]+)/);
//   if (gt) return { low: parseFloat(gt[1]), high: null };
//   const lt = normal.match(/^[<≤]\s*([\d.]+)/);
//   if (lt) return { low: null, high: parseFloat(lt[1]) };
//   return { low: null, high: null };
// };

// const isResultAbnormal = (result: string, normal: string) => {
//   const num = parseFloat(result);
//   if (isNaN(num) || !result.trim()) return false;
//   const { low, high } = parseRange(normal);
//   if (low !== null && num < low) return true;
//   if (high !== null && num > high) return true;
//   return false;
// };

// export default function DynamicTemplate({
//   title: initialTitle,
//   slug,
// }: {
//   title: string;
//   slug: string;
// }) {
//   const tests = reportData[slug] || [];
//   const isCPReport = slug === "cp";
//   const isUrineReport = slug === "urine";
//   const isSmallSizeReport = isCPReport || isUrineReport;

//   const allTests = Object.keys(reportData).flatMap((key) =>
//     (reportData[key] || []).map((item: any, index: number) => ({
//       id: `${key}-${index}`,
//       test: item.test || "",
//       unit: item.unit || "",
//       normal: item.normal || "",
//     }))
//   );

//   const [searchQuery, setSearchQuery] = useState("");
//   const [showSearchPanel, setShowSearchPanel] = useState(false);
//   const [addedTests, setAddedTests] = useState<any[]>([]);
//   const [hiddenAddButtons, setHiddenAddButtons] = useState<string[]>([]);
//   // CHANGED: title changed to "Liver Function Test" for the left panel
//   const [title] = useState(initialTitle);
//   const [isSaved, setIsSaved] = useState(false);
//   const [pdfUrl, setPdfUrl] = useState("");
//   const [isSaving, setIsSaving] = useState(false);

//   const [patient, setPatient] = useState({
//     patientName: "",
//     labNo: "",
//     age: "",
//     gender: "",
//     specimenDate: getCurrentDate(),
//     time: getCurrentTime(),
//     ampm: getAMPM(),
//     referredBy: "",
//     indoorOutdoor: "Nil",
//     address: "Nil",
//     ward: "",
//   });

//   const [testName, setTestName] = useState(
//     isCPReport ? "Blood Complete Picture" :
//     slug === "lft" ? "Liver Function Test" :
//     initialTitle
//   );

//   const [rows, setRows] = useState(
//     tests.map((item: any) => ({
//       col1: item.test || "",
//       col2: item.result || "",
//       col3: item.unit || "",
//       col4: item.normal || "",
//       subtitle: item.subtitle || "",
//       subheading: item.subheading || "",
//       styles: item.styles || {},
//     }))
//   );

//   const [columns, setColumns] = useState<string[]>([
//     "TEST / PARAMETER",
//     "RESULT",
//     "UNIT",
//     isCPReport ? "REF. VALUE" : "REFERENCE RANGE",
//   ]);

//   const [isLocked, setIsLocked] = useState(false);
//   const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
//   const [savedFieldHeights, setSavedFieldHeights] = useState<Record<string, number> | null>(null);

//   const patientNameRef = useRef<HTMLDivElement>(null);
//   const labNoRef = useRef<HTMLDivElement>(null);
//   const ageRef = useRef<HTMLDivElement>(null);
//   const genderRef = useRef<HTMLDivElement>(null);
//   const referredByRef = useRef<HTMLDivElement>(null);
//   const addressRef = useRef<HTMLDivElement>(null);
//   const wardRef = useRef<HTMLDivElement>(null);
//   const printRef = useRef<HTMLDivElement>(null);

//   const handlePrint = useReactToPrint({
//     contentRef: printRef,
//     documentTitle: "Printed Report",
//   });

//   useEffect(() => {
//     const savedTemplate = localStorage.getItem(`template-${title}`);
//     if (savedTemplate) {
//       const parsed = JSON.parse(savedTemplate);
//       setColumns(parsed.columns || []);
//       setRows(parsed.rows || []);
//       setIsLocked(parsed.isLocked || false);
//       setSavedFieldHeights(parsed.fieldHeights || null);
//     }
//   }, [title]);

//   const syncRef = (ref: React.RefObject<HTMLDivElement>, value: string) => {
//     if (ref.current && document.activeElement !== ref.current) {
//       ref.current.innerText = value;
//     }
//   };
//   useEffect(() => syncRef(patientNameRef, patient.patientName), [patient.patientName]);
//   useEffect(() => syncRef(labNoRef, patient.labNo), [patient.labNo]);
//   useEffect(() => {
//     if (ageRef.current && document.activeElement !== ageRef.current && patient.age)
//       ageRef.current.innerText = patient.age;
//   }, [patient.age]);
//   useEffect(() => {
//     if (genderRef.current && document.activeElement !== genderRef.current && patient.gender)
//       genderRef.current.innerText = patient.gender;
//   }, [patient.gender]);
//   useEffect(() => syncRef(referredByRef, patient.referredBy), [patient.referredBy]);
//   useEffect(() => syncRef(addressRef, patient.address), [patient.address]);
//   useEffect(() => syncRef(wardRef, patient.ward), [patient.ward]);

//   useEffect(() => {
//     if (!savedFieldHeights) return;
//     const apply = (ref: React.RefObject<HTMLDivElement>, key: string) => {
//       if (ref.current && savedFieldHeights[key])
//         ref.current.style.height = `${savedFieldHeights[key]}px`;
//     };
//     apply(patientNameRef, "patientName");
//     apply(labNoRef, "labNo");
//     apply(ageRef, "age");
//     apply(genderRef, "gender");
//     apply(referredByRef, "referredBy");
//     apply(addressRef, "address");
//     apply(wardRef, "ward");
//   }, [savedFieldHeights]);

//   const updatePatient = (field: string, value: string) =>
//     setPatient((prev) => ({ ...prev, [field]: value }));

//   const handleCellChange = (rowIndex: number, colKey: string, value: string) => {
//     const updated = [...rows];
//     updated[rowIndex][colKey as keyof (typeof updated)[0]] = value;
//     setRows(updated);
//   };

//   const filteredSearchResults = searchQuery.trim()
//     ? allTests.filter((item) => item.test.toLowerCase().includes(searchQuery.toLowerCase()))
//     : [];

//   const handleAddSearchTest = (item: any) => {
//     if (!addedTests.some((e) => e.test === item.test && e.unit === item.unit)) {
//       setAddedTests((prev) => [
//         ...prev,
//         { id: item.id, test: item.test, unit: item.unit, result: "", normal: item.normal },
//       ]);
//     }
//     setHiddenAddButtons((prev) => [...prev, item.id]);
//     setSearchQuery("");
//     setShowSearchPanel(false);
//   };

//   useEffect(() => { setHiddenAddButtons([]); }, [searchQuery]);

//   const addRow = () =>
//     setRows([...rows, { col1: "", col2: "", col3: "", col4: "", subtitle: "", subheading: "", styles: {} }]);
//   const removeRow = () => { if (rows.length > 1) setRows(rows.slice(0, -1)); };
//   const addColumn = () => {
//     const n = columns.length + 1;
//     setColumns([...columns, `Column ${n}`]);
//     setRows(rows.map((row) => ({ ...row, [`col${n}`]: "" })));
//   };
//   const removeColumn = () => {
//     if (columns.length <= 1) return;
//     const last = `col${columns.length}`;
//     setColumns(columns.slice(0, -1));
//     setRows(rows.map((row) => { const r = { ...row }; delete r[last as keyof typeof r]; return r; }));
//   };
//   const clearAll = () => setRows([]);

//   const lockTemplate = () => {
//     const data = {
//       columns, rows, isLocked: true,
//       fieldHeights: {
//         patientName: patientNameRef.current?.scrollHeight || 0,
//         labNo: labNoRef.current?.scrollHeight || 0,
//         age: ageRef.current?.scrollHeight || 0,
//         gender: genderRef.current?.scrollHeight || 0,
//         referredBy: referredByRef.current?.scrollHeight || 0,
//         address: addressRef.current?.scrollHeight || 0,
//         ward: wardRef.current?.scrollHeight || 0,
//       },
//     };
//     localStorage.setItem(`template-${title}`, JSON.stringify(data));
//     setIsLocked(true);
//     setShowSuccessOverlay(true);
//   };

//   const unlockTemplate = () => {
//     setIsLocked(false);
//     const saved = localStorage.getItem(`template-${title}`);
//     if (saved)
//       localStorage.setItem(`template-${title}`, JSON.stringify({ ...JSON.parse(saved), isLocked: false }));
//   };

//   // ── PDF: capture with padding so nothing gets cut ──
//   const generatePdfBlob = async (): Promise<Blob> => {
//     if (!printRef.current) throw new Error("Printable area not found");
//     const el = printRef.current;

//     const prevStyles = {
//       maxWidth: el.style.maxWidth,
//       width: el.style.width,
//       padding: el.style.padding,
//       margin: el.style.margin,
//       position: el.style.position,
//     };

//     el.style.maxWidth = "none";
//     el.style.width = "750px";
//     el.style.padding = "24px 28px";
//     el.style.margin = "0";
//     el.style.position = "relative";

//     await new Promise((r) => setTimeout(r, 120));

//     const captureWidth = 750 + 56;
//     const captureHeight = el.scrollHeight;

//     const dataUrl = await toJpeg(el, {
//       cacheBust: true,
//       backgroundColor: "#ffffff",
//       quality: 1.0,
//       pixelRatio: 2,
//       width: captureWidth,
//       height: captureHeight,
//     });

//     el.style.maxWidth = prevStyles.maxWidth;
//     el.style.width = prevStyles.width;
//     el.style.padding = prevStyles.padding;
//     el.style.margin = prevStyles.margin;
//     el.style.position = prevStyles.position;

//     const img = new Image();
//     img.src = dataUrl;
//     await new Promise<void>((res, rej) => {
//       img.onload = () => res();
//       img.onerror = () => rej(new Error("Image load failed"));
//     });

//     const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4", compress: true });
//     const pageW = pdf.internal.pageSize.getWidth();
//     const pageH = pdf.internal.pageSize.getHeight();

//     const margin = 8;
//     const contentW = pageW - margin * 2;
//     const imgH = (img.height * contentW) / img.width;

//     let heightLeft = imgH;
//     let yPos = margin;

//     pdf.addImage(dataUrl, "JPEG", margin, yPos, contentW, imgH, undefined, "FAST");
//     heightLeft -= (pageH - margin);

//     while (heightLeft > 0) {
//       pdf.addPage();
//       yPos = margin - (imgH - heightLeft);
//       pdf.addImage(dataUrl, "JPEG", margin, yPos, contentW, imgH, undefined, "FAST");
//       heightLeft -= pageH;
//     }

//     return pdf.output("blob");
//   };

//   const uploadPdfToR2 = async (pdfBlob: Blob): Promise<string> => {
//     const formData = new FormData();
//     const fileName = `${slug}-${Date.now()}.pdf`;
//     formData.append("file", new File([pdfBlob], fileName, { type: "application/pdf" }));
//     const res = await fetch("/api/reports/upload-pdf", { method: "POST", body: formData });
//     const result = await res.json();
//     if (!res.ok || !result?.success || !result?.url) throw new Error(result?.message || "Upload failed");
//     return result.url as string;
//   };

//   const saveReport = async () => {
//     try {
//       setIsSaving(true);
//       setIsSaved(false);
//       if (!patient.patientName.trim()) { alert("Patient name is required"); return; }
//       const pdfBlob = await generatePdfBlob();
//       const uploadedPdfUrl = await uploadPdfToR2(pdfBlob);
//       const payload = {
//         reportId: `REP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
//         title, testName, patient, rows, columns,
//         pdfUrl: uploadedPdfUrl,
//         date: new Date().toISOString(),
//         createdAt: new Date().toISOString(),
//       };
//       const res = await fetch("/api/reports", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const result = await res.json();
//       if (!result.success) { alert("Failed to save report"); return; }
//       setIsSaved(true);
//       setPdfUrl(uploadedPdfUrl);
//       setShowSuccessOverlay(true);
//       setTimeout(() => setShowSuccessOverlay(false), 3000);
//     } catch (err) {
//       console.error("Save Report Error:", err);
//       alert("Server Error");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const qrValue = pdfUrl ? encodeURI(pdfUrl) : "";

//   const labelCls = "text-[11px] font-bold text-slate-700 shrink-0 whitespace-nowrap";
//   const valueCls = "outline-none text-[11px] text-slate-900 leading-tight min-h-[15px] bg-transparent ml-1";

//   const tableFontSize = isSmallSizeReport ? "text-[11px]" : "text-[13px]";
//   const normalResultSize = isSmallSizeReport ? "text-[13px]" : "text-[15px]";
//   const abnormalResultSize = isSmallSizeReport ? "text-[15px]" : "text-[17px]";

//   // CHANGED: added tests use larger font sizes than main table
//   const addedTableFontSize = isSmallSizeReport ? "text-[17px]" : "text-[16px]";
//   const addedNormalResultSize = isSmallSizeReport ? "text-[17px]" : "text-[19px]";
//   const addedAbnormalResultSize = isSmallSizeReport ? "text-[18px]" : "text-[21px]";

//   const colGroup = (
//     <colgroup>
//       <col style={{ width: "38%" }} />
//       <col style={{ width: "18%" }} />
//       <col style={{ width: "14%" }} />
//       <col style={{ width: "30%" }} />
//     </colgroup>
//   );

//   return (
//     <>
//       <style>{`
//         @media print {
//           * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
//           body * { visibility: hidden !important; }
//           .print-area, .print-area * { visibility: visible !important; }
//           .print-area {
//             position: fixed !important;
//             top: 0; left: 0;
//             width: 100vw !important;
//             max-width: 100vw !important;
//             padding: 1.8in 0.55in 0.4in 0.55in !important;
//             margin: 0 !important;
//             box-shadow: none !important;
//             border: none !important;
//             border-radius: 0 !important;
//             background: #fff !important;
//             overflow: visible !important;
//           }
//           .no-print { display: none !important; }
//           textarea, [contenteditable] {
//             border: none !important;
//             outline: none !important;
//             background: transparent !important;
//             -webkit-appearance: none;
//           }
//           table { border-collapse: collapse !important; }
//           th { background-color: #1d4ed8 !important; color: #fff !important; }
//           th, td { border: 1px solid #c7d2fe !important; padding: 3px 6px !important; }
//           .even-row { background-color: #f8fafc !important; }
//           .result-cell {
//             font-weight: 900 !important;
//             color: #000000 !important;
//             -webkit-text-stroke: 0.4px #000 !important;
//           }
//           .result-abnormal {
//             font-weight: 900 !important;
//             color: #000000 !important;
//             font-size: 16px !important;
//             -webkit-text-stroke: 0.6px #000 !important;
//           }
//           .range-cell { color: #374151 !important; font-weight: 600 !important; }
//           .cp-note-print {
//             font-size: 12px !important;
//             font-weight: 700 !important;
//             font-style: italic !important;
//             color: #1e3a8a !important;
//           }
//         }

//         [contenteditable]:empty:before {
//           content: attr(data-placeholder);
//           color: #94a3b8;
//           font-style: italic;
//           pointer-events: none;
//         }
//       `}</style>

//       <div className="min-h-screen bg-slate-100 p-3 text-black">

//         {/* ── TOOLBAR ── */}
//         <div className="flex flex-wrap gap-1.5 mb-3 no-print items-center relative">
//           <div className="relative">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => { setSearchQuery(e.target.value); setShowSearchPanel(true); }}
//               onFocus={() => setShowSearchPanel(true)}
//               placeholder="Search & add tests…"
//               className="rounded border border-slate-300 px-2.5 py-1.5 text-xs text-slate-800 outline-none focus:border-blue-500 w-52"
//             />
//             {showSearchPanel && searchQuery.trim() && (
//               <div className="absolute top-full left-0 z-30 mt-1 w-72 rounded-lg border border-slate-200 bg-white shadow-xl text-xs text-slate-700 max-h-56 overflow-y-auto">
//                 {filteredSearchResults.length > 0 ? (
//                   filteredSearchResults.slice(0, 10).map((item) => (
//                     <div key={item.id}
//                       className="flex items-center justify-between gap-2 px-3 py-1.5 hover:bg-blue-50 border-b border-slate-100 last:border-b-0 cursor-pointer"
//                       onClick={() => handleAddSearchTest(item)}
//                     >
//                       <div>
//                         <div className="font-medium text-slate-800 text-[11px]">{item.test}</div>
//                         <div className="text-slate-400 text-[10px]">{item.unit} · {item.normal}</div>
//                       </div>
//                       {!hiddenAddButtons.includes(item.id) && (
//                         <span className="rounded bg-blue-600 px-2 py-0.5 text-white text-[10px] shrink-0">+ ADD</span>
//                       )}
//                     </div>
//                   ))
//                 ) : (
//                   <div className="px-3 py-2 text-slate-400">No results</div>
//                 )}
//               </div>
//             )}
//           </div>

//           {[
//             { label: "+ Row", fn: addRow, c: "bg-emerald-600 hover:bg-emerald-700" },
//             { label: "− Row", fn: removeRow, c: "bg-red-500 hover:bg-red-600" },
//             { label: "+ Col", fn: addColumn, c: "bg-purple-600 hover:bg-purple-700" },
//             { label: "− Col", fn: removeColumn, c: "bg-orange-500 hover:bg-orange-600" },
//             { label: "Clear", fn: clearAll, c: "bg-slate-500 hover:bg-slate-600" },
//           ].map(({ label, fn, c }) => (
//             <button key={label} onClick={fn} className={`${c} text-white px-2.5 py-1.5 text-[11px] rounded font-medium`}>
//               {label}
//             </button>
//           ))}

//           {addedTests.length > 0 && (
//             <button onClick={() => { setAddedTests([]); setSearchQuery(""); }}
//               className="bg-red-400 hover:bg-red-500 text-white px-2.5 py-1.5 text-[11px] rounded font-medium">
//               Clear Added ({addedTests.length})
//             </button>
//           )}

//           <div className="flex gap-1.5 ml-auto">
//             <button onClick={saveReport} disabled={isSaving}
//               className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white px-3.5 py-1.5 text-[11px] rounded font-semibold">
//               {isSaving ? "Saving…" : "Save Report"}
//             </button>
//             {isSaved && (
//               <button onClick={() => handlePrint()}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 text-[11px] rounded font-semibold">
//                 Print
//               </button>
//             )}
//             <button onClick={lockTemplate}
//               className="bg-slate-900 hover:bg-black text-white px-3.5 py-1.5 text-[11px] rounded font-semibold">
//               Lock
//             </button>
//             <button onClick={unlockTemplate}
//               className="bg-amber-500 hover:bg-amber-600 text-white px-3.5 py-1.5 text-[11px] rounded font-semibold">
//               Edit
//             </button>
//           </div>
//         </div>

//         {/* ── REPORT CARD ── */}
//         <div
//           ref={printRef}
//           className="print-area mx-auto bg-white"
//           style={{ maxWidth: "794px", fontFamily: "'Segoe UI', Arial, sans-serif" }}
//         >
//           {/* ── PATIENT INFO — no top gap ── */}
//           <div className="px-5 pt-3 pb-0">
//             <div className="flex border-b border-slate-300 pb-2">

//               {/* Left column */}
//               <div className="flex-1 flex flex-col gap-[3px] pr-4">
//                 <div className="flex items-baseline gap-1">
//                   <span className={labelCls}>Patient:</span>
//                   <div ref={patientNameRef} contentEditable suppressContentEditableWarning dir="ltr"
//                     data-placeholder="Full name"
//                     onInput={(e) => updatePatient("patientName", e.currentTarget.innerText)}
//                     className={`${valueCls} flex-1 font-semibold`} />
//                 </div>
//                 <div className="flex items-baseline gap-1">
//                   <span className={labelCls}>Age / Sex:</span>
//                   <div ref={ageRef} contentEditable suppressContentEditableWarning dir="ltr"
//                     data-placeholder="Age"
//                     onInput={(e) => updatePatient("age", e.currentTarget.innerText)}
//                     className={`${valueCls} min-w-[28px]`} />
//                   <span className="text-[11px] text-slate-400">/</span>
//                   <div ref={genderRef} contentEditable suppressContentEditableWarning dir="ltr"
//                     data-placeholder="Sex"
//                     onInput={(e) => updatePatient("gender", e.currentTarget.innerText)}
//                     className={`${valueCls} min-w-[28px]`} />
//                 </div>
//                 <div className="flex items-baseline gap-1">
//                   <span className={labelCls}>Consultant:</span>
//                   <div ref={referredByRef} contentEditable suppressContentEditableWarning dir="ltr"
//                     onInput={(e) => updatePatient("referredBy", e.currentTarget.innerText)}
//                     className={valueCls} />
//                 </div>
//                 <div className="flex items-baseline gap-1">
//                   <span className={labelCls}>Indoor/Outdoor:</span>
//                   <div contentEditable suppressContentEditableWarning className={valueCls}>{patient.indoorOutdoor}</div>
//                 </div>
//                 <div className="flex items-baseline gap-1">
//                   <span className={labelCls}>Address:</span>
//                   <div ref={addressRef} contentEditable suppressContentEditableWarning dir="ltr"
//                     onInput={(e) => updatePatient("address", e.currentTarget.innerText)}
//                     className={`${valueCls} flex-1`}>{patient.address}</div>
//                 </div>
//               </div>

//               {/* Right column */}
//               <div className="flex flex-col gap-[3px]" style={{ minWidth: "195px" }}>
//                 <div className="flex items-baseline gap-1">
//                   <span className={labelCls}>Requested:</span>
//                   <div contentEditable suppressContentEditableWarning className={valueCls}>{patient.specimenDate}</div>
//                 </div>
//                 <div className="flex items-baseline gap-1">
//                   <span className={labelCls}>Reported:</span>
//                   <div contentEditable suppressContentEditableWarning className={valueCls}>{patient.specimenDate}</div>
//                 </div>
//                 <div className="flex items-baseline gap-1">
//                   <span className={labelCls}>Time:</span>
//                   <div contentEditable suppressContentEditableWarning className={valueCls}>{patient.time}</div>
//                   <div contentEditable suppressContentEditableWarning className={`${valueCls} w-7`}>{patient.ampm}</div>
//                 </div>
//                 <div className="flex items-baseline gap-1">
//                   <span className={labelCls}>Lab No:</span>
//                   <div ref={labNoRef} contentEditable suppressContentEditableWarning dir="ltr"
//                     onInput={(e) => updatePatient("labNo", e.currentTarget.innerText)}
//                     className={valueCls} />
//                 </div>
//                 <div className="flex items-baseline gap-1">
//                   <span className={labelCls}>Ward #:</span>
//                   <div ref={wardRef} contentEditable suppressContentEditableWarning dir="ltr"
//                     onInput={(e) => updatePatient("ward", e.currentTarget.innerText)}
//                     className={valueCls} />
//                 </div>

//                 {/* CHANGED: QR code placed here (was "QR after save" placeholder) */}
//                 <div className="flex items-center gap-1 mt-1">
//                   {pdfUrl ? (
//                     <QRCodeCanvas value={qrValue} size={58} level="H" />
//                   ) : (
//                     <div
//                       className="no-print flex items-center justify-center border border-dashed border-slate-300 rounded text-[9px] text-slate-400 text-center"
//                       style={{ width: 58, height: 58 }}
//                     >
//                       QR after save
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ── TITLE + TABLE ── */}
//           <div className="px-5 pb-3">

//             {/* Title section */}
//             {isCPReport ? (
//               <div className="mt-2 mb-0">
//                 <div className="text-[20px] font-extrabold text-blue-700 uppercase tracking-widest leading-tight">
//                   HAEMATOLOGY
//                 </div>
//                 <input
//                   type="text"
//                   disabled={isLocked}
//                   value={testName}
//                   onChange={(e) => setTestName(e.target.value)}
//                   className="w-full text-[20px] font-bold text-slate-900 outline-none border-b-2 border-blue-700 pb-0 mb-0 bg-transparent uppercase tracking-wider leading-tight"
//                 />
//               </div>
//             ) : (
//               <input
//                 type="text"
//                 disabled={isLocked}
//                 value={testName}
//                 onChange={(e) => setTestName(e.target.value)}
//                 className="w-full text-[20px] font-bold text-slate-900 outline-none border-b-2 border-blue-700 mt-2 pb-0 mb-0 bg-transparent uppercase tracking-widest leading-tight"
//               />
//             )}

//             {/* ── MAIN TABLE ── */}
//             <table className={`w-full border-collapse ${tableFontSize} mt-0`} style={{ tableLayout: "fixed" }}>
//               {colGroup}
//               <thead>
//                 <tr className="bg-blue-700 text-white">
//                   {columns.map((col, i) => (
//                     <th key={i} className="border border-blue-800 px-2 py-[4px] font-semibold">
//                       <input
//                         disabled={isLocked}
//                         value={col}
//                         onChange={(e) => { const u = [...columns]; u[i] = e.target.value; setColumns(u); }}
//                         className={`w-full text-center ${tableFontSize} font-semibold outline-none bg-transparent text-white`}
//                       />
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {rows.map((row, ri) => {
//                   const abnormal = isResultAbnormal(row.col2, row.col4);
//                   return (
//                     <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-slate-50 even-row"}>
//                       <td className="px-2 py-[3px] align-middle border-b border-slate-100">
//                         <textarea
//                           value={row.col1}
//                           onChange={(e) => {
//                             handleCellChange(ri, "col1", e.target.value);
//                             e.target.style.height = "auto";
//                             e.target.style.height = e.target.scrollHeight + "px";
//                           }}
//                           disabled={isLocked}
//                           rows={1}
//                           className={`w-full outline-none resize-none overflow-hidden bg-transparent font-medium ${tableFontSize} text-slate-800 min-h-[18px] leading-snug`}
//                         />
//                         {row.subtitle && <div className="text-[9px] text-slate-400">{row.subtitle}</div>}
//                       </td>
//                       <td className="px-1 py-[3px] text-center align-middle border-b border-slate-100">
//                         <textarea
//                           value={row.col2}
//                           onChange={(e) => {
//                             handleCellChange(ri, "col2", e.target.value);
//                             e.target.style.height = "auto";
//                             e.target.style.height = e.target.scrollHeight + "px";
//                           }}
//                           disabled={isLocked}
//                           rows={1}
//                           className={`result-cell w-full text-center outline-none resize-none overflow-hidden bg-transparent min-h-[18px] leading-snug
//                             ${abnormal
//                               ? `result-abnormal font-black text-red-700 text-6xl tracking-wide ${abnormalResultSize}`
//                               : `font-bold text-slate-900 ${normalResultSize}`
//                             }`}
//                         />
//                       </td>
//                       <td className="px-1 py-[3px] text-center align-middle border-b border-slate-100">
//                         <textarea
//                           value={row.col3}
//                           onChange={(e) => {
//                             handleCellChange(ri, "col3", e.target.value);
//                             e.target.style.height = "auto";
//                             e.target.style.height = e.target.scrollHeight + "px";
//                           }}
//                           disabled={isLocked}
//                           rows={1}
//                           className={`w-full text-center outline-none resize-none overflow-hidden bg-transparent ${tableFontSize} font-medium text-slate-600 min-h-[18px] leading-snug`}
//                         />
//                       </td>
//                       <td className="px-2 py-[3px] text-center align-middle border-b border-slate-100">
//                         <textarea
//                           value={row.col4}
//                           onChange={(e) => {
//                             handleCellChange(ri, "col4", e.target.value);
//                             e.target.style.height = "auto";
//                             e.target.style.height = e.target.scrollHeight + "px";
//                           }}
//                           disabled={isLocked}
//                           rows={1}
//                           className={`range-cell w-full text-center outline-none resize-none overflow-hidden bg-transparent ${tableFontSize} font-semibold text-slate-700 min-h-[18px] leading-snug`}
//                         />
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>

//             {/* CHANGED: CP note now comes BEFORE added tests, bigger + bold + italic + prominent */}
//             {isCPReport && (
//               <div className="cp-note-print mt-2 mb-1 px-2 py-2 rounded-md border-l-4 border-blue-700 bg-blue-50">
//                 <p className="text-[12px] font-bold italic text-blue-900 leading-snug">
//                   <span className="text-blue-700 font-extrabold not-italic mr-1"></span>
//                   A complete blood count (CBC) is a blood test used to evaluate your overall health and detect a wide range of disorders, including anemia, infection and leukemia.
//                 </p>
//               </div>
//             )}

//             {/* ── ADDED TESTS — larger font/size than main table ── */}
//             {addedTests.length > 0 && (
//               <>
//                 <table className={`w-full border-collapse ${addedTableFontSize} mt-1`} style={{ tableLayout: "fixed" }}>
//                   {colGroup}
//                   <thead>
//                     <tr style={{ background: "linear-gradient(90deg, #1e40af 0%, #2563eb 100%)" }} className="text-white">
//                       <th className="border border-blue-800 px-2 py-[5px] font-semibold text-left">
//                         <span className={`${addedTableFontSize} font-semibold`}>TEST / PARAMETER</span>
//                       </th>
//                       <th className="border border-blue-800 px-2 py-[5px] font-semibold text-center">
//                         <span className={`${addedTableFontSize} font-semibold`}>RESULT</span>
//                       </th>
//                       <th className="border border-blue-800 px-2 py-[5px] font-semibold text-center">
//                         <span className={`${addedTableFontSize} font-semibold`}>UNIT</span>
//                       </th>
//                       <th className="border border-blue-800 px-2 py-[5px] font-semibold text-center">
//                         <span className={`${addedTableFontSize} font-semibold`}>REFERENCE RANGE</span>
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {addedTests.map((item, index) => {
//                       const addedAbnormal = isResultAbnormal(item.result, item.normal);
//                       const baseIndex = rows.length + index;
//                       return (
//                         <tr key={item.id} className={baseIndex % 2 === 0 ? "bg-white" : "bg-blue-50/40 even-row"}>
//                           <td className="px-2 py-[5px] align-middle border-b border-blue-100">
//                             <textarea
//                               value={item.test}
//                               onChange={(e) => {
//                                 const u = [...addedTests]; u[index].test = e.target.value; setAddedTests(u);
//                                 e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px";
//                               }}
//                               rows={1}
//                               className={`w-full outline-none resize-none overflow-hidden bg-transparent font-medium ${addedTableFontSize} text-slate-800 min-h-[22px] leading-snug`}
//                             />
//                           </td>
//                           <td className="px-1 py-[5px] text-center align-middle border-b border-blue-100">
//                             <textarea
//                               value={item.result}
//                               onChange={(e) => {
//                                 const u = [...addedTests]; u[index].result = e.target.value; setAddedTests(u);
//                                 e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px";
//                               }}
//                               rows={1}
//                               placeholder="—"
//                               className={`result-cell w-full text-center outline-none resize-none overflow-hidden bg-transparent min-h-[22px] leading-snug
//                                 ${addedAbnormal
//                                   ? `result-abnormal font-black text-red-600 ${addedAbnormalResultSize}`
//                                   : `font-bold text-slate-900 ${addedNormalResultSize}`
//                                 }`}
//                             />
//                           </td>
//                           <td className="px-1 py-[5px] text-center align-middle border-b border-blue-100">
//                             <textarea
//                               value={item.unit}
//                               onChange={(e) => {
//                                 const u = [...addedTests]; u[index].unit = e.target.value; setAddedTests(u);
//                               }}
//                               rows={1}
//                               className={`w-full text-center outline-none resize-none overflow-hidden bg-transparent ${addedTableFontSize} font-medium text-slate-600 min-h-[22px] leading-snug`}
//                             />
//                           </td>
//                           <td className="px-2 py-[5px] text-center align-middle border-b border-blue-100">
//                             <textarea
//                               value={item.normal}
//                               onChange={(e) => {
//                                 const u = [...addedTests]; u[index].normal = e.target.value; setAddedTests(u);
//                               }}
//                               rows={1}
//                               className={`range-cell w-full text-center outline-none resize-none overflow-hidden bg-transparent ${addedTableFontSize} font-semibold text-slate-700 min-h-[22px] leading-snug`}
//                             />
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </>
//             )}

//           </div>
//         </div>

//         {/* ── SUCCESS OVERLAY ── */}
//         {showSuccessOverlay && (
//           <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 no-print">
//             <div className="bg-white rounded-xl p-6 shadow-2xl max-w-xs w-full mx-4 text-center">
//               <div className="text-green-500 text-4xl mb-2">✓</div>
//               <h2 className="text-base font-bold text-slate-800 mb-1">Saved Successfully</h2>
//               <p className="text-slate-500 text-xs mb-4">Report saved and PDF uploaded.</p>
//               <button onClick={() => setShowSuccessOverlay(false)}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold">
//                 Continue
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }














// "use client";

// import { useState, useRef, useEffect } from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import { useReactToPrint } from "react-to-print";
// import { toJpeg } from "html-to-image";
// import jsPDF from "jspdf";
// import { reportData } from "@/data/reportData";

// const getCurrentDate = () => {
//   const date = new Date();
//   return date
//     .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
//     .toUpperCase();
// };
// const getCurrentTime = () => {
//   const date = new Date();
//   return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
// };
// const getAMPM = () => (new Date().getHours() >= 12 ? "PM" : "AM");

// const parseRange = (normal: string): { low: number | null; high: number | null } => {
//   if (!normal) return { low: null, high: null };
//   const dash = normal.match(/^([\d.]+)\s*[-–]\s*([\d.]+)/);
//   if (dash) return { low: parseFloat(dash[1]), high: parseFloat(dash[2]) };
//   const gt = normal.match(/^[>≥]\s*([\d.]+)/);
//   if (gt) return { low: parseFloat(gt[1]), high: null };
//   const lt = normal.match(/^[<≤]\s*([\d.]+)/);
//   if (lt) return { low: null, high: parseFloat(lt[1]) };
//   return { low: null, high: null };
// };

// const isResultAbnormal = (result: string, normal: string) => {
//   const num = parseFloat(result);
//   if (isNaN(num) || !result.trim()) return false;
//   const { low, high } = parseRange(normal);
//   if (low !== null && num < low) return true;
//   if (high !== null && num > high) return true;
//   return false;
// };

// export default function DynamicTemplate({
//   title: initialTitle,
//   slug,
// }: {
//   title: string;
//   slug: string;
// }) {
//   const tests = reportData[slug] || [];
//   const isCPReport = slug === "cp";
//   const isUrineReport = slug === "urine";
//   const isSmallSizeReport = isCPReport || isUrineReport;

//   const allTests = Object.keys(reportData).flatMap((key) =>
//     (reportData[key] || []).map((item: any, index: number) => ({
//       id: `${key}-${index}`,
//       test: item.test || "",
//       unit: item.unit || "",
//       normal: item.normal || "",
//     }))
//   );

//   const [searchQuery, setSearchQuery] = useState("");
//   const [showSearchPanel, setShowSearchPanel] = useState(false);
//   const [addedTests, setAddedTests] = useState<any[]>([]);
//   const [hiddenAddButtons, setHiddenAddButtons] = useState<string[]>([]);
//   // CHANGED: title changed to "Liver Function Test" for the left panel
//   const [title] = useState(initialTitle);
//   const [isSaved, setIsSaved] = useState(false);
//   const [pdfUrl, setPdfUrl] = useState("");
//   const [isSaving, setIsSaving] = useState(false);

//   const [patient, setPatient] = useState({
//     patientName: "",
//     labNo: "",
//     age: "",
//     gender: "",
//     specimenDate: getCurrentDate(),
//     time: getCurrentTime(),
//     ampm: getAMPM(),
//     referredBy: "",
//     indoorOutdoor: "Nil",
//     address: "Nil",
//     ward: "",
//   });

//   const [testName, setTestName] = useState(
//     isCPReport ? "Blood Complete Picture" :
//     slug === "lft" ? "Liver Function Test" :
//     initialTitle
//   );

//   const [rows, setRows] = useState(
//     tests.map((item: any) => ({
//       col1: item.test || "",
//       col2: item.result || "",
//       col3: item.unit || "",
//       col4: item.normal || "",
//       subtitle: item.subtitle || "",
//       subheading: item.subheading || "",
//       styles: item.styles || {},
//     }))
//   );

//   const [columns, setColumns] = useState<string[]>([
//     "TEST / PARAMETER",
//     "RESULT",
//     "UNIT",
//     isCPReport ? "REF. VALUE" : "REFERENCE RANGE",
//   ]);

//   const [isLocked, setIsLocked] = useState(false);
//   const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
//   const [savedFieldHeights, setSavedFieldHeights] = useState<Record<string, number> | null>(null);

//   const patientNameRef = useRef<HTMLDivElement>(null);
//   const labNoRef = useRef<HTMLDivElement>(null);
//   const ageRef = useRef<HTMLDivElement>(null);
//   const genderRef = useRef<HTMLDivElement>(null);
//   const referredByRef = useRef<HTMLDivElement>(null);
//   const addressRef = useRef<HTMLDivElement>(null);
//   const wardRef = useRef<HTMLDivElement>(null);
//   const printRef = useRef<HTMLDivElement>(null);

//   const handlePrint = useReactToPrint({
//     contentRef: printRef,
//     documentTitle: "Printed Report",
//   });

//   useEffect(() => {
//     const savedTemplate = localStorage.getItem(`template-${title}`);
//     if (savedTemplate) {
//       const parsed = JSON.parse(savedTemplate);
//       setColumns(parsed.columns || []);
//       setRows(parsed.rows || []);
//       setIsLocked(parsed.isLocked || false);
//       setSavedFieldHeights(parsed.fieldHeights || null);
//     }
//   }, [title]);

//   const syncRef = (ref: React.RefObject<HTMLDivElement>, value: string) => {
//     if (ref.current && document.activeElement !== ref.current) {
//       ref.current.innerText = value;
//     }
//   };
//   useEffect(() => syncRef(patientNameRef, patient.patientName), [patient.patientName]);
//   useEffect(() => syncRef(labNoRef, patient.labNo), [patient.labNo]);
//   useEffect(() => {
//     if (ageRef.current && document.activeElement !== ageRef.current && patient.age)
//       ageRef.current.innerText = patient.age;
//   }, [patient.age]);
//   useEffect(() => {
//     if (genderRef.current && document.activeElement !== genderRef.current && patient.gender)
//       genderRef.current.innerText = patient.gender;
//   }, [patient.gender]);
//   useEffect(() => syncRef(referredByRef, patient.referredBy), [patient.referredBy]);
//   useEffect(() => syncRef(addressRef, patient.address), [patient.address]);
//   useEffect(() => syncRef(wardRef, patient.ward), [patient.ward]);

//   useEffect(() => {
//     if (!savedFieldHeights) return;
//     const apply = (ref: React.RefObject<HTMLDivElement>, key: string) => {
//       if (ref.current && savedFieldHeights[key])
//         ref.current.style.height = `${savedFieldHeights[key]}px`;
//     };
//     apply(patientNameRef, "patientName");
//     apply(labNoRef, "labNo");
//     apply(ageRef, "age");
//     apply(genderRef, "gender");
//     apply(referredByRef, "referredBy");
//     apply(addressRef, "address");
//     apply(wardRef, "ward");
//   }, [savedFieldHeights]);

//   const updatePatient = (field: string, value: string) =>
//     setPatient((prev) => ({ ...prev, [field]: value }));

//   const handleCellChange = (rowIndex: number, colKey: string, value: string) => {
//     const updated = [...rows];
//     updated[rowIndex][colKey as keyof (typeof updated)[0]] = value;
//     setRows(updated);
//   };

//   const filteredSearchResults = searchQuery.trim()
//     ? allTests.filter((item) => item.test.toLowerCase().includes(searchQuery.toLowerCase()))
//     : [];

//   const handleAddSearchTest = (item: any) => {
//     if (!addedTests.some((e) => e.test === item.test && e.unit === item.unit)) {
//       setAddedTests((prev) => [
//         ...prev,
//         { id: item.id, test: item.test, unit: item.unit, result: "", normal: item.normal },
//       ]);
//     }
//     setHiddenAddButtons((prev) => [...prev, item.id]);
//     setSearchQuery("");
//     setShowSearchPanel(false);
//   };

//   useEffect(() => { setHiddenAddButtons([]); }, [searchQuery]);

//   const addRow = () =>
//     setRows([...rows, { col1: "", col2: "", col3: "", col4: "", subtitle: "", subheading: "", styles: {} }]);
//   const removeRow = () => { if (rows.length > 1) setRows(rows.slice(0, -1)); };
//   const addColumn = () => {
//     const n = columns.length + 1;
//     setColumns([...columns, `Column ${n}`]);
//     setRows(rows.map((row) => ({ ...row, [`col${n}`]: "" })));
//   };
//   const removeColumn = () => {
//     if (columns.length <= 1) return;
//     const last = `col${columns.length}`;
//     setColumns(columns.slice(0, -1));
//     setRows(rows.map((row) => { const r = { ...row }; delete r[last as keyof typeof r]; return r; }));
//   };
//   const clearAll = () => setRows([]);

//   const lockTemplate = () => {
//     const data = {
//       columns, rows, isLocked: true,
//       fieldHeights: {
//         patientName: patientNameRef.current?.scrollHeight || 0,
//         labNo: labNoRef.current?.scrollHeight || 0,
//         age: ageRef.current?.scrollHeight || 0,
//         gender: genderRef.current?.scrollHeight || 0,
//         referredBy: referredByRef.current?.scrollHeight || 0,
//         address: addressRef.current?.scrollHeight || 0,
//         ward: wardRef.current?.scrollHeight || 0,
//       },
//     };
//     localStorage.setItem(`template-${title}`, JSON.stringify(data));
//     setIsLocked(true);
//     setShowSuccessOverlay(true);
//   };

//   const unlockTemplate = () => {
//     setIsLocked(false);
//     const saved = localStorage.getItem(`template-${title}`);
//     if (saved)
//       localStorage.setItem(`template-${title}`, JSON.stringify({ ...JSON.parse(saved), isLocked: false }));
//   };

//   // ── PDF: capture with padding so nothing gets cut ──
//   const generatePdfBlob = async (): Promise<Blob> => {
//     if (!printRef.current) throw new Error("Printable area not found");
//     const el = printRef.current;

//     const prevStyles = {
//       maxWidth: el.style.maxWidth,
//       width: el.style.width,
//       padding: el.style.padding,
//       margin: el.style.margin,
//       position: el.style.position,
//     };

//     el.style.maxWidth = "none";
//     el.style.width = "750px";
//     el.style.padding = "24px 28px";
//     el.style.margin = "0";
//     el.style.position = "relative";

//     await new Promise((r) => setTimeout(r, 120));

//     const captureWidth = 750 + 56;
//     const captureHeight = el.scrollHeight;

//     const dataUrl = await toJpeg(el, {
//       cacheBust: true,
//       backgroundColor: "#ffffff",
//       quality: 1.0,
//       pixelRatio: 2,
//       width: captureWidth,
//       height: captureHeight,
//     });

//     el.style.maxWidth = prevStyles.maxWidth;
//     el.style.width = prevStyles.width;
//     el.style.padding = prevStyles.padding;
//     el.style.margin = prevStyles.margin;
//     el.style.position = prevStyles.position;

//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.src = dataUrl;
//     await new Promise<void>((res, rej) => {
//       img.onload = () => res();
//       img.onerror = () => rej(new Error("Image load failed"));
//     });

//     const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4", compress: true });
//     const pageW = pdf.internal.pageSize.getWidth();
//     const pageH = pdf.internal.pageSize.getHeight();

//     const margin = 8;
//     const contentW = pageW - margin * 2;
//     const imgH = (img.height * contentW) / img.width;

//     let heightLeft = imgH;
//     let yPos = margin;

//     pdf.addImage(dataUrl, "JPEG", margin, yPos, contentW, imgH, undefined, "FAST");
//     heightLeft -= (pageH - margin);

//     while (heightLeft > 0) {
//       pdf.addPage();
//       yPos = margin - (imgH - heightLeft);
//       pdf.addImage(dataUrl, "JPEG", margin, yPos, contentW, imgH, undefined, "FAST");
//       heightLeft -= pageH;
//     }

//     return pdf.output("blob");
//   };

//   const uploadPdfToR2 = async (pdfBlob: Blob): Promise<string> => {
//     const formData = new FormData();
//     const fileName = `${slug}-${Date.now()}.pdf`;
//     formData.append("file", new File([pdfBlob], fileName, { type: "application/pdf" }));
//     const res = await fetch("/api/reports/upload-pdf", { method: "POST", body: formData });
//     const result = await res.json();
//     if (!res.ok || !result?.success || !result?.url) throw new Error(result?.message || "Upload failed");
//     return result.url as string;
//   };

//   const saveReport = async () => {
//     try {
//       setIsSaving(true);
//       setIsSaved(false);
//       if (!patient.patientName.trim()) { alert("Patient name is required"); return; }
//       const pdfBlob = await generatePdfBlob();
//       const uploadedPdfUrl = await uploadPdfToR2(pdfBlob);
//       const payload = {
//         reportId: `REP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
//         title, testName, patient, rows, columns,
//         pdfUrl: uploadedPdfUrl,
//         date: new Date().toISOString(),
//         createdAt: new Date().toISOString(),
//       };
//       const res = await fetch("/api/reports", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const result = await res.json();
//       if (!result.success) { alert("Failed to save report"); return; }
//       setIsSaved(true);
//       setPdfUrl(uploadedPdfUrl);
//       setShowSuccessOverlay(true);
//       setTimeout(() => setShowSuccessOverlay(false), 3000);
//     } catch (err) {
//       console.error("Save Report Error:", err);
//       alert("Server Error");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const qrValue = pdfUrl ? encodeURI(pdfUrl) : "";

//   const labelCls = "text-[13px] font-bold text-slate-700 shrink-0 whitespace-nowrap";
//   const valueCls = "outline-none text-[13px] text-slate-900 leading-tight min-h-[15px] bg-transparent ml-1";

//   const tableFontSize = isSmallSizeReport ? "text-[12px]" : "text-[13px]";
//   const normalResultSize = isSmallSizeReport ? "text-[13px]" : "text-[15px]";
//   const abnormalResultSize = isSmallSizeReport ? "text-[15px]" : "text-[17px]";

//   // CHANGED: added tests use larger font sizes than main table
//   const addedTableFontSize = isSmallSizeReport ? "text-[20px]" : "text-[20px]";
//   const addedNormalResultSize = isSmallSizeReport ? "text-[20px]" : "text-[24px]";
//   const addedAbnormalResultSize = isSmallSizeReport ? "text-[22px]" : "text-[26px]";

//   const colGroup = (
//     <colgroup>
//       <col style={{ width: "38%" }} />
//       <col style={{ width: "18%" }} />
//       <col style={{ width: "14%" }} />
//       <col style={{ width: "30%" }} />
//     </colgroup>
//   );

//   return (
//     <>
//       <style>{`
//         @media print {
//           * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
//           body * { visibility: hidden !important; }
//           .print-area, .print-area * { visibility: visible !important; }
//           .print-area {
//             position: fixed !important;
//             top: 0; left: 0;
//             width: 100vw !important;
//             max-width: 100vw !important;
//             padding: 1.8in 0.55in 0.4in 0.55in !important;
//             margin: 0 !important;
//             box-shadow: none !important;
//             border: none !important;
//             border-radius: 0 !important;
//             background: #fff !important;
//             overflow: visible !important;
//           }
//           .no-print { display: none !important; }
//           textarea, [contenteditable] {
//             border: none !important;
//             outline: none !important;
//             background: transparent !important;
//             -webkit-appearance: none;
//           }
//           table { border-collapse: collapse !important; }
//           th { background-color: #1d4ed8 !important; color: #fff !important; }
//           th, td { border: 1px solid #c7d2fe !important; padding: 3px 6px !important; }
//           .even-row { background-color: #f8fafc !important; }
//           .result-cell {
//             font-weight: 900 !important;
//             color: #000000 !important;
//             -webkit-text-stroke: 0.4px #000 !important;
//           }
//           .result-abnormal {
//             font-weight: 1000 !important;
//             color: #7f1d1d !important;
//             font-size: 18px !important;
//             -webkit-text-stroke: 1px #7f1d1d !important;
//           }
//           .range-cell { color: #374151 !important; font-weight: 600 !important; }
//           .cp-note-print {
//             font-size: 14px !important;
//             font-weight: 800 !important;
//             font-style: italic !important;
//             color: #1e3a8a !important;
//           }
//         }

//         [contenteditable]:empty:before {
//           content: attr(data-placeholder);
//           color: #94a3b8;
//           font-style: italic;
//           pointer-events: none;
//         }
//       `}</style>

//       <div className="min-h-screen bg-slate-100 p-3 text-black">

//         {/* ── TOOLBAR ── */}
//         <div className="flex flex-wrap gap-1.5 mb-3 no-print items-center relative">
//           <div className="relative">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => { setSearchQuery(e.target.value); setShowSearchPanel(true); }}
//               onFocus={() => setShowSearchPanel(true)}
//               placeholder="Search & add tests…"
//               className="rounded border border-slate-300 px-2.5 py-1.5 text-xs text-slate-800 outline-none focus:border-blue-500 w-52"
//             />
//             {showSearchPanel && searchQuery.trim() && (
//               <div className="absolute top-full left-0 z-30 mt-1 w-72 rounded-lg border border-slate-200 bg-white shadow-xl text-xs text-slate-700 max-h-56 overflow-y-auto">
//                 {filteredSearchResults.length > 0 ? (
//                   filteredSearchResults.slice(0, 10).map((item) => (
//                     <div key={item.id}
//                       className="flex items-center justify-between gap-2 px-3 py-1.5 hover:bg-blue-50 border-b border-slate-100 last:border-b-0 cursor-pointer"
//                       onClick={() => handleAddSearchTest(item)}
//                     >
//                       <div>
//                         <div className="font-medium text-slate-800 text-[11px]">{item.test}</div>
//                         <div className="text-slate-400 text-[10px]">{item.unit} · {item.normal}</div>
//                       </div>
//                       {!hiddenAddButtons.includes(item.id) && (
//                         <span className="rounded bg-blue-600 px-2 py-0.5 text-white text-[10px] shrink-0">+ ADD</span>
//                       )}
//                     </div>
//                   ))
//                 ) : (
//                   <div className="px-3 py-2 text-slate-400">No results</div>
//                 )}
//               </div>
//             )}
//           </div>

//           {[
//             { label: "+ Row", fn: addRow, c: "bg-emerald-600 hover:bg-emerald-700" },
//             { label: "− Row", fn: removeRow, c: "bg-red-500 hover:bg-red-600" },
//             { label: "+ Col", fn: addColumn, c: "bg-purple-600 hover:bg-purple-700" },
//             { label: "− Col", fn: removeColumn, c: "bg-orange-500 hover:bg-orange-600" },
//             { label: "Clear", fn: clearAll, c: "bg-slate-500 hover:bg-slate-600" },
//           ].map(({ label, fn, c }) => (
//             <button key={label} onClick={fn} className={`${c} text-white px-2.5 py-1.5 text-[11px] rounded font-medium`}>
//               {label}
//             </button>
//           ))}

//           {addedTests.length > 0 && (
//             <button onClick={() => { setAddedTests([]); setSearchQuery(""); }}
//               className="bg-red-400 hover:bg-red-500 text-white px-2.5 py-1.5 text-[11px] rounded font-medium">
//               Clear Added ({addedTests.length})
//             </button>
//           )}

//           <div className="flex gap-1.5 ml-auto">
//             <button onClick={saveReport} disabled={isSaving}
//               className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white px-3.5 py-1.5 text-[11px] rounded font-semibold">
//               {isSaving ? "Saving…" : "Save Report"}
//             </button>
//             {isSaved && (
//               <button onClick={() => handlePrint()}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 text-[11px] rounded font-semibold">
//                 Print
//               </button>
//             )}
//             <button onClick={lockTemplate}
//               className="bg-slate-900 hover:bg-black text-white px-3.5 py-1.5 text-[11px] rounded font-semibold">
//               Lock
//             </button>
//             <button onClick={unlockTemplate}
//               className="bg-amber-500 hover:bg-amber-600 text-white px-3.5 py-1.5 text-[11px] rounded font-semibold">
//               Edit
//             </button>
//           </div>
//         </div>

//         {/* ── REPORT CARD ── */}
//         <div
//           ref={printRef}
//           className="print-area mx-auto bg-white"
//           style={{ maxWidth: "794px", fontFamily: "'Segoe UI', Arial, sans-serif" }}
//         >
//           {/* ── PATIENT INFO — no top gap ── */}
//           <div className="px-5 pt-3 pb-0">
//             <div className="flex border-b border-slate-300 pb-2">

//               {/* Left column */}
//               <div className="flex-1 flex flex-col gap-[3px] pr-4">
//                 <div className="flex items-baseline gap-1">
//                   <span className={labelCls}>Patient:</span>
//                   <div ref={patientNameRef} contentEditable suppressContentEditableWarning dir="ltr"
//                     data-placeholder="Full name"
//                     onInput={(e) => updatePatient("patientName", e.currentTarget.innerText)}
//                     className={`${valueCls} flex-1 font-semibold`} />
//                 </div>
//                 <div className="flex items-baseline gap-1">
//                   <span className={labelCls}>Age / Sex:</span>
//                   <div ref={ageRef} contentEditable suppressContentEditableWarning dir="ltr"
//                     data-placeholder="Age"
//                     onInput={(e) => updatePatient("age", e.currentTarget.innerText)}
//                     className={`${valueCls} min-w-[28px]`} />
//                   <span className="text-[11px] text-slate-400">/</span>
//                   <div ref={genderRef} contentEditable suppressContentEditableWarning dir="ltr"
//                     data-placeholder="Sex"
//                     onInput={(e) => updatePatient("gender", e.currentTarget.innerText)}
//                     className={`${valueCls} min-w-[28px]`} />
//                 </div>
//                 <div className="flex items-baseline gap-1">
//                   <span className={labelCls}>Consultant:</span>
//                   <div ref={referredByRef} contentEditable suppressContentEditableWarning dir="ltr"
//                     onInput={(e) => updatePatient("referredBy", e.currentTarget.innerText)}
//                     className={valueCls} />
//                 </div>
//                 <div className="flex items-baseline gap-1">
//                   <span className={labelCls}>Indoor/Outdoor:</span>
//                   <div contentEditable suppressContentEditableWarning className={valueCls}>{patient.indoorOutdoor}</div>
//                 </div>
//                 <div className="flex items-baseline gap-1">
//                   <span className={labelCls}>Address:</span>
//                   <div ref={addressRef} contentEditable suppressContentEditableWarning dir="ltr"
//                     onInput={(e) => updatePatient("address", e.currentTarget.innerText)}
//                     className={`${valueCls} flex-1`}>{patient.address}</div>
//                 </div>
//               </div>

//               {/* Right column */}
//               <div className="flex flex-col gap-[3px]" style={{ minWidth: "195px" }}>
//                 <div className="flex items-baseline gap-2">
//                   <span className={labelCls}>Requested:</span>
//                   <div contentEditable suppressContentEditableWarning className={valueCls}>{patient.specimenDate}</div>
//                 </div>
//                 <div className="flex items-baseline gap-2">
//                   <span className={labelCls}>Reported:</span>
//                   <div contentEditable suppressContentEditableWarning className={valueCls}>{patient.specimenDate}</div>
//                 </div>
//                 <div className="flex items-baseline gap-1">
//                   <span className={labelCls}>Time:</span>
//                   <div contentEditable suppressContentEditableWarning className={valueCls}>{patient.time}</div>
//                   <div contentEditable suppressContentEditableWarning className={`${valueCls} w-7`}>{patient.ampm}</div>
//                 </div>
//                 <div className="flex items-baseline gap-1">
//                   <span className={labelCls}>Lab No:</span>
//                   <div ref={labNoRef} contentEditable suppressContentEditableWarning dir="ltr"
//                     onInput={(e) => updatePatient("labNo", e.currentTarget.innerText)}
//                     className={valueCls} />
//                 </div>
//                 <div className="flex items-baseline gap-1">
//                   <span className={labelCls}>Ward #:</span>
//                   <div ref={wardRef} contentEditable suppressContentEditableWarning dir="ltr"
//                     onInput={(e) => updatePatient("ward", e.currentTarget.innerText)}
//                     className={valueCls} />
//                 </div>
//               </div>

//               {/* QR Code - Single */}
//               <div className="flex flex-col items-center justify-start">
//                 {pdfUrl ? (
//                   <QRCodeCanvas value={qrValue} size={60} level="H" />
//                 ) : (
//                   <div
//                     className="flex items-center justify-center text-[10px] text-slate-400"
//                     style={{ width: 60, height: 60 }}
//                   >
//                     QR
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* ── TITLE + TABLE ── */}
//           <div className="px-5 pb-3">

//             {/* Title section */}
//             {isCPReport ? (
//               <div className="mt-2 mb-0">
//                 <div className="text-[24px] font-extrabold text-blue-700 uppercase tracking-widest leading-tight">
//                   HAEMATOLOGY
//                 </div>
//                 <input
//                   type="text"
//                   disabled={isLocked}
//                   value={testName}
//                   onChange={(e) => setTestName(e.target.value)}
//                   className="w-full text-[24px] font-bold text-slate-900 outline-none border-b-2 border-blue-700 pb-0 mb-0 bg-transparent uppercase tracking-wider leading-tight"
//                 />
//               </div>
//             ) : (
//               <input
//                 type="text"
//                 disabled={isLocked}
//                 value={testName}
//                 onChange={(e) => setTestName(e.target.value)}
//                 className="w-full text-[20px] font-bold text-slate-900 outline-none border-b-2 border-blue-700 mt-2 pb-0 mb-0 bg-transparent uppercase tracking-widest leading-tight"
//               />
//             )}

//             {/* ── MAIN TABLE ── */}
//             <table className={`w-full border-collapse ${tableFontSize} mt-0`} style={{ tableLayout: "fixed" }}>
//               {colGroup}
//               <thead>
//                 <tr className="bg-blue-700 text-white">
//                   {columns.map((col, i) => (
//                     <th key={i} className="border border-blue-800 px-2 py-[4px] font-semibold">
//                       <input
//                         disabled={isLocked}
//                         value={col}
//                         onChange={(e) => { const u = [...columns]; u[i] = e.target.value; setColumns(u); }}
//                         className={`w-full text-center ${tableFontSize} font-bold outline-none bg-transparent text-white`}
//                       />
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {rows.map((row, ri) => {
//                   const abnormal = isResultAbnormal(row.col2, row.col4);
//                   return (
//                     <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-slate-50 even-row"}>
//                       <td className="px-2 py-[3px] align-middle border-b border-slate-100">
//                         <textarea
//                           value={row.col1}
//                           onChange={(e) => {
//                             handleCellChange(ri, "col1", e.target.value);
//                             e.target.style.height = "auto";
//                             e.target.style.height = e.target.scrollHeight + "px";
//                           }}
//                           disabled={isLocked}
//                           rows={1}
//                           className={`w-full outline-none resize-none overflow-hidden bg-transparent font-medium ${tableFontSize} text-slate-800 min-h-[18px] leading-snug`}
//                         />
//                         {row.subtitle && <div className="text-[9px] text-slate-400">{row.subtitle}</div>}
//                       </td>
//                       <td className="px-1 py-[3px] text-center align-middle border-b border-slate-100">
//                         <textarea
//                           value={row.col2}
//                           onChange={(e) => {
//                             handleCellChange(ri, "col2", e.target.value);
//                             e.target.style.height = "auto";
//                             e.target.style.height = e.target.scrollHeight + "px";
//                           }}
//                           disabled={isLocked}
//                           rows={1}
//                           className={`result-cell w-full text-center outline-none resize-none overflow-hidden bg-transparent min-h-[18px] leading-snug
//                             ${abnormal
//                               ? `result-abnormal font-black text-red-700 text-6xl tracking-wide ${abnormalResultSize}`
//                               : `font-bold text-slate-900 ${normalResultSize}`
//                             }`}
//                         />
//                       </td>
//                       <td className="px-1 py-[3px] text-center align-middle border-b border-slate-100">
//                         <textarea
//                           value={row.col3}
//                           onChange={(e) => {
//                             handleCellChange(ri, "col3", e.target.value);
//                             e.target.style.height = "auto";
//                             e.target.style.height = e.target.scrollHeight + "px";
//                           }}
//                           disabled={isLocked}
//                           rows={1}
//                           className={`w-full text-center outline-none resize-none overflow-hidden bg-transparent ${tableFontSize} font-medium text-slate-600 min-h-[18px] leading-snug`}
//                         />
//                       </td>
//                       <td className="px-2 py-[3px] text-center align-middle border-b border-slate-100">
//                         <textarea
//                           value={row.col4}
//                           onChange={(e) => {
//                             handleCellChange(ri, "col4", e.target.value);
//                             e.target.style.height = "auto";
//                             e.target.style.height = e.target.scrollHeight + "px";
//                           }}
//                           disabled={isLocked}
//                           rows={1}
//                           className={`range-cell w-full text-center outline-none resize-none overflow-hidden bg-transparent ${tableFontSize} font-semibold text-slate-700 min-h-[18px] leading-snug`}
//                         />
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>

//             {/* CHANGED: CP note now comes BEFORE added tests, bigger + bold + italic + prominent */}
//             {isCPReport && (
//               <div className="cp-note-print mt-2 mb-1 px-2 py-2 rounded-md border-l-4 border-blue-700 bg-blue-50">
//                 <p className="text-[14px] font-bold italic text-blue-900 leading-snug">
//                   <span className="text-blue-700 font-extrabold not-italic mr-1"></span>
//                   A complete blood count (CBC) is a blood test used to evaluate your overall health and detect a wide range of disorders, including anemia, infection and leukemia.
//                 </p>
//               </div>
//             )}

//             {/* ── ADDED TESTS — larger font/size than main table ── */}
//             {addedTests.length > 0 && (
//               <>
//                 <table className={`w-full border-collapse ${addedTableFontSize} mt-2`} style={{ tableLayout: "fixed" }}>
//                   {colGroup}
//                   <thead>
//                     <tr style={{ background: "linear-gradient(90deg, #1e40af 0%, #2563eb 100%)" }} className="text-white">
//                       <th className="border border-blue-800 px-3 py-[6px] font-bold text-left">
//                         <span className={`${addedTableFontSize} font-bold`}>TEST / PARAMETER</span>
//                       </th>
//                       <th className="border border-blue-800 px-3 py-[6px] font-bold text-center">
//                         <span className={`${addedTableFontSize} font-bold`}>RESULT</span>
//                       </th>
//                       <th className="border border-blue-800 px-3 py-[6px] font-bold text-center">
//                         <span className={`${addedTableFontSize} font-bold`}>UNIT</span>
//                       </th>
//                       <th className="border border-blue-800 px-3 py-[6px] font-bold text-center">
//                         <span className={`${addedTableFontSize} font-bold`}>REFERENCE RANGE</span>
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {addedTests.map((item, index) => {
//                       const addedAbnormal = isResultAbnormal(item.result, item.normal);
//                       const baseIndex = rows.length + index;
//                       return (
//                         <tr key={item.id} className={baseIndex % 2 === 0 ? "bg-white" : "bg-blue-50/40 even-row"}>
//                           <td className="px-3 py-[7px] align-middle border-b border-blue-100">
//                             <textarea
//                               value={item.test}
//                               onChange={(e) => {
//                                 const u = [...addedTests]; u[index].test = e.target.value; setAddedTests(u);
//                                 e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px";
//                               }}
//                               rows={1}
//                               className={`w-full outline-none resize-none overflow-hidden bg-transparent font-bold ${addedTableFontSize} text-slate-800 min-h-[28px] leading-snug`}
//                             />
//                           </td>
//                           <td className="px-2 py-[7px] text-center align-middle border-b border-blue-100">
//                             <textarea
//                               value={item.result}
//                               onChange={(e) => {
//                                 const u = [...addedTests]; u[index].result = e.target.value; setAddedTests(u);
//                                 e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px";
//                               }}
//                               rows={1}
//                               placeholder="—"
//                               className={`result-cell w-full text-center outline-none resize-none overflow-hidden bg-transparent min-h-[28px] leading-snug
//                                 ${addedAbnormal
//                                   ? `result-abnormal font-black text-red-600 ${addedAbnormalResultSize}`
//                                   : `font-bold text-slate-900 ${addedNormalResultSize}`
//                                 }`}
//                             />
//                           </td>
//                           <td className="px-2 py-[7px] text-center align-middle border-b border-blue-100">
//                             <textarea
//                               value={item.unit}
//                               onChange={(e) => {
//                                 const u = [...addedTests]; u[index].unit = e.target.value; setAddedTests(u);
//                               }}
//                               rows={1}
//                               className={`w-full text-center outline-none resize-none overflow-hidden bg-transparent ${addedTableFontSize} font-bold text-slate-600 min-h-[28px] leading-snug`}
//                             />
//                           </td>
//                           <td className="px-3 py-[7px] text-center align-middle border-b border-blue-100">
//                             <textarea
//                               value={item.normal}
//                               onChange={(e) => {
//                                 const u = [...addedTests]; u[index].normal = e.target.value; setAddedTests(u);
//                               }}
//                               rows={1}
//                               className={`range-cell w-full text-center outline-none resize-none overflow-hidden bg-transparent ${addedTableFontSize} font-bold text-slate-700 min-h-[28px] leading-snug`}
//                             />
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </>
//             )}

//           </div>
//         </div>

//         {/* ── SUCCESS OVERLAY ── */}
//         {showSuccessOverlay && (
//           <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 no-print">
//             <div className="bg-white rounded-xl p-6 shadow-2xl max-w-xs w-full mx-4 text-center">
//               <div className="text-green-500 text-4xl mb-2">✓</div>
//               <h2 className="text-base font-bold text-slate-800 mb-1">Saved Successfully</h2>
//               <p className="text-slate-500 text-xs mb-4">Report saved and PDF uploaded.</p>
//               <button onClick={() => setShowSuccessOverlay(false)}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold">
//                 Continue
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }













// "use client";

// import { useState, useRef, useEffect } from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import { useReactToPrint } from "react-to-print";
// import { toJpeg } from "html-to-image";
// import jsPDF from "jspdf";
// import { reportData } from "@/data/reportData";

// const getCurrentDate = () => {
//   const date = new Date();
//   return date
//     .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
//     .toUpperCase();
// };
// const getCurrentTime = () => {
//   const date = new Date();
//   return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
// };
// const getAMPM = () => (new Date().getHours() >= 12 ? "PM" : "AM");

// const parseRange = (normal: string): { low: number | null; high: number | null } => {
//   if (!normal) return { low: null, high: null };
//   const dash = normal.match(/^([\d.]+)\s*[-–]\s*([\d.]+)/);
//   if (dash) return { low: parseFloat(dash[1]), high: parseFloat(dash[2]) };
//   const gt = normal.match(/^[>≥]\s*([\d.]+)/);
//   if (gt) return { low: parseFloat(gt[1]), high: null };
//   const lt = normal.match(/^[<≤]\s*([\d.]+)/);
//   if (lt) return { low: null, high: parseFloat(lt[1]) };
//   return { low: null, high: null };
// };

// const isResultAbnormal = (result: string, normal: string) => {
//   const num = parseFloat(result);
//   if (isNaN(num) || !result.trim()) return false;
//   const { low, high } = parseRange(normal);
//   if (low !== null && num < low) return true;
//   if (high !== null && num > high) return true;
//   return false;
// };

// // CP ke sirf yeh 6 tests bold honge
// const CP_BOLD_TESTS = [
//   "wbc", "white blood cell", "white blood count",
//   "haemoglobin", "hemoglobin", "hgb", "hb",
//   "haematocrit", "hematocrit", "hct", "packed cell volume", "pcv",
//   "platelet count", "platelets", "plt",
//   "neutrophil",
//   "lymphocyte",
// ];
// const isCPBoldTest = (name: string) =>
//   CP_BOLD_TESTS.some((t) => name.toLowerCase().trim().includes(t));

// export default function DynamicTemplate({
//   title: initialTitle,
//   slug,
// }: {
//   title: string;
//   slug: string;
// }) {
//   const tests = reportData[slug] || [];
//   const isCPReport = slug === "cp";
//   const isUrineReport = slug === "urine";
//   const isSmallSizeReport = isCPReport || isUrineReport;

//   const allTests = Object.keys(reportData).flatMap((key) =>
//     (reportData[key] || []).map((item: any, index: number) => ({
//       id: `${key}-${index}`,
//       test: item.test || "",
//       unit: item.unit || "",
//       normal: item.normal || "",
//     }))
//   );

//   const [searchQuery, setSearchQuery] = useState("");
//   const [showSearchPanel, setShowSearchPanel] = useState(false);
//   const [addedTests, setAddedTests] = useState<any[]>([]);
//   const [hiddenAddButtons, setHiddenAddButtons] = useState<string[]>([]);
//   const [title] = useState(initialTitle);
//   const [isSaved, setIsSaved] = useState(false);
//   const [pdfUrl, setPdfUrl] = useState("");
//   const [isSaving, setIsSaving] = useState(false);

//   const [patient, setPatient] = useState({
//     patientName: "",
//     labNo: "",
//     age: "",
//     gender: "",
//     specimenDate: getCurrentDate(),
//     time: getCurrentTime(),
//     ampm: getAMPM(),
//     referredBy: "",
//     indoorOutdoor: "Nil",
//     address: "Nil",
//     ward: "",
//   });

//   const [testName, setTestName] = useState(
//     isCPReport ? "Blood Complete Picture" :
//     slug === "lft" ? "Liver Function Test" :
//     initialTitle
//   );

//   const [rows, setRows] = useState(
//     tests.map((item: any) => ({
//       col1: item.test || "",
//       col2: item.result || "",
//       col3: item.unit || "",
//       col4: item.normal || "",
//       subtitle: item.subtitle || "",
//       subheading: item.subheading || "",
//       styles: item.styles || {},
//     }))
//   );

//   const [columns, setColumns] = useState<string[]>([
//     "TEST / PARAMETER",
//     "RESULT",
//     "UNIT",
//     isCPReport ? "REF. VALUE" : "REFERENCE RANGE",
//   ]);

//   const [isLocked, setIsLocked] = useState(false);
//   const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
//   const [savedFieldHeights, setSavedFieldHeights] = useState<Record<string, number> | null>(null);
//   const [lockedSlug, setLockedSlug] = useState<string | null>(null);

//   const patientNameRef = useRef<HTMLDivElement>(null);
//   const labNoRef = useRef<HTMLDivElement>(null);
//   const ageRef = useRef<HTMLDivElement>(null);
//   const genderRef = useRef<HTMLDivElement>(null);
//   const referredByRef = useRef<HTMLDivElement>(null);
//   const addressRef = useRef<HTMLDivElement>(null);
//   const wardRef = useRef<HTMLDivElement>(null);
//   const printRef = useRef<HTMLDivElement>(null);

//   const handlePrint = useReactToPrint({
//     contentRef: printRef,
//     documentTitle: "Printed Report",
//   });

//   useEffect(() => {
//     const key = `template-${slug}`;
//     const savedTemplate = localStorage.getItem(key);
//     if (savedTemplate) {
//       const parsed = JSON.parse(savedTemplate);
//       if (parsed.isLocked) {
//         setColumns(parsed.columns || columns);
//         setRows(parsed.rows || rows);
//         setIsLocked(true);
//         setLockedSlug(slug);
//         setSavedFieldHeights(parsed.fieldHeights || null);
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [slug]);

//   const syncRef = (ref: React.RefObject<HTMLDivElement>, value: string) => {
//     if (ref.current && document.activeElement !== ref.current) {
//       ref.current.innerText = value;
//     }
//   };
//   useEffect(() => syncRef(patientNameRef, patient.patientName), [patient.patientName]);
//   useEffect(() => syncRef(labNoRef, patient.labNo), [patient.labNo]);
//   useEffect(() => {
//     if (ageRef.current && document.activeElement !== ageRef.current && patient.age)
//       ageRef.current.innerText = patient.age;
//   }, [patient.age]);
//   useEffect(() => {
//     if (genderRef.current && document.activeElement !== genderRef.current && patient.gender)
//       genderRef.current.innerText = patient.gender;
//   }, [patient.gender]);
//   useEffect(() => syncRef(referredByRef, patient.referredBy), [patient.referredBy]);
//   useEffect(() => syncRef(addressRef, patient.address), [patient.address]);
//   useEffect(() => syncRef(wardRef, patient.ward), [patient.ward]);

//   useEffect(() => {
//     if (!savedFieldHeights) return;
//     const apply = (ref: React.RefObject<HTMLDivElement>, key: string) => {
//       if (ref.current && savedFieldHeights[key])
//         ref.current.style.height = `${savedFieldHeights[key]}px`;
//     };
//     apply(patientNameRef, "patientName");
//     apply(labNoRef, "labNo");
//     apply(ageRef, "age");
//     apply(genderRef, "gender");
//     apply(referredByRef, "referredBy");
//     apply(addressRef, "address");
//     apply(wardRef, "ward");
//   }, [savedFieldHeights]);

//   const updatePatient = (field: string, value: string) =>
//     setPatient((prev) => ({ ...prev, [field]: value }));

//   const handleCellChange = (rowIndex: number, colKey: string, value: string) => {
//     const updated = [...rows];
//     updated[rowIndex][colKey as keyof (typeof updated)[0]] = value;
//     setRows(updated);
//   };

//   const filteredSearchResults = searchQuery.trim()
//     ? allTests.filter((item) => item.test.toLowerCase().includes(searchQuery.toLowerCase()))
//     : [];

//   const handleAddSearchTest = (item: any) => {
//     const hasIctTb = addedTests.some((e) => (e.test || "").trim().toLowerCase() === "ict-tb");
//     const isIctMp = (item.test || "").trim().toLowerCase() === "ict-mp";

//     if (isIctMp && hasIctTb) {
//       setHiddenAddButtons((prev) => [...prev, item.id]);
//       setSearchQuery("");
//       setShowSearchPanel(false);
//       return;
//     }

//     if (!addedTests.some((e) => e.test === item.test && e.unit === item.unit)) {
//       setAddedTests((prev) => [
//         ...prev,
//         { id: item.id, test: item.test, unit: item.unit, result: "", normal: item.normal },
//       ]);
//     }
//     setHiddenAddButtons((prev) => [...prev, item.id]);
//     setSearchQuery("");
//     setShowSearchPanel(false);
//   };

//   useEffect(() => { setHiddenAddButtons([]); }, [searchQuery]);

//   const addRow = () =>
//     setRows([...rows, { col1: "", col2: "", col3: "", col4: "", subtitle: "", subheading: "", styles: {} }]);
//   const removeRow = () => { if (rows.length > 1) setRows(rows.slice(0, -1)); };
//   const addColumn = () => {
//     const n = columns.length + 1;
//     setColumns([...columns, `Column ${n}`]);
//     setRows(rows.map((row) => ({ ...row, [`col${n}`]: "" })));
//   };
//   const removeColumn = () => {
//     if (columns.length <= 1) return;
//     const last = `col${columns.length}`;
//     setColumns(columns.slice(0, -1));
//     setRows(rows.map((row) => { const r = { ...row }; delete r[last as keyof typeof r]; return r; }));
//   };
//   const clearAll = () => setRows([]);

//   const lockTemplate = () => {
//     const key = `template-${slug}`;
//     const data = {
//       columns, rows, isLocked: true,
//       fieldHeights: {
//         patientName: patientNameRef.current?.scrollHeight || 0,
//         labNo: labNoRef.current?.scrollHeight || 0,
//         age: ageRef.current?.scrollHeight || 0,
//         gender: genderRef.current?.scrollHeight || 0,
//         referredBy: referredByRef.current?.scrollHeight || 0,
//         address: addressRef.current?.scrollHeight || 0,
//         ward: wardRef.current?.scrollHeight || 0,
//       },
//     };
//     localStorage.setItem(key, JSON.stringify(data));
//     setIsLocked(true);
//     setLockedSlug(slug);
//     setShowSuccessOverlay(true);
//   };

//   const unlockTemplate = () => {
//     const key = `template-${slug}`;
//     setIsLocked(false);
//     setLockedSlug(null);
//     const saved = localStorage.getItem(key);
//     if (saved)
//       localStorage.setItem(key, JSON.stringify({ ...JSON.parse(saved), isLocked: false }));
//   };

//   const generatePdfBlob = async (): Promise<Blob> => {
//     if (!printRef.current) throw new Error("Printable area not found");
//     const el = printRef.current;
//     const prevStyles = {
//       maxWidth: el.style.maxWidth,
//       width: el.style.width,
//       padding: el.style.padding,
//       margin: el.style.margin,
//       position: el.style.position,
//     };
//     el.style.maxWidth = "none";
//     el.style.width = "750px";
//     el.style.padding = "24px 28px";
//     el.style.margin = "0";
//     el.style.position = "relative";
//     await new Promise((r) => setTimeout(r, 120));
//     const captureWidth = 750 + 56;
//     const captureHeight = el.scrollHeight;
//     const dataUrl = await toJpeg(el, {
//       cacheBust: true,
//       backgroundColor: "#ffffff",
//       quality: 1.0,
//       pixelRatio: 2,
//       width: captureWidth,
//       height: captureHeight,
//     });
//     el.style.maxWidth = prevStyles.maxWidth;
//     el.style.width = prevStyles.width;
//     el.style.padding = prevStyles.padding;
//     el.style.margin = prevStyles.margin;
//     el.style.position = prevStyles.position;
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.src = dataUrl;
//     await new Promise<void>((res, rej) => {
//       img.onload = () => res();
//       img.onerror = () => rej(new Error("Image load failed"));
//     });
//     const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4", compress: true });
//     const pageW = pdf.internal.pageSize.getWidth();
//     const pageH = pdf.internal.pageSize.getHeight();
//     const margin = 8;
//     const contentW = pageW - margin * 2;
//     const imgH = (img.height * contentW) / img.width;
//     let heightLeft = imgH;
//     let yPos = margin;
//     pdf.addImage(dataUrl, "JPEG", margin, yPos, contentW, imgH, undefined, "FAST");
//     heightLeft -= (pageH - margin);
//     while (heightLeft > 0) {
//       pdf.addPage();
//       yPos = margin - (imgH - heightLeft);
//       pdf.addImage(dataUrl, "JPEG", margin, yPos, contentW, imgH, undefined, "FAST");
//       heightLeft -= pageH;
//     }
//     return pdf.output("blob");
//   };

//   const uploadPdfToR2 = async (pdfBlob: Blob): Promise<string> => {
//     const formData = new FormData();
//     const fileName = `${slug}-${Date.now()}.pdf`;
//     formData.append("file", new File([pdfBlob], fileName, { type: "application/pdf" }));
//     const res = await fetch("/api/reports/upload-pdf", { method: "POST", body: formData });
//     const result = await res.json();
//     if (!res.ok || !result?.success || !result?.url) throw new Error(result?.message || "Upload failed");
//     return result.url as string;
//   };

//   const saveReport = async () => {
//     try {
//       setIsSaving(true);
//       setIsSaved(false);
//       if (!patient.patientName.trim()) { alert("Patient name is required"); return; }
//       const pdfBlob = await generatePdfBlob();
//       const uploadedPdfUrl = await uploadPdfToR2(pdfBlob);
//       const payload = {
//         reportId: `REP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
//         title, testName, patient, rows, columns,
//         pdfUrl: uploadedPdfUrl,
//         date: new Date().toISOString(),
//         createdAt: new Date().toISOString(),
//       };
//       const res = await fetch("/api/reports", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const result = await res.json();
//       if (!result.success) { alert("Failed to save report"); return; }
//       setIsSaved(true);
//       setPdfUrl(uploadedPdfUrl);
//       setShowSuccessOverlay(true);
//       setTimeout(() => setShowSuccessOverlay(false), 3000);
//     } catch (err) {
//       console.error("Save Report Error:", err);
//       alert("Server Error");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const qrValue = pdfUrl ? encodeURI(pdfUrl) : "";

//   const labelCls = "text-[13px] font-bold text-slate-700 shrink-0 whitespace-nowrap";
//   const valueCls = "outline-none text-[13px] text-slate-900 leading-tight min-h-[15px] bg-transparent ml-1";

//   // CHANGED: CP sizes thode chote
//   const tableFontSize = isSmallSizeReport ? "text-[11px]" : "text-[13px]";
//   const normalResultSize = isSmallSizeReport ? "text-[12px]" : "text-[15px]";
//   const abnormalResultSize = isSmallSizeReport ? "text-[13px]" : "text-[17px]";

//   // CHANGED: Added tests aur chote
//   const addedTableFontSize = "text-[12px]";
//   const addedNormalResultSize = "text-[14px]";
//   const addedAbnormalResultSize = "text-[16px]";

//   const colGroup = (
//     <colgroup>
//       <col style={{ width: "38%" }} />
//       <col style={{ width: "18%" }} />
//       <col style={{ width: "14%" }} />
//       <col style={{ width: "30%" }} />
//     </colgroup>
//   );

//   return (
//     <>
//       <style>{`
//         @media print {
//           * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
//           body * { visibility: hidden !important; }
//           .print-area, .print-area * { visibility: visible !important; }
//           .print-area {
//             position: fixed !important;
//             top: 0; left: 0;
//             width: 100vw !important;
//             max-width: 100vw !important;
//             padding: 1.8in 0.55in 0.4in 0.55in !important;
//             margin: 0 !important;
//             box-shadow: none !important;
//             border: none !important;
//             border-radius: 0 !important;
//             background: #fff !important;
//             overflow: visible !important;
//           }
//           .no-print { display: none !important; }
//           textarea, [contenteditable] {
//             border: none !important;
//             outline: none !important;
//             background: transparent !important;
//             -webkit-appearance: none;
//           }
//           table { border-collapse: collapse !important; }
//           th { background-color: #1d4ed8 !important; color: #fff !important; }
//           th, td { border: 1px solid #c7d2fe !important; padding: 3px 6px !important; }
//           .even-row { background-color: #f8fafc !important; }
//           .result-cell {
//             font-weight: 900 !important;
//             color: #000000 !important;
//             -webkit-text-stroke: 0.4px #000 !important;
//           }
//           .result-abnormal {
//             font-weight: 900 !important;
//             color: #7f1d1d !important;
//             font-size: 14px !important;
//             -webkit-text-stroke: 0.6px #7f1d1d !important;
//           }
//           .range-cell { color: #374151 !important; font-weight: 500 !important; }
//           .cp-note-print {
//             font-size: 14px !important;
//             font-weight: 700 !important;
//             font-style: italic !important;
//             color: #1e3a8a !important;
//           }
//           .cp-bold-test { font-weight: 700 !important; color: #1e3a8a !important; }
//           .cp-normal-test { font-weight: 400 !important; color: #374151 !important; }
//         }

//         [contenteditable]:empty:before {
//           content: attr(data-placeholder);
//           color: #94a3b8;
//           font-style: italic;
//           pointer-events: none;
//         }
//       `}</style>

//       <div className="min-h-screen bg-slate-100 p-3 text-black">

//         {/* ── TOOLBAR ── */}
//         <div className="flex flex-wrap gap-1.5 mb-3 no-print items-center relative">
//           <div className="relative">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => { setSearchQuery(e.target.value); setShowSearchPanel(true); }}
//               onFocus={() => setShowSearchPanel(true)}
//               placeholder="Search & add tests…"
//               className="rounded border border-slate-300 px-2.5 py-1.5 text-xs text-slate-800 outline-none focus:border-blue-500 w-52"
//             />
//             {showSearchPanel && searchQuery.trim() && (
//               <div className="absolute top-full left-0 z-30 mt-1 w-72 rounded-lg border border-slate-200 bg-white shadow-xl text-xs text-slate-700 max-h-56 overflow-y-auto">
//                 {filteredSearchResults.length > 0 ? (
//                   filteredSearchResults.slice(0, 10).map((item) => (
//                     <div key={item.id}
//                       className="flex items-center justify-between gap-2 px-3 py-1.5 hover:bg-blue-50 border-b border-slate-100 last:border-b-0 cursor-pointer"
//                       onClick={() => handleAddSearchTest(item)}
//                     >
//                       <div>
//                         <div className="font-medium text-slate-800 text-[11px]">{item.test}</div>
//                         <div className="text-slate-400 text-[10px]">{item.unit} · {item.normal}</div>
//                       </div>
//                       {!hiddenAddButtons.includes(item.id) && (
//                         <span className="rounded bg-blue-600 px-2 py-0.5 text-white text-[10px] shrink-0">+ ADD</span>
//                       )}
//                     </div>
//                   ))
//                 ) : (
//                   <div className="px-3 py-2 text-slate-400">No results</div>
//                 )}
//               </div>
//             )}
//           </div>

//           {[
//             { label: "+ Row", fn: addRow, c: "bg-emerald-600 hover:bg-emerald-700" },
//             { label: "− Row", fn: removeRow, c: "bg-red-500 hover:bg-red-600" },
//             { label: "+ Col", fn: addColumn, c: "bg-purple-600 hover:bg-purple-700" },
//             { label: "− Col", fn: removeColumn, c: "bg-orange-500 hover:bg-orange-600" },
//             { label: "Clear", fn: clearAll, c: "bg-slate-500 hover:bg-slate-600" },
//           ].map(({ label, fn, c }) => (
//             <button key={label} onClick={fn} className={`${c} text-white px-2.5 py-1.5 text-[11px] rounded font-medium`}>
//               {label}
//             </button>
//           ))}

//           {addedTests.length > 0 && (
//             <button onClick={() => { setAddedTests([]); setSearchQuery(""); }}
//               className="bg-red-400 hover:bg-red-500 text-white px-2.5 py-1.5 text-[11px] rounded font-medium">
//               Clear Added ({addedTests.length})
//             </button>
//           )}

//           <div className="flex gap-1.5 ml-auto">
//             <button onClick={saveReport} disabled={isSaving}
//               className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white px-3.5 py-1.5 text-[11px] rounded font-semibold">
//               {isSaving ? "Saving…" : "Save Report"}
//             </button>
//             {isSaved && (
//               <button onClick={() => handlePrint()}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 text-[11px] rounded font-semibold">
//                 Print
//               </button>
//             )}
//             <button onClick={lockTemplate}
//               className="bg-slate-900 hover:bg-black text-white px-3.5 py-1.5 text-[11px] rounded font-semibold">
//               {isLocked ? "🔒 Locked" : "Lock"}
//             </button>
//             <button onClick={unlockTemplate}
//               className="bg-amber-500 hover:bg-amber-600 text-white px-3.5 py-1.5 text-[11px] rounded font-semibold">
//               Edit
//             </button>
//           </div>
//         </div>

//         {/* ── REPORT CARD ── */}
//         <div
//           ref={printRef}
//           className="print-area mx-auto bg-white"
//           style={{ maxWidth: "794px", fontFamily: "'Segoe UI', Arial, sans-serif" }}
//         >
//           {/* ── PATIENT INFO ── */}
//           <div className="px-5 pt-3 pb-0">
//             <div className="flex border-b border-slate-300 pb-2">

//               {/* Left column */}
//               <div className="flex-1 flex flex-col gap-[3px] pr-4">
//                 <div className="flex items-baseline gap-1">
//                   <span className={labelCls}>Patient:</span>
//                   <div ref={patientNameRef} contentEditable suppressContentEditableWarning dir="ltr"
//                     data-placeholder="Full name"
//                     onInput={(e) => updatePatient("patientName", e.currentTarget.innerText)}
//                     className={`${valueCls} flex-1 font-semibold`} />
//                 </div>
//                 <div className="flex items-baseline gap-1">
//                   <span className={labelCls}>Age / Sex:</span>
//                   <div ref={ageRef} contentEditable suppressContentEditableWarning dir="ltr"
//                     data-placeholder="Age"
//                     onInput={(e) => updatePatient("age", e.currentTarget.innerText)}
//                     className={`${valueCls} min-w-[28px]`} />
//                   <span className="text-[11px] text-slate-400">/</span>
//                   <div ref={genderRef} contentEditable suppressContentEditableWarning dir="ltr"
//                     data-placeholder="Sex"
//                     onInput={(e) => updatePatient("gender", e.currentTarget.innerText)}
//                     className={`${valueCls} min-w-[28px]`} />
//                 </div>
//                 <div className="flex items-baseline gap-1">
//                   <span className={labelCls}>Consultant:</span>
//                   <div ref={referredByRef} contentEditable suppressContentEditableWarning dir="ltr"
//                     onInput={(e) => updatePatient("referredBy", e.currentTarget.innerText)}
//                     className={valueCls} />
//                 </div>
//                 <div className="flex items-baseline gap-1">
//                   <span className={labelCls}>Indoor/Outdoor:</span>
//                   <div contentEditable suppressContentEditableWarning className={valueCls}>{patient.indoorOutdoor}</div>
//                 </div>
//                 <div className="flex items-baseline gap-1">
//                   <span className={labelCls}>Address:</span>
//                   <div ref={addressRef} contentEditable suppressContentEditableWarning dir="ltr"
//                     onInput={(e) => updatePatient("address", e.currentTarget.innerText)}
//                     className={`${valueCls} flex-1`}>{patient.address}</div>
//                 </div>
//               </div>

//               {/* Right column */}
//               <div className="flex flex-col gap-[3px]" style={{ minWidth: "195px" }}>
//                 <div className="flex items-baseline gap-2">
//                   <span className={labelCls}>Requested:</span>
//                   <div contentEditable suppressContentEditableWarning className={valueCls}>{patient.specimenDate}</div>
//                 </div>
//                 <div className="flex items-baseline gap-2">
//                   <span className={labelCls}>Reported:</span>
//                   <div contentEditable suppressContentEditableWarning className={valueCls}>{patient.specimenDate}</div>
//                 </div>
//                 <div className="flex items-baseline gap-1">
//                   <span className={labelCls}>Time:</span>
//                   <div contentEditable suppressContentEditableWarning className={valueCls}>{patient.time}</div>
//                   <div contentEditable suppressContentEditableWarning className={`${valueCls} w-7`}>{patient.ampm}</div>
//                 </div>
//                 <div className="flex items-baseline gap-1">
//                   <span className={labelCls}>Lab No:</span>
//                   <div ref={labNoRef} contentEditable suppressContentEditableWarning dir="ltr"
//                     onInput={(e) => updatePatient("labNo", e.currentTarget.innerText)}
//                     className={valueCls} />
//                 </div>
//                 <div className="flex items-baseline gap-1">
//                   <span className={labelCls}>Ward #:</span>
//                   <div ref={wardRef} contentEditable suppressContentEditableWarning dir="ltr"
//                     onInput={(e) => updatePatient("ward", e.currentTarget.innerText)}
//                     className={valueCls} />
//                 </div>
//               </div>

//               {/* QR Code */}
//               <div className="flex flex-col items-center justify-start">
//                 {pdfUrl ? (
//                   <QRCodeCanvas value={qrValue} size={60} level="H" />
//                 ) : (
//                   <div className="flex items-center justify-center text-[10px] text-slate-400" style={{ width: 60, height: 60 }}>
//                     QR
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* ── TITLE + TABLE ── */}
//           <div className="px-5 pb-3">

//             {isCPReport ? (
//               <div className="mt-2 mb-0">
//                 <div className="text-[24px] font-bold text-blue-700 uppercase tracking-widest leading-tight">
//                   HAEMATOLOGY
//                 </div>
//                 <input
//                   type="text"
//                   disabled={isLocked}
//                   value={testName}
//                   onChange={(e) => setTestName(e.target.value)}
//                   className="w-full text-[24px] font-semibold text-slate-900 outline-none border-b-2 border-blue-700 pb-0 mb-0 bg-transparent uppercase tracking-wider leading-tight"
//                 />
//               </div>
//             ) : (
//               <input
//                 type="text"
//                 disabled={isLocked}
//                 value={testName}
//                 onChange={(e) => setTestName(e.target.value)}
//                 className="w-full text-[20px] font-bold text-slate-900 outline-none border-b-2 border-blue-700 mt-2 pb-0 mb-0 bg-transparent uppercase tracking-widest leading-tight"
//               />
//             )}

//             {/* ── MAIN TABLE ── */}
//             <table className={`w-full border-collapse ${tableFontSize} mt-0`} style={{ tableLayout: "fixed" }}>
//               {colGroup}
//               <thead>
//                 <tr className="bg-blue-700 text-white">
//                   {columns.map((col, i) => (
//                     <th key={i} className="border border-blue-800 px-2 py-[4px] font-semibold">
//                       <input
//                         disabled={isLocked}
//                         value={col}
//                         onChange={(e) => { const u = [...columns]; u[i] = e.target.value; setColumns(u); }}
//                         className={`w-full text-center ${tableFontSize} font-bold outline-none bg-transparent text-white`}
//                       />
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {rows.map((row, ri) => {
//                   const abnormal = isResultAbnormal(row.col2, row.col4);
//                   // CHANGED: sirf bold test ka result bold hoga
//                   const isBoldInCP = isCPReport && isCPBoldTest(row.col1);

//                   return (
//                     <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-slate-50 even-row"}>

//                       {/* CHANGED: test name — bold tests dark blue bold, baaki medium slate-700 */}
//                       <td className="px-2 py-[3px] align-middle border-b border-slate-100">
//                         <textarea
//                           value={row.col1}
//                           onChange={(e) => {
//                             handleCellChange(ri, "col1", e.target.value);
//                             e.target.style.height = "auto";
//                             e.target.style.height = e.target.scrollHeight + "px";
//                           }}
//                           disabled={isLocked}
//                           rows={1}
//                           className={`w-full outline-none resize-none overflow-hidden bg-transparent ${tableFontSize} min-h-[18px] leading-snug
//                             ${isBoldInCP
//                               ? "cp-bold-test font-bold text-blue-900"
//                               : "cp-normal-test font-normal text-slate-700"
//                             }`}
//                         />
//                         {row.subtitle && <div className="text-[9px] text-slate-400">{row.subtitle}</div>}
//                       </td>

//                       {/* CHANGED: result bold sirf isBoldInCP pe, abnormal size bhi chota */}
//                       <td className="px-1 py-[3px] text-center align-middle border-b border-slate-100">
//                         <textarea
//                           value={row.col2}
//                           onChange={(e) => {
//                             handleCellChange(ri, "col2", e.target.value);
//                             e.target.style.height = "auto";
//                             e.target.style.height = e.target.scrollHeight + "px";
//                           }}
//                           disabled={isLocked}
//                           rows={1}
//                           className={`result-cell w-full text-center outline-none resize-none overflow-hidden bg-transparent min-h-[18px] leading-snug
//                             ${abnormal
//                               ? `result-abnormal font-bold text-red-700 tracking-wide ${abnormalResultSize}`
//                               : isBoldInCP
//                                 ? `font-semibold text-slate-900 ${normalResultSize}`
//                                 : `font-medium text-slate-800 ${normalResultSize}`
//                             }`}
//                         />
//                       </td>

//                       <td className="px-1 py-[3px] text-center align-middle border-b border-slate-100">
//                         <textarea
//                           value={row.col3}
//                           onChange={(e) => {
//                             handleCellChange(ri, "col3", e.target.value);
//                             e.target.style.height = "auto";
//                             e.target.style.height = e.target.scrollHeight + "px";
//                           }}
//                           disabled={isLocked}
//                           rows={1}
//                           className={`w-full text-center outline-none resize-none overflow-hidden bg-transparent ${tableFontSize} font-medium text-slate-600 min-h-[18px] leading-snug`}
//                         />
//                       </td>

//                       <td className="px-2 py-[3px] text-center align-middle border-b border-slate-100">
//                         <textarea
//                           value={row.col4}
//                           onChange={(e) => {
//                             handleCellChange(ri, "col4", e.target.value);
//                             e.target.style.height = "auto";
//                             e.target.style.height = e.target.scrollHeight + "px";
//                           }}
//                           disabled={isLocked}
//                           rows={1}
//                           className={`range-cell w-full text-center outline-none resize-none overflow-hidden bg-transparent ${tableFontSize} font-medium text-slate-700 min-h-[18px] leading-snug`}
//                         />
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>

//             {isCPReport && (
//               <div className="cp-note-print mt-2 mb-1 px-2 py-2 rounded-md border-l-4 border-blue-700 bg-blue-50">
//                 <p className="text-[14px] font-semibold italic text-blue-900 leading-snug">
//                   A complete blood count (CBC) is a blood test used to evaluate your overall health and detect a wide range of disorders, including anemia, infection and leukemia.
//                 </p>
//               </div>
//             )}

//             {/* ── ADDED TESTS — chote size ── */}
//             {addedTests.length > 0 && (
//               <table className={`w-full border-collapse ${addedTableFontSize} mt-2`} style={{ tableLayout: "fixed" }}>
//                 {colGroup}
//                 <thead>
//                   <tr className="bg-blue-700 text-white">
//                     {["TEST / PARAMETER", "RESULT", "UNIT", "REFERENCE RANGE"].map((h, i) => (
//                       <th key={i} className="border border-blue-800 px-2 py-[4px] font-semibold">
//                         <span className={`${addedTableFontSize} font-bold`}>{h}</span>
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {addedTests.map((item, index) => {
//                     const addedAbnormal = isResultAbnormal(item.result, item.normal);
//                     const baseIndex = rows.length + index;
//                     return (
//                       <tr key={item.id} className={baseIndex % 2 === 0 ? "bg-white" : "bg-slate-50 even-row"}>
//                         <td className="px-2 py-[3px] align-middle border-b border-slate-100">
//                           <textarea
//                             value={item.test}
//                             onChange={(e) => {
//                               const u = [...addedTests]; u[index].test = e.target.value; setAddedTests(u);
//                               e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px";
//                             }}
//                             rows={1}
//                             className={`w-full outline-none resize-none overflow-hidden bg-transparent font-medium ${addedTableFontSize} text-slate-700 min-h-[18px] leading-snug`}
//                           />
//                         </td>
//                         <td className="px-1 py-[3px] text-center align-middle border-b border-slate-100">
//                           <textarea
//                             value={item.result}
//                             onChange={(e) => {
//                               const u = [...addedTests]; u[index].result = e.target.value; setAddedTests(u);
//                               e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px";
//                             }}
//                             rows={1}
//                             placeholder="—"
//                             className={`result-cell w-full text-center outline-none resize-none overflow-hidden bg-transparent min-h-[18px] leading-snug
//                               ${addedAbnormal
//                                 ? `result-abnormal font-black text-red-700 ${addedAbnormalResultSize}`
//                                 : `font-bold text-slate-900 ${addedNormalResultSize}`
//                               }`}
//                           />
//                         </td>
//                         <td className="px-1 py-[3px] text-center align-middle border-b border-slate-100">
//                           <textarea
//                             value={item.unit}
//                             onChange={(e) => {
//                               const u = [...addedTests]; u[index].unit = e.target.value; setAddedTests(u);
//                             }}
//                             rows={1}
//                             className={`w-full text-center outline-none resize-none overflow-hidden bg-transparent ${addedTableFontSize} font-medium text-slate-600 min-h-[18px] leading-snug`}
//                           />
//                         </td>
//                         <td className="px-2 py-[3px] text-center align-middle border-b border-slate-100">
//                           <textarea
//                             value={item.normal}
//                             onChange={(e) => {
//                               const u = [...addedTests]; u[index].normal = e.target.value; setAddedTests(u);
//                             }}
//                             rows={1}
//                             className={`range-cell w-full text-center outline-none resize-none overflow-hidden bg-transparent ${addedTableFontSize} font-semibold text-slate-700 min-h-[18px] leading-snug`}
//                           />
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </div>

//         {/* ── SUCCESS OVERLAY ── */}
//         {showSuccessOverlay && (
//           <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 no-print">
//             <div className="bg-white rounded-xl p-6 shadow-2xl max-w-xs w-full mx-4 text-center">
//               <div className="text-green-500 text-4xl mb-2">✓</div>
//               <h2 className="text-base font-bold text-slate-800 mb-1">
//                 {isLocked ? "Template Locked!" : "Saved Successfully"}
//               </h2>
//               <p className="text-slate-500 text-xs mb-4">
//                 {isLocked
//                   ? "Template is now locked — everything will remain safe even when switching tests."
//                   : "Report saved and PDF uploaded."}
//               </p>
//               <button onClick={() => setShowSuccessOverlay(false)}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold">
//                 Continue
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }







"use client";

import { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useReactToPrint } from "react-to-print";
import { toJpeg } from "html-to-image";
import jsPDF from "jspdf";
import { reportData } from "@/data/reportData";

const getCurrentDate = () => {
  const date = new Date();
  return date
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .toUpperCase();
};
const getCurrentTime = () => {
  const date = new Date();
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
};
const getAMPM = () => (new Date().getHours() >= 12 ? "PM" : "AM");

const parseRange = (normal: string): { low: number | null; high: number | null } => {
  if (!normal) return { low: null, high: null };
  const dash = normal.match(/^([\d.]+)\s*[-–]\s*([\d.]+)/);
  if (dash) return { low: parseFloat(dash[1]), high: parseFloat(dash[2]) };
  const gt = normal.match(/^[>≥]\s*([\d.]+)/);
  if (gt) return { low: parseFloat(gt[1]), high: null };
  const lt = normal.match(/^[<≤]\s*([\d.]+)/);
  if (lt) return { low: null, high: parseFloat(lt[1]) };
  return { low: null, high: null };
};

const isResultAbnormal = (result: string, normal: string) => {
  const num = parseFloat(result);
  if (isNaN(num) || !result.trim()) return false;
  const { low, high } = parseRange(normal);
  if (low !== null && num < low) return true;
  if (high !== null && num > high) return true;
  return false;
};

// CP ke sirf yeh 6 tests bold honge
const CP_BOLD_TESTS = [
  "wbc", "white blood cell", "white blood count",
  "haemoglobin", "hemoglobin", "hgb", "hb",
  "haematocrit", "hematocrit", "hct", "packed cell volume", "pcv",
  "platelet count", "platelets", "plt",
  "neutrophil",
  "lymphocyte",
];
const isCPBoldTest = (name: string) =>
  CP_BOLD_TESTS.some((t) => name.toLowerCase().trim().includes(t));

export default function DynamicTemplate({
  title: initialTitle,
  slug,
}: {
  title: string;
  slug: string;
}) {
  const tests = reportData[slug] || [];
  const isCPReport = slug === "cp";
  const isUrineReport = slug === "urine";
  const isSmallSizeReport = isCPReport || isUrineReport;

  // NEW: extra searchable tests jo reportData mein nahi hain
  const extraSearchableTests = [
    { id: "extra-ict-mp", test: "ICT-MP", unit: "", normal: "Negative" },
    { id: "extra-crp-qualitative", test: "CRP Qualitative", unit: "", normal: "Negative" },
  ];

  const allTests = [
    ...Object.keys(reportData).flatMap((key) =>
      (reportData[key] || []).map((item: any, index: number) => ({
        id: `${key}-${index}`,
        test: item.test || "",
        unit: item.unit || "",
        normal: item.normal || "",
      }))
    ),
    ...extraSearchableTests, // NEW
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const [addedTests, setAddedTests] = useState<any[]>([]);
  const [hiddenAddButtons, setHiddenAddButtons] = useState<string[]>([]);
  const [title] = useState(initialTitle);
  const [isSaved, setIsSaved] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [patient, setPatient] = useState({
    patientName: "",
    labNo: "",
    age: "",
    gender: "",
    specimenDate: getCurrentDate(),
    time: getCurrentTime(),
    ampm: getAMPM(),
    referredBy: "",
    indoorOutdoor: "Nil",
    address: "Nil",
    ward: "",
  });

  const [testName, setTestName] = useState(
    isCPReport ? "Blood Complete Picture" :
    slug === "lft" ? "Liver Function Test" :
    initialTitle
  );

  const [rows, setRows] = useState(
    tests.map((item: any) => ({
      col1: item.test || "",
      col2: item.result || "",
      col3: item.unit || "",
      col4: item.normal || "",
      subtitle: item.subtitle || "",
      subheading: item.subheading || "",
      styles: item.styles || {},
    }))
  );

  const [columns, setColumns] = useState<string[]>([
    "TEST / PARAMETER",
    "RESULT",
    "UNIT",
    isCPReport ? "REF. VALUE" : "REFERENCE RANGE",
  ]);

  const [isLocked, setIsLocked] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [savedFieldHeights, setSavedFieldHeights] = useState<Record<string, number> | null>(null);
  const [lockedSlug, setLockedSlug] = useState<string | null>(null);

  const patientNameRef = useRef<HTMLDivElement>(null);
  const labNoRef = useRef<HTMLDivElement>(null);
  const ageRef = useRef<HTMLDivElement>(null);
  const genderRef = useRef<HTMLDivElement>(null);
  const referredByRef = useRef<HTMLDivElement>(null);
  const addressRef = useRef<HTMLDivElement>(null);
  const wardRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Printed Report",
  });

  useEffect(() => {
    const key = `template-${slug}`;
    const savedTemplate = localStorage.getItem(key);
    if (savedTemplate) {
      const parsed = JSON.parse(savedTemplate);
      if (parsed.isLocked) {
        setColumns(parsed.columns || columns);
        setRows(parsed.rows || rows);
        setIsLocked(true);
        setLockedSlug(slug);
        setSavedFieldHeights(parsed.fieldHeights || null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const syncRef = (ref: React.RefObject<HTMLDivElement>, value: string) => {
    if (ref.current && document.activeElement !== ref.current) {
      ref.current.innerText = value;
    }
  };
  useEffect(() => syncRef(patientNameRef, patient.patientName), [patient.patientName]);
  useEffect(() => syncRef(labNoRef, patient.labNo), [patient.labNo]);
  useEffect(() => {
    if (ageRef.current && document.activeElement !== ageRef.current && patient.age)
      ageRef.current.innerText = patient.age;
  }, [patient.age]);
  useEffect(() => {
    if (genderRef.current && document.activeElement !== genderRef.current && patient.gender)
      genderRef.current.innerText = patient.gender;
  }, [patient.gender]);
  useEffect(() => syncRef(referredByRef, patient.referredBy), [patient.referredBy]);
  useEffect(() => syncRef(addressRef, patient.address), [patient.address]);
  useEffect(() => syncRef(wardRef, patient.ward), [patient.ward]);

  useEffect(() => {
    if (!savedFieldHeights) return;
    const apply = (ref: React.RefObject<HTMLDivElement>, key: string) => {
      if (ref.current && savedFieldHeights[key])
        ref.current.style.height = `${savedFieldHeights[key]}px`;
    };
    apply(patientNameRef, "patientName");
    apply(labNoRef, "labNo");
    apply(ageRef, "age");
    apply(genderRef, "gender");
    apply(referredByRef, "referredBy");
    apply(addressRef, "address");
    apply(wardRef, "ward");
  }, [savedFieldHeights]);

  const updatePatient = (field: string, value: string) =>
    setPatient((prev) => ({ ...prev, [field]: value }));

  const handleCellChange = (rowIndex: number, colKey: string, value: string) => {
    const updated = [...rows];
    updated[rowIndex][colKey as keyof (typeof updated)[0]] = value;
    setRows(updated);
  };

  const filteredSearchResults = searchQuery.trim()
    ? allTests.filter((item) => item.test.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleAddSearchTest = (item: any) => {
    const hasIctTb = addedTests.some((e) => (e.test || "").trim().toLowerCase() === "ict-tb");
    const isIctMp = (item.test || "").trim().toLowerCase() === "ict-mp";

    if (isIctMp && hasIctTb) {
      setHiddenAddButtons((prev) => [...prev, item.id]);
      setSearchQuery("");
      setShowSearchPanel(false);
      return;
    }

    if (!addedTests.some((e) => e.test === item.test && e.unit === item.unit)) {
      setAddedTests((prev) => [
        ...prev,
        { id: item.id, test: item.test, unit: item.unit, result: "", normal: item.normal },
      ]);
    }
    setHiddenAddButtons((prev) => [...prev, item.id]);
    setSearchQuery("");
    setShowSearchPanel(false);
  };

  useEffect(() => { setHiddenAddButtons([]); }, [searchQuery]);

  const addRow = () =>
    setRows([...rows, { col1: "", col2: "", col3: "", col4: "", subtitle: "", subheading: "", styles: {} }]);
  const removeRow = () => { if (rows.length > 1) setRows(rows.slice(0, -1)); };
  const addColumn = () => {
    const n = columns.length + 1;
    setColumns([...columns, `Column ${n}`]);
    setRows(rows.map((row) => ({ ...row, [`col${n}`]: "" })));
  };
  const removeColumn = () => {
    if (columns.length <= 1) return;
    const last = `col${columns.length}`;
    setColumns(columns.slice(0, -1));
    setRows(rows.map((row) => { const r = { ...row }; delete r[last as keyof typeof r]; return r; }));
  };
  const clearAll = () => setRows([]);

  const lockTemplate = () => {
    const key = `template-${slug}`;
    const data = {
      columns, rows, isLocked: true,
      fieldHeights: {
        patientName: patientNameRef.current?.scrollHeight || 0,
        labNo: labNoRef.current?.scrollHeight || 0,
        age: ageRef.current?.scrollHeight || 0,
        gender: genderRef.current?.scrollHeight || 0,
        referredBy: referredByRef.current?.scrollHeight || 0,
        address: addressRef.current?.scrollHeight || 0,
        ward: wardRef.current?.scrollHeight || 0,
      },
    };
    localStorage.setItem(key, JSON.stringify(data));
    setIsLocked(true);
    setLockedSlug(slug);
    setShowSuccessOverlay(true);
  };

  const unlockTemplate = () => {
    const key = `template-${slug}`;
    setIsLocked(false);
    setLockedSlug(null);
    const saved = localStorage.getItem(key);
    if (saved)
      localStorage.setItem(key, JSON.stringify({ ...JSON.parse(saved), isLocked: false }));
  };

  const generatePdfBlob = async (): Promise<Blob> => {
    if (!printRef.current) throw new Error("Printable area not found");
    const el = printRef.current;
    const prevStyles = {
      maxWidth: el.style.maxWidth,
      width: el.style.width,
      padding: el.style.padding,
      margin: el.style.margin,
      position: el.style.position,
    };
    el.style.maxWidth = "none";
    el.style.width = "750px";
    el.style.padding = "24px 28px";
    el.style.margin = "0";
    el.style.position = "relative";
    await new Promise((r) => setTimeout(r, 120));
    const captureWidth = 750 + 56;
    const captureHeight = el.scrollHeight;
    const dataUrl = await toJpeg(el, {
      cacheBust: true,
      backgroundColor: "#ffffff",
      quality: 1.0,
      pixelRatio: 2,
      width: captureWidth,
      height: captureHeight,
    });
    el.style.maxWidth = prevStyles.maxWidth;
    el.style.width = prevStyles.width;
    el.style.padding = prevStyles.padding;
    el.style.margin = prevStyles.margin;
    el.style.position = prevStyles.position;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = dataUrl;
    await new Promise<void>((res, rej) => {
      img.onload = () => res();
      img.onerror = () => rej(new Error("Image load failed"));
    });
    const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4", compress: true });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const margin = 8;
    const contentW = pageW - margin * 2;
    const imgH = (img.height * contentW) / img.width;
    let heightLeft = imgH;
    let yPos = margin;
    pdf.addImage(dataUrl, "JPEG", margin, yPos, contentW, imgH, undefined, "FAST");
    heightLeft -= (pageH - margin);
    while (heightLeft > 0) {
      pdf.addPage();
      yPos = margin - (imgH - heightLeft);
      pdf.addImage(dataUrl, "JPEG", margin, yPos, contentW, imgH, undefined, "FAST");
      heightLeft -= pageH;
    }
    return pdf.output("blob");
  };

  const uploadPdfToR2 = async (pdfBlob: Blob): Promise<string> => {
    const formData = new FormData();
    const fileName = `${slug}-${Date.now()}.pdf`;
    formData.append("file", new File([pdfBlob], fileName, { type: "application/pdf" }));
    const res = await fetch("/api/reports/upload-pdf", { method: "POST", body: formData });
    const result = await res.json();
    if (!res.ok || !result?.success || !result?.url) throw new Error(result?.message || "Upload failed");
    return result.url as string;
  };

  const saveReport = async () => {
    try {
      setIsSaving(true);
      setIsSaved(false);
      if (!patient.patientName.trim()) { alert("Patient name is required"); return; }
      const pdfBlob = await generatePdfBlob();
      const uploadedPdfUrl = await uploadPdfToR2(pdfBlob);
      const payload = {
        reportId: `REP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title, testName, patient, rows, columns,
        pdfUrl: uploadedPdfUrl,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!result.success) { alert("Failed to save report"); return; }
      setIsSaved(true);
      setPdfUrl(uploadedPdfUrl);
      setShowSuccessOverlay(true);
      setTimeout(() => setShowSuccessOverlay(false), 3000);
    } catch (err) {
      console.error("Save Report Error:", err);
      alert("Server Error");
    } finally {
      setIsSaving(false);
    }
  };

  const qrValue = pdfUrl ? encodeURI(pdfUrl) : "";

  const labelCls = "text-[13px] font-bold text-slate-700 shrink-0 whitespace-nowrap";
  const valueCls = "outline-none text-[13px] text-slate-900 leading-tight min-h-[15px] bg-transparent ml-1";

  // CHANGED: CP sizes thode chote
  const tableFontSize = isSmallSizeReport ? "text-[11px]" : "text-[13px]";
  const normalResultSize = isSmallSizeReport ? "text-[12px]" : "text-[15px]";
  const abnormalResultSize = isSmallSizeReport ? "text-[13px]" : "text-[17px]";

  // CHANGED: Added tests aur chote
  const addedTableFontSize = "text-[12px]";
  const addedNormalResultSize = "text-[14px]";
  const addedAbnormalResultSize = "text-[16px]";

  const colGroup = (
    <colgroup>
      <col style={{ width: "38%" }} />
      <col style={{ width: "18%" }} />
      <col style={{ width: "14%" }} />
      <col style={{ width: "30%" }} />
    </colgroup>
  );

  return (
    <>
      <style>{`
        @media print {
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body * { visibility: hidden !important; }
          .print-area, .print-area * { visibility: visible !important; }
          .print-area {
            position: fixed !important;
            top: 0; left: 0;
            width: 100vw !important;
            max-width: 100vw !important;
            padding: 1.8in 0.55in 0.4in 0.55in !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            background: #fff !important;
            overflow: visible !important;
          }
          .no-print { display: none !important; }
          textarea, [contenteditable] {
            border: none !important;
            outline: none !important;
            background: transparent !important;
            -webkit-appearance: none;
          }
          table { border-collapse: collapse !important; }
          th { background-color: #1d4ed8 !important; color: #fff !important; }
          th, td { border: 1px solid #c7d2fe !important; padding: 3px 6px !important; }
          .even-row { background-color: #f8fafc !important; }
          .result-cell {
            font-weight: 900 !important;
            color: #000000 !important;
            -webkit-text-stroke: 0.4px #000 !important;
          }
          .result-abnormal {
            font-weight: 900 !important;
            color: #7f1d1d !important;
            font-size: 14px !important;
            -webkit-text-stroke: 0.6px #7f1d1d !important;
          }
          .range-cell { color: #374151 !important; font-weight: 500 !important; }
          .cp-note-print {
            font-size: 14px !important;
            font-weight: 700 !important;
            font-style: italic !important;
            color: #1e3a8a !important;
          }
          .cp-bold-test { font-weight: 700 !important; color: #1e3a8a !important; }
          .cp-normal-test { font-weight: 400 !important; color: #374151 !important; }
        }

        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #94a3b8;
          font-style: italic;
          pointer-events: none;
        }
      `}</style>

      <div className="min-h-screen bg-slate-100 p-3 text-black">

        {/* ── TOOLBAR ── */}
        <div className="flex flex-wrap gap-1.5 mb-3 no-print items-center relative">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowSearchPanel(true); }}
              onFocus={() => setShowSearchPanel(true)}
              placeholder="Search & add tests…"
              className="rounded border border-slate-300 px-2.5 py-1.5 text-xs text-slate-800 outline-none focus:border-blue-500 w-52"
            />
            {showSearchPanel && searchQuery.trim() && (
              <div className="absolute top-full left-0 z-30 mt-1 w-72 rounded-lg border border-slate-200 bg-white shadow-xl text-xs text-slate-700 max-h-56 overflow-y-auto">
                {filteredSearchResults.length > 0 ? (
                  filteredSearchResults.slice(0, 10).map((item) => (
                    <div key={item.id}
                      className="flex items-center justify-between gap-2 px-3 py-1.5 hover:bg-blue-50 border-b border-slate-100 last:border-b-0 cursor-pointer"
                      onClick={() => handleAddSearchTest(item)}
                    >
                      <div>
                        <div className="font-medium text-slate-800 text-[11px]">{item.test}</div>
                        <div className="text-slate-400 text-[10px]">{item.unit} · {item.normal}</div>
                      </div>
                      {!hiddenAddButtons.includes(item.id) && (
                        <span className="rounded bg-blue-600 px-2 py-0.5 text-white text-[10px] shrink-0">+ ADD</span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-2 text-slate-400">No results</div>
                )}
              </div>
            )}
          </div>

          {[
            { label: "+ Row", fn: addRow, c: "bg-emerald-600 hover:bg-emerald-700" },
            { label: "− Row", fn: removeRow, c: "bg-red-500 hover:bg-red-600" },
            { label: "+ Col", fn: addColumn, c: "bg-purple-600 hover:bg-purple-700" },
            { label: "− Col", fn: removeColumn, c: "bg-orange-500 hover:bg-orange-600" },
            { label: "Clear", fn: clearAll, c: "bg-slate-500 hover:bg-slate-600" },
          ].map(({ label, fn, c }) => (
            <button key={label} onClick={fn} className={`${c} text-white px-2.5 py-1.5 text-[11px] rounded font-medium`}>
              {label}
            </button>
          ))}

          {addedTests.length > 0 && (
            <button onClick={() => { setAddedTests([]); setSearchQuery(""); }}
              className="bg-red-400 hover:bg-red-500 text-white px-2.5 py-1.5 text-[11px] rounded font-medium">
              Clear Added ({addedTests.length})
            </button>
          )}

          <div className="flex gap-1.5 ml-auto">
            <button onClick={saveReport} disabled={isSaving}
              className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white px-3.5 py-1.5 text-[11px] rounded font-semibold">
              {isSaving ? "Saving…" : "Save Report"}
            </button>
            {isSaved && (
              <button onClick={() => handlePrint()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 text-[11px] rounded font-semibold">
                Print
              </button>
            )}
            <button onClick={lockTemplate}
              className="bg-slate-900 hover:bg-black text-white px-3.5 py-1.5 text-[11px] rounded font-semibold">
              {isLocked ? "🔒 Locked" : "Lock"}
            </button>
            <button onClick={unlockTemplate}
              className="bg-amber-500 hover:bg-amber-600 text-white px-3.5 py-1.5 text-[11px] rounded font-semibold">
              Edit
            </button>
          </div>
        </div>

        {/* ── REPORT CARD ── */}
        <div
          ref={printRef}
          className="print-area mx-auto bg-white"
          style={{ maxWidth: "794px", fontFamily: "'Segoe UI', Arial, sans-serif" }}
        >
          {/* ── PATIENT INFO ── */}
          <div className="px-5 pt-3 pb-0">
            <div className="flex border-b border-slate-300 pb-2">

              {/* Left column */}
              <div className="flex-1 flex flex-col gap-[3px] pr-4">
                <div className="flex items-baseline gap-1">
                  <span className={labelCls}>Patient:</span>
                  <div ref={patientNameRef} contentEditable suppressContentEditableWarning dir="ltr"
                    data-placeholder="Full name"
                    onInput={(e) => updatePatient("patientName", e.currentTarget.innerText)}
                    className={`${valueCls} flex-1 font-semibold`} />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className={labelCls}>Age / Sex:</span>
                  <div ref={ageRef} contentEditable suppressContentEditableWarning dir="ltr"
                    data-placeholder="Age"
                    onInput={(e) => updatePatient("age", e.currentTarget.innerText)}
                    className={`${valueCls} min-w-[28px]`} />
                  <span className="text-[11px] text-slate-400">/</span>
                  <div ref={genderRef} contentEditable suppressContentEditableWarning dir="ltr"
                    data-placeholder="Sex"
                    onInput={(e) => updatePatient("gender", e.currentTarget.innerText)}
                    className={`${valueCls} min-w-[28px]`} />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className={labelCls}>Consultant:</span>
                  <div ref={referredByRef} contentEditable suppressContentEditableWarning dir="ltr"
                    onInput={(e) => updatePatient("referredBy", e.currentTarget.innerText)}
                    className={valueCls} />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className={labelCls}>Indoor/Outdoor:</span>
                  <div contentEditable suppressContentEditableWarning className={valueCls}>{patient.indoorOutdoor}</div>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className={labelCls}>Address:</span>
                  <div ref={addressRef} contentEditable suppressContentEditableWarning dir="ltr"
                    onInput={(e) => updatePatient("address", e.currentTarget.innerText)}
                    className={`${valueCls} flex-1`}>{patient.address}</div>
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-[3px]" style={{ minWidth: "195px" }}>
                <div className="flex items-baseline gap-2">
                  <span className={labelCls}>Requested:</span>
                  <div contentEditable suppressContentEditableWarning className={valueCls}>{patient.specimenDate}</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={labelCls}>Reported:</span>
                  <div contentEditable suppressContentEditableWarning className={valueCls}>{patient.specimenDate}</div>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className={labelCls}>Time:</span>
                  <div contentEditable suppressContentEditableWarning className={valueCls}>{patient.time}</div>
                  <div contentEditable suppressContentEditableWarning className={`${valueCls} w-7`}>{patient.ampm}</div>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className={labelCls}>Lab No:</span>
                  <div ref={labNoRef} contentEditable suppressContentEditableWarning dir="ltr"
                    onInput={(e) => updatePatient("labNo", e.currentTarget.innerText)}
                    className={valueCls} />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className={labelCls}>Ward #:</span>
                  <div ref={wardRef} contentEditable suppressContentEditableWarning dir="ltr"
                    onInput={(e) => updatePatient("ward", e.currentTarget.innerText)}
                    className={valueCls} />
                </div>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center justify-start">
                {pdfUrl ? (
                  <QRCodeCanvas value={qrValue} size={60} level="H" />
                ) : (
                  <div className="flex items-center justify-center text-[10px] text-slate-400" style={{ width: 60, height: 60 }}>
                    QR
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── TITLE + TABLE ── */}
          <div className="px-5 pb-3">

            {isCPReport ? (
              <div className="mt-2 mb-0">
                <div className="text-[24px] font-bold text-blue-700 uppercase tracking-widest leading-tight">
                  HAEMATOLOGY
                </div>
                <input
                  type="text"
                  disabled={isLocked}
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  className="w-full text-[24px] font-semibold text-slate-900 outline-none border-b-2 border-blue-700 pb-0 mb-0 bg-transparent uppercase tracking-wider leading-tight"
                />
              </div>
            ) : (
              <input
                type="text"
                disabled={isLocked}
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                className="w-full text-[20px] font-bold text-slate-900 outline-none border-b-2 border-blue-700 mt-2 pb-0 mb-0 bg-transparent uppercase tracking-widest leading-tight"
              />
            )}

            {/* ── MAIN TABLE ── */}
            <table className={`w-full border-collapse ${tableFontSize} mt-0`} style={{ tableLayout: "fixed" }}>
              {colGroup}
              <thead>
                <tr className="bg-blue-700 text-white">
                  {columns.map((col, i) => (
                    <th key={i} className="border border-blue-800 px-2 py-[4px] font-semibold">
                      <input
                        disabled={isLocked}
                        value={col}
                        onChange={(e) => { const u = [...columns]; u[i] = e.target.value; setColumns(u); }}
                        className={`w-full text-center ${tableFontSize} font-bold outline-none bg-transparent text-white`}
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => {
                  const abnormal = isResultAbnormal(row.col2, row.col4);
                  // CHANGED: sirf bold test ka result bold hoga
                  const isBoldInCP = isCPReport && isCPBoldTest(row.col1);

                  return (
                    <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-slate-50 even-row"}>

                      {/* CHANGED: test name — bold tests dark blue bold, baaki medium slate-700 */}
                      <td className="px-2 py-[3px] align-middle border-b border-slate-100">
                        <textarea
                          value={row.col1}
                          onChange={(e) => {
                            handleCellChange(ri, "col1", e.target.value);
                            e.target.style.height = "auto";
                            e.target.style.height = e.target.scrollHeight + "px";
                          }}
                          disabled={isLocked}
                          rows={1}
                          className={`w-full outline-none resize-none overflow-hidden bg-transparent ${tableFontSize} min-h-[18px] leading-snug
                            ${isBoldInCP
                              ? "cp-bold-test font-bold text-blue-900"
                              : "cp-normal-test font-normal text-slate-700"
                            }`}
                        />
                        {row.subtitle && <div className="text-[9px] text-slate-400">{row.subtitle}</div>}
                      </td>

                      {/* CHANGED: result bold sirf isBoldInCP pe, abnormal size bhi chota */}
                      <td className="px-1 py-[3px] text-center align-middle border-b border-slate-100">
                        <textarea
                          value={row.col2}
                          onChange={(e) => {
                            handleCellChange(ri, "col2", e.target.value);
                            e.target.style.height = "auto";
                            e.target.style.height = e.target.scrollHeight + "px";
                          }}
                          disabled={isLocked}
                          rows={1}
                          className={`result-cell w-full text-center outline-none resize-none overflow-hidden bg-transparent min-h-[18px] leading-snug
                            ${abnormal
                              ? `result-abnormal font-bold text-red-700 tracking-wide ${abnormalResultSize}`
                              : isBoldInCP
                                ? `font-semibold text-slate-900 ${normalResultSize}`
                                : `font-medium text-slate-800 ${normalResultSize}`
                            }`}
                        />
                      </td>

                      <td className="px-1 py-[3px] text-center align-middle border-b border-slate-100">
                        <textarea
                          value={row.col3}
                          onChange={(e) => {
                            handleCellChange(ri, "col3", e.target.value);
                            e.target.style.height = "auto";
                            e.target.style.height = e.target.scrollHeight + "px";
                          }}
                          disabled={isLocked}
                          rows={1}
                          className={`w-full text-center outline-none resize-none overflow-hidden bg-transparent ${tableFontSize} font-medium text-slate-600 min-h-[18px] leading-snug`}
                        />
                      </td>

                      <td className="px-2 py-[3px] text-center align-middle border-b border-slate-100">
                        <textarea
                          value={row.col4}
                          onChange={(e) => {
                            handleCellChange(ri, "col4", e.target.value);
                            e.target.style.height = "auto";
                            e.target.style.height = e.target.scrollHeight + "px";
                          }}
                          disabled={isLocked}
                          rows={1}
                          className={`range-cell w-full text-center outline-none resize-none overflow-hidden bg-transparent ${tableFontSize} font-medium text-slate-700 min-h-[18px] leading-snug`}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {isCPReport && (
              <div className="cp-note-print mt-2 mb-1 px-2 py-2 rounded-md border-l-4 border-blue-700 bg-blue-50">
                <p className="text-[14px] font-semibold italic text-blue-900 leading-snug">
                  A complete blood count (CBC) is a blood test used to evaluate your overall health and detect a wide range of disorders, including anemia, infection and leukemia.
                </p>
              </div>
            )}

            {/* ── ADDED TESTS — chote size ── */}
            {addedTests.length > 0 && (
              <table className={`w-full border-collapse ${addedTableFontSize} mt-2`} style={{ tableLayout: "fixed" }}>
                {colGroup}
                <thead>
                  <tr className="bg-blue-700 text-white">
                    {["TEST / PARAMETER", "RESULT", "UNIT", "REFERENCE RANGE"].map((h, i) => (
                      <th key={i} className="border border-blue-800 px-2 py-[4px] font-semibold">
                        <span className={`${addedTableFontSize} font-bold`}>{h}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {addedTests.map((item, index) => {
                    const addedAbnormal = isResultAbnormal(item.result, item.normal);
                    const baseIndex = rows.length + index;
                    return (
                      <tr key={item.id} className={baseIndex % 2 === 0 ? "bg-white" : "bg-slate-50 even-row"}>
                        <td className="px-2 py-[3px] align-middle border-b border-slate-100">
                          <textarea
                            value={item.test}
                            onChange={(e) => {
                              const u = [...addedTests]; u[index].test = e.target.value; setAddedTests(u);
                              e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px";
                            }}
                            rows={1}
                            className={`w-full outline-none resize-none overflow-hidden bg-transparent font-medium ${addedTableFontSize} text-slate-700 min-h-[18px] leading-snug`}
                          />
                        </td>
                        <td className="px-1 py-[3px] text-center align-middle border-b border-slate-100">
                          <textarea
                            value={item.result}
                            onChange={(e) => {
                              const u = [...addedTests]; u[index].result = e.target.value; setAddedTests(u);
                              e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px";
                            }}
                            rows={1}
                            placeholder="—"
                            className={`result-cell w-full text-center outline-none resize-none overflow-hidden bg-transparent min-h-[18px] leading-snug
                              ${addedAbnormal
                                ? `result-abnormal font-black text-red-700 ${addedAbnormalResultSize}`
                                : `font-bold text-slate-900 ${addedNormalResultSize}`
                              }`}
                          />
                        </td>
                        <td className="px-1 py-[3px] text-center align-middle border-b border-slate-100">
                          <textarea
                            value={item.unit}
                            onChange={(e) => {
                              const u = [...addedTests]; u[index].unit = e.target.value; setAddedTests(u);
                            }}
                            rows={1}
                            className={`w-full text-center outline-none resize-none overflow-hidden bg-transparent ${addedTableFontSize} font-medium text-slate-600 min-h-[18px] leading-snug`}
                          />
                        </td>
                        <td className="px-2 py-[3px] text-center align-middle border-b border-slate-100">
                          <textarea
                            value={item.normal}
                            onChange={(e) => {
                              const u = [...addedTests]; u[index].normal = e.target.value; setAddedTests(u);
                            }}
                            rows={1}
                            className={`range-cell w-full text-center outline-none resize-none overflow-hidden bg-transparent ${addedTableFontSize} font-semibold text-slate-700 min-h-[18px] leading-snug`}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* ── SUCCESS OVERLAY ── */}
        {showSuccessOverlay && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 no-print">
            <div className="bg-white rounded-xl p-6 shadow-2xl max-w-xs w-full mx-4 text-center">
              <div className="text-green-500 text-4xl mb-2">✓</div>
              <h2 className="text-base font-bold text-slate-800 mb-1">
                {isLocked ? "Template Locked!" : "Saved Successfully"}
              </h2>
              <p className="text-slate-500 text-xs mb-4">
                {isLocked
                  ? "Template is now locked — everything will remain safe even when switching tests."
                  : "Report saved and PDF uploaded."}
              </p>
              <button onClick={() => setShowSuccessOverlay(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold">
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}