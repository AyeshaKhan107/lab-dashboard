
// "use client";

// import { useState } from "react";
// import { User, Camera } from "lucide-react";

// export default function ProfilePage() {
//   const [avatar, setAvatar] = useState<string | null>(null);
//   const [dropdown, setDropdown] = useState(false);

//   const handleAvatar = (e: any) => {
//     const file = e.target.files[0];
//     if (file) {
//       setAvatar(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">

//       {/* NAVBAR */}
//       <div className="bg-white px-6 py-4 shadow flex justify-end relative">
//         <div className="relative">
//           <button
//             onClick={() => setDropdown(!dropdown)}
//             className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden"
//           >
//             {avatar ? (
//               <img src={avatar} className="w-full h-full object-cover" />
//             ) : (
//               <User size={18} />
//             )}
//           </button>

//           {/* DROPDOWN */}
//           {dropdown && (
//             <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2">
//               <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
//                 View Profile
//               </button>
//               <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
//                 Settings
//               </button>
//               <button className="block w-full text-left px-3 py-2 hover:bg-red-100 text-red-600 rounded">
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* MAIN */}
//       <div className="max-w-4xl mx-auto p-6 space-y-6">

//         {/* PROFILE HEADER */}
//         <div className="bg-white rounded-xl shadow p-6 flex items-center gap-6">

//           {/* AVATAR */}
//           <div className="relative group">
//             <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
//               {avatar ? (
//                 <img src={avatar} className="w-full h-full object-cover" />
//               ) : (
//                 <User size={32} />
//               )}
//             </div>

//             {/* HOVER UPLOAD ICON */}
//             <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full cursor-pointer transition">
//               <Camera className="text-white" />
//               <input type="file" className="hidden" onChange={handleAvatar} />
//             </label>
//           </div>

//           {/* USER INFO */}
//           <div>
//             <h2 className="text-xl font-bold">Admin User</h2>
//             <p className="text-gray-500">admin@email.com</p>
//           </div>
//         </div>

//         {/* PROFILE FORM */}
//         <div className="bg-white rounded-xl shadow p-6 space-y-4">
//           <h3 className="font-semibold text-lg">Profile Info</h3>

//           <div className="grid md:grid-cols-2 gap-4">
//             <input className="p-3 border rounded-lg" placeholder="Full Name" />
//             <input className="p-3 border rounded-lg" placeholder="Email" />
//             <input className="p-3 border rounded-lg" placeholder="Phone Number" />
//           </div>

//           <div className="flex gap-3 justify-end">
//             <button className="px-4 py-2 border rounded-lg">
//               Cancel
//             </button>
//             <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
//               Save Changes
//             </button>
//           </div>
//         </div>

//         {/* ACCOUNT INFO */}
//         <div className="bg-white rounded-xl shadow p-6 space-y-3">
//           <h3 className="font-semibold text-lg">Account Info</h3>

//           <div className="flex justify-between">
//             <span className="text-gray-500">Role</span>
//             <span className="font-medium">Admin</span>
//           </div>

//           <div className="flex justify-between">
//             <span className="text-gray-500">Status</span>
//             <span className="text-green-600 font-medium">Active</span>
//           </div>

//           <div className="flex justify-between">
//             <span className="text-gray-500">Join Date</span>
//             <span className="font-medium">12 Jan 2024</span>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }






"use client";

import { useState } from "react";
import { User, Camera, Settings } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [dropdown, setDropdown] = useState(false);

  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@email.com");
  const [phone, setPhone] = useState("");

  const [success, setSuccess] = useState(false);

  const handleAvatar = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  const handleSave = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <div className="bg-white px-6 py-4 shadow flex justify-end">
        <div className="relative">

          {/* AVATAR BUTTON */}
          <button
            onClick={() => setDropdown(!dropdown)}
            className="relative w-10 h-10 rounded-full bg-gray-200 overflow-hidden"
          >
            {avatar ? (
              <img src={avatar} className="w-full h-full object-cover" />
            ) : (
              <User className="m-auto mt-2" />
            )}

            {/* SMALL EDIT ICON */}
            <label className="absolute bottom-0 right-0 bg-blue-600 p-1 rounded-full cursor-pointer">
              <Camera size={12} className="text-white" />
              <input type="file" className="hidden" onChange={handleAvatar} />
            </label>
          </button>

          {/* DROPDOWN */}
          {dropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2">
              
              <Link
                href="/settings"
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded"
              >
                <Settings size={16} />
                Settings
              </Link>

              <button className="block w-full text-left px-3 py-2 hover:bg-red-100 text-red-600 rounded">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-4xl mx-auto p-6 space-y-6">

        {/* PROFILE HEADER */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-6">

          {/* BIG AVATAR */}
          <div className="relative group">
            <div className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
              {avatar ? (
                <img src={avatar} className="w-full h-full object-cover" />
              ) : (
                <User size={40} />
              )}
            </div>

            <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full cursor-pointer transition">
              <Camera className="text-white" />
              <input type="file" className="hidden" onChange={handleAvatar} />
            </label>
          </div>

          {/* TEXT */}
          <div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-gray-500">{email}</p>

            <span className="inline-block mt-2 px-3 py-1 text-sm bg-green-100 text-green-600 rounded-full">
              Active
            </span>
          </div>
        </div>

        {/* EDIT PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-5">

          <h3 className="text-lg font-semibold">Edit Profile</h3>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Full Name"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Phone"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3">

            <button
              onClick={() => {
                setName("");
                setEmail("");
                setPhone("");
              }}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>

          {/* SUCCESS MESSAGE */}
          {success && (
            <p className="text-green-600 text-sm">
              ✔ Profile updated successfully
            </p>
          )}
        </div>

        {/* ACCOUNT INFO (CLEAN + BETTER DESIGN) */}
        <div className="bg-white rounded-2xl shadow p-6">

          <h3 className="text-lg font-semibold mb-4">Account Info</h3>

          <div className="grid md:grid-cols-3 gap-4 text-center">

            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-gray-500 text-sm">Role</p>
              <p className="font-semibold">Admin</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-gray-500 text-sm">Status</p>
              <p className="text-green-600 font-semibold">Active</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-gray-500 text-sm">Joined</p>
              <p className="font-semibold">May 2025</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}