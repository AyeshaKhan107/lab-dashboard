

// 'use client';

// import { useEffect, useState } from 'react';
// import { QRCodeCanvas } from 'qrcode.react';

// export default function ReportsPage() {
//   const [records, setRecords] = useState<any[]>([]);
//   const [trash, setTrash] = useState<any[]>([]);

//   const [patientName, setPatientName] = useState('');
//   const [reportType, setReportType] = useState('');
//   const [imagePreview, setImagePreview] = useState<string | null>(null);

//   const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
//   const [activeTab, setActiveTab] = useState<'records' | 'trash'>('records');

//   // LOAD DATA
//   useEffect(() => {
//     setRecords(JSON.parse(localStorage.getItem('records') || '[]'));
//     setTrash(JSON.parse(localStorage.getItem('trash') || '[]'));
//   }, []);

//   // SAVE RECORD
//   const handleSave = () => {
//     if (!patientName || !reportType || !imagePreview) return;

//     const id = Date.now();

//     const newRecord = {
//       id,
//       patientName,
//       reportType,
//       file: imagePreview,
//       date: new Date().toLocaleDateString(),

//       // QR only for reference (NO routing dependency)
//       url: `RECORD-${id}`
//     };

//     const updated = [...records, newRecord];

//     setRecords(updated);
//     localStorage.setItem('records', JSON.stringify(updated));

//     setPatientName('');
//     setReportType('');
//     setImagePreview(null);
//   };

//   // MOVE TO TRASH
//   const moveToTrash = (id: number) => {
//     const item = records.find(r => r.id === id);
//     if (!item) return;

//     const updatedRecords = records.filter(r => r.id !== id);
//     const updatedTrash = [...trash, item];

//     setRecords(updatedRecords);
//     setTrash(updatedTrash);

//     localStorage.setItem('records', JSON.stringify(updatedRecords));
//     localStorage.setItem('trash', JSON.stringify(updatedTrash));
//   };

//   // RESTORE
//   const restore = (id: number) => {
//     const item = trash.find(t => t.id === id);
//     if (!item) return;

//     const updatedTrash = trash.filter(t => t.id !== id);
//     const updatedRecords = [...records, item];

//     setTrash(updatedTrash);
//     setRecords(updatedRecords);

//     localStorage.setItem('trash', JSON.stringify(updatedTrash));
//     localStorage.setItem('records', JSON.stringify(updatedRecords));
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">

//       <h1 className="text-2xl font-bold mb-6">Reports System</h1>

//       {/* FORM */}
//       <div className="grid md:grid-cols-2 gap-6 mb-8">

//         <div className="space-y-3">

//           <input
//             placeholder="Patient Name"
//             value={patientName}
//             onChange={(e) => setPatientName(e.target.value)}
//             className="w-full p-2 border rounded"
//           />

//           <select
//             value={reportType}
//             onChange={(e) => setReportType(e.target.value)}
//             className="w-full p-2 border rounded"
//           >
//             <option value="">Select Type</option>
//             <option>X-Ray</option>
//             <option>CT Scan</option>
//             <option>MRI</option>
//           </select>

//           <input
//             type="file"
//             onChange={(e) => {
//               const file = e.target.files?.[0];
//               if (!file) return;

//               const reader = new FileReader();
//               reader.onload = (ev) => {
//                 setImagePreview(ev.target?.result as string);
//               };
//               reader.readAsDataURL(file);
//             }}
//           />

//           <button
//             onClick={handleSave}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Save Record
//           </button>

//         </div>

//         {imagePreview && (
//           <img src={imagePreview} className="max-h-80 rounded" />
//         )}
//       </div>

//       {/* TABS */}
//       <div className="flex gap-3 mb-6">

//         <button
//           onClick={() => setActiveTab('records')}
//           className={`px-4 py-2 rounded ${activeTab === 'records' ? 'bg-blue-600 text-white' : 'bg-white'}`}
//         >
//           Records
//         </button>

//         <button
//           onClick={() => setActiveTab('trash')}
//           className={`px-4 py-2 rounded ${activeTab === 'trash' ? 'bg-red-600 text-white' : 'bg-white'}`}
//         >
//           Trash
//         </button>

//       </div>

//       {/* RECORDS */}
//       {activeTab === 'records' && (
//         <div className="space-y-3">

//           {records.map(r => (
//             <div key={r.id} className="bg-white p-4 flex justify-between rounded shadow">

//               <div>
//                 <p className="font-bold">{r.patientName}</p>
//                 <p>{r.reportType}</p>
//               </div>

//               <div className="flex gap-2">

//                 <button
//                   onClick={() => setSelectedRecord(r)}
//                   className="bg-blue-500 text-white px-3 rounded"
//                 >
//                   View
//                 </button>

//                 <button
//                   onClick={() => moveToTrash(r.id)}
//                   className="bg-red-500 text-white px-3 rounded"
//                 >
//                   Delete
//                 </button>

//               </div>
//             </div>
//           ))}

//         </div>
//       )}

//       {/* TRASH */}
//       {activeTab === 'trash' && (
//         <div className="space-y-3">

//           {trash.map(t => (
//             <div key={t.id} className="bg-gray-200 p-4 flex justify-between rounded">

//               <p>{t.patientName}</p>

//               <button
//                 onClick={() => restore(t.id)}
//                 className="bg-green-600 text-white px-3 rounded"
//               >
//                 Restore
//               </button>

//             </div>
//           ))}

//         </div>
//       )}

//       {/* MODAL */}
//       {selectedRecord && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

//           <div className="bg-white p-6 rounded w-[400px] text-center">

//             <h2 className="text-xl font-bold">{selectedRecord.patientName}</h2>
//             <p>{selectedRecord.reportType}</p>

//             {selectedRecord.file && (
//               <img src={selectedRecord.file} className="w-full my-3 rounded" />
//             )}

//             {/* QR (STATIC SAFE) */}
//             <QRCodeCanvas value={selectedRecord.url} size={150} />

//             <p className="text-xs mt-2 text-gray-500">
//               {selectedRecord.url}
//             </p>

//             <button
//               onClick={() => setSelectedRecord(null)}
//               className="mt-4 bg-gray-800 text-white px-4 py-2 rounded w-full"
//             >
//               Close
//             </button>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }





'use client';

import { useEffect, useMemo, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import {
  Search,
  Trash2,
  RotateCcw,
  Eye,
  FileText,
  CalendarDays,
  Upload,
} from 'lucide-react';

export default function ReportsPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [trash, setTrash] = useState<any[]>([]);

  const [patientName, setPatientName] = useState('');
  const [reportType, setReportType] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'records' | 'trash'>('records');

  const [search, setSearch] = useState('');

  // LOAD
  useEffect(() => {
    setRecords(JSON.parse(localStorage.getItem('records') || '[]'));
    setTrash(JSON.parse(localStorage.getItem('trash') || '[]'));
  }, []);

  // SAVE
  const handleSave = () => {
    if (!patientName || !reportType || !imagePreview) return;

    const id = Date.now();

    const newRecord = {
      id,
      patientName,
      reportType,
      file: imagePreview,
      date: new Date().toLocaleString(),
      url: `RECORD-${id}`,
      status: 'Completed',
    };

    const updated = [newRecord, ...records];

    setRecords(updated);
    localStorage.setItem('records', JSON.stringify(updated));

    setPatientName('');
    setReportType('');
    setImagePreview(null);
  };

  // DELETE
  const moveToTrash = (id: number) => {
    const item = records.find((r) => r.id === id);
    if (!item) return;

    const updatedRecords = records.filter((r) => r.id !== id);
    const updatedTrash = [item, ...trash];

    setRecords(updatedRecords);
    setTrash(updatedTrash);

    localStorage.setItem('records', JSON.stringify(updatedRecords));
    localStorage.setItem('trash', JSON.stringify(updatedTrash));
  };

  // RESTORE
  const restore = (id: number) => {
    const item = trash.find((t) => t.id === id);
    if (!item) return;

    const updatedTrash = trash.filter((t) => t.id !== id);
    const updatedRecords = [item, ...records];

    setTrash(updatedTrash);
    setRecords(updatedRecords);

    localStorage.setItem('trash', JSON.stringify(updatedTrash));
    localStorage.setItem('records', JSON.stringify(updatedRecords));
  };

  // SEARCH
  const filteredRecords = useMemo(() => {
    return records.filter(
      (r) =>
        r.patientName.toLowerCase().includes(search.toLowerCase()) ||
        r.reportType.toLowerCase().includes(search.toLowerCase())
    );
  }, [records, search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 p-6">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Laboratory Reports
          </h1>

          <p className="text-slate-500 mt-1 text-sm">
            Manage patient records and printable reports professionally
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative w-full lg:w-96">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            placeholder="Search patient or report..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 shadow-sm outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 mb-8">

        <div className="flex items-center gap-2 mb-5">
          <FileText className="text-blue-600" size={20} />
          <h2 className="text-lg font-semibold text-slate-800">
            Create Report Record
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          <div className="space-y-4">

            <div>
              <label className="text-sm font-medium text-slate-600 block mb-2">
                Patient Name
              </label>

              <input
                placeholder="Enter patient name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600 block mb-2">
                Report Type
              </label>

              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="">Select Type</option>
               
                <option >ogtt</option>
                <option>esr</option>
                <option>ferritin</option>
                <option>24-hour-urine-for-protein</option>
                <option>lfts</option>
                <option>ict-tb</option>
                <option>thyroid-profile</option>
                <option>hbsag</option>
                <option>glu fbs</option>
                <option>hcv</option>
                <option>crp</option>
                 <option>electrolytes</option> <option>cp</option>
                  <option>bilirubin total direct</option>
                   <option>phosphorus</option>
                    <option>ict-mp</option>
                     <option>h-pylori</option>
                      <option>brucella</option>
                       <option>screenings</option>
                        <option>tfts diagreat</option>
                         <option>hbsag elisa</option>
                          <option>tpha</option>
                           <option>fertility-profile</option>
                            <option>creatinine</option>
                             <option>glucose random</option>
                              <option>vit d</option>
                               <option>alt</option>
                                <option>cross match</option>
                                 <option>calcium</option>
                                  <option>pt,aptt,inr</option>
                                   <option>beta hcg</option>
                                    <option>blood group</option>
                                     <option>lipids profile</option>
                                      <option>blood p.film</option>
                                       <option>amylase</option>
                                        <option>stool for h pylori ag</option>
                                         <option>cpk</option>
                                         <option>hba1c normal</option>
                                         <option>mycodot</option>
                                         <option>urea</option>
                                         <option>bilirubin</option>
                                         <option>hcv</option>
                                         <option>uric acid</option>
                                         <option>r.a.factor</option>
                                         <option>widal</option>
                                         <option>troponin</option>
                                         <option>
                                  dengue
                                         </option>
                                         <option>trop-t</option>
                                         <option>pregnancy test</option>
                                         <option>typhidot</option>
                                         <option>semen analysis</option>
<option>asot</option>
<option>ldh</option>
<option>d-dimer</option>
<option>torch screening</option>
<option>stool re</option>
<option>tlc</option>
<option>coagulation-profile</option>
<option>ct bt</option>
<option>rfts</option>
<option>urine re</option>
<option>serum-potassium</option>
<option>serum-chloride</option>
<option>cholesterol</option>

   
   
  
    
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600 block mb-2">
                Upload Report Image
              </label>

              <label className="flex items-center justify-center gap-2 w-full border-2 border-dashed border-slate-300 rounded-2xl py-8 bg-slate-50 cursor-pointer hover:bg-slate-100 transition">
                <Upload size={18} className="text-slate-500" />

                <span className="text-sm text-slate-500">
                  Choose File
                </span>

                <input
                  type="file"
                  className="hidden"
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
              </label>
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-2xl font-medium shadow-lg hover:scale-[1.01] transition"
            >
              Save Report Record
            </button>
          </div>

          {/* PREVIEW */}
          <div className="bg-slate-50 rounded-3xl border border-slate-200 flex items-center justify-center p-4 min-h-[320px]">

            {imagePreview ? (
              <img
                src={imagePreview}
                className="max-h-80 rounded-2xl object-cover shadow-md"
              />
            ) : (
              <div className="text-center text-slate-400">
                <FileText size={40} className="mx-auto mb-3" />
                <p>No preview selected</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-3 mb-6">

        <button
          onClick={() => setActiveTab('records')}
          className={`px-5 py-2.5 rounded-2xl font-medium transition
          ${
            activeTab === 'records'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-slate-600 border border-slate-200'
          }`}
        >
          Active Reports
        </button>

        <button
          onClick={() => setActiveTab('trash')}
          className={`px-5 py-2.5 rounded-2xl font-medium transition
          ${
            activeTab === 'trash'
              ? 'bg-red-600 text-white shadow-lg'
              : 'bg-white text-slate-600 border border-slate-200'
          }`}
        >
          Trash
        </button>
      </div>

      {/* RECORDS */}
      {activeTab === 'records' && (
        <div className="grid xl:grid-cols-2 gap-5">

          {filteredRecords.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <div className="p-5 flex gap-5">

                <img
                  src={r.file}
                  className="w-28 h-28 rounded-2xl object-cover border"
                />

                <div className="flex-1">

                  <div className="flex items-start justify-between gap-3">

                    <div>
                      <h2 className="text-lg font-bold text-slate-800">
                        {r.patientName}
                      </h2>

                      <p className="text-sm text-slate-500 mt-1">
                        {r.reportType}
                      </p>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                      {r.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">
                    <CalendarDays size={15} />
                    {r.date}
                  </div>

                  <div className="flex gap-2 mt-5">

                    <button
                      onClick={() => setSelectedRecord(r)}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm transition"
                    >
                      <Eye size={16} />
                      View
                    </button>

                    <button
                      onClick={() => moveToTrash(r.id)}
                      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm transition"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      )}

      {/* TRASH */}
      {activeTab === 'trash' && (
        <div className="grid xl:grid-cols-2 gap-5">

          {trash.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl border border-red-100 shadow-sm p-5 flex items-center justify-between"
            >
              <div>
                <h2 className="font-semibold text-slate-800">
                  {t.patientName}
                </h2>

                <p className="text-sm text-slate-500">
                  {t.reportType}
                </p>
              </div>

              <button
                onClick={() => restore(t.id)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm transition"
              >
                <RotateCcw size={15} />
                Restore
              </button>
            </div>
          ))}

        </div>
      )}

      {/* MODAL */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">

          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden">

            <div className="p-6">

              <div className="flex items-center justify-between mb-5">

                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    {selectedRecord.patientName}
                  </h2>

                  <p className="text-slate-500 text-sm mt-1">
                    {selectedRecord.reportType}
                  </p>
                </div>

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                  Report
                </span>
              </div>

              {selectedRecord.file && (
                <img
                  src={selectedRecord.file}
                  className="w-full rounded-2xl border mb-5"
                />
              )}

              <div className="flex flex-col items-center">

                <QRCodeCanvas
                  value={selectedRecord.url}
                  size={140}
                />

                <p className="text-xs text-slate-400 mt-3">
                  {selectedRecord.url}
                </p>
              </div>

              <button
                onClick={() => setSelectedRecord(null)}
                className="mt-6 w-full bg-slate-900 hover:bg-black text-white py-3 rounded-2xl transition"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}