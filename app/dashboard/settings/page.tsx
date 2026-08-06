// "use client";
// import Link from "next/link";

// import { useState } from "react";
// import { Eye, EyeOff, User, Sun, Moon, ChevronDown } from "lucide-react";

// export default function SettingsPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const [themeDropdown, setThemeDropdown] = useState(false);
//   const [emailNotif, setEmailNotif] = useState(true);
//   const [systemNotif, setSystemNotif] = useState(true);
//   const [color, setColor] = useState("#2563eb");
//   const [logo, setLogo] = useState<string | null>(null);
//   const [selectedSection, setSelectedSection] = useState("Settings");

//   const togglePassword = () => setShowPassword(!showPassword);

//   const handleLogo = (e: any) => {
//     const file = e.target.files[0];
//     if (file) {
//       setLogo(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <div className={darkMode ? "min-h-screen bg-slate-900 text-slate-100" : "min-h-screen bg-gray-100"}>

//       {/* NAVBAR */}
//       <div className={darkMode ? "bg-slate-800 shadow px-6 py-4 flex justify-between items-center" : "bg-white shadow px-6 py-4 flex justify-between items-center"}>
//         <h1 className="text-xl font-bold flex items-center gap-2">
//           <User className="inline-block" size={22} /> Settings
//         </h1>

//         <div className="flex items-center gap-4">
//           {/* Theme Dropdown */}
//           <div className="relative">
//             <button
//               onClick={() => setThemeDropdown((v) => !v)}
//               className={darkMode ? "flex items-center gap-2 px-4 py-2 rounded-full bg-slate-700 text-slate-100 border border-slate-600" : "flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 border border-gray-200"}
//             >
//               {darkMode ? <Moon size={18} /> : <Sun size={18} />}
//               <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
//               <ChevronDown size={16} />
//             </button>
//             {themeDropdown && (
//               <div className={darkMode ? "absolute right-0 mt-2 w-40 bg-slate-800 border border-slate-700 rounded shadow-lg z-10" : "absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10"}>
//                 <button
//                   className="w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-100 dark:hover:bg-slate-700"
//                   onClick={() => { setDarkMode(false); setThemeDropdown(false); }}
//                 >
//                   <Sun size={16} /> Light Mode
//                 </button>
//                 <button
//                   className="w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-100 dark:hover:bg-slate-700"
//                   onClick={() => { setDarkMode(true); setThemeDropdown(false); }}
//                 >
//                   <Moon size={16} /> Dark Mode
//                 </button>
//               </div>
//             )}
//           </div>
//           <button className={darkMode ? "flex items-center gap-2 bg-slate-700 px-4 py-2 rounded-full text-slate-100" : "flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full"}>
//             <User size={18} />
//             Admin
//           </button>
//         </div>
//       </div>

//       <div className="flex">

//         {/* SIDEBAR */}
//         <div className={darkMode ? "w-64 bg-slate-800 min-h-screen p-8 border-r border-slate-700 hidden md:block" : "w-64 bg-white min-h-screen p-8 border-r border-gray-200 hidden md:block"}>
//           <ul className="space-y-3 text-base">
//             {[
//               { label: "Admin", section: "Admin" },
//               { label: "Appearance", section: "Appearance" },
//               { label: "Settings", section: "Settings" },
//               { label: "Notifications", section: "Notifications" },
//             ].map((item) => (
//               <li
//                 key={item.section}
//                 className={
//                   selectedSection === item.section
//                     ? "font-bold bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg px-4 py-2 shadow-lg scale-105"
//                     : darkMode
//                     ? "text-slate-200 hover:bg-slate-700 hover:text-white rounded-lg px-4 py-2 cursor-pointer"
//                     : "text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg px-4 py-2 cursor-pointer"
//                 }
//                 onClick={() => setSelectedSection(item.section)}
//               >
//                 {item.label}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* MAIN CONTENT */}
//         <div className="flex-1 p-6 space-y-8 max-w-4xl mx-auto">

//           {/* PASSWORD */}
//           <div className="bg-white p-6 rounded-xl shadow space-y-4">
//             <h2 className="font-semibold text-lg">Password Settings</h2>

//             {["Current Password", "New Password", "Confirm Password"].map((p, i) => (
//               <div key={i} className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder={p}
//                   className="w-full p-3 border rounded-lg"
//                 />
//                 <button
//                   onClick={togglePassword}
//                   className="absolute right-3 top-3 text-gray-500"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             ))}

//             <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
//               Update Password
//             </button>
//           </div>

//           {/* APPEARANCE */}
//           <div className="bg-white p-6 rounded-xl shadow space-y-4">
//             <h2 className="font-semibold text-lg">Appearance</h2>

//             <div className="flex justify-between items-center">
//               <span>Dark Mode</span>
//               <input
//                 type="checkbox"
//                 checked={darkMode}
//                 onChange={() => setDarkMode(!darkMode)}
//               />
//             </div>

//             <div>
//               <label className="text-sm text-gray-500">Theme Color</label>
//               <input
//                 type="color"
//                 value={color}
//                 onChange={(e) => setColor(e.target.value)}
//                 className="ml-3"
//               />
//             </div>
//           </div>

//           {/* SYSTEM */}
//           <div className="bg-white p-6 rounded-xl shadow space-y-4">
//             <h2 className="font-semibold text-lg">System Settings</h2>

//             <input type="file" onChange={handleLogo} />

//             {logo && (
//               <img src={logo} className="w-24 h-24 object-cover rounded mt-2" />
//             )}

//             <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
//               Save Logo
//             </button>
//           </div>

//           {/* NOTIFICATIONS */}
//           <div className="bg-white p-6 rounded-xl shadow space-y-4">
//             <h2 className="font-semibold text-lg">Notifications</h2>

//             <div className="flex justify-between">
//               <span>Email Notifications</span>
//               <input
//                 type="checkbox"
//                 checked={emailNotif}
//                 onChange={() => setEmailNotif(!emailNotif)}
//               />
//             </div>

//             <div className="flex justify-between">
//               <span>System Alerts</span>
//               <input
//                 type="checkbox"
//                 checked={systemNotif}
//                 onChange={() => setSystemNotif(!systemNotif)}
//               />
//             </div>
//           </div>

//           {/* BUTTONS */}
//           <div className="flex justify-end gap-4">
//             <button className="px-5 py-2 border rounded-lg">
//               Reset
//             </button>

//             <button
//               className="px-5 py-2 text-white rounded-lg"
//               style={{ backgroundColor: color }}
//             >
//               Save Changes
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  User,
  Sun,
  Moon,
  ChevronDown,
} from "lucide-react";

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [themeDropdown, setThemeDropdown] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [systemNotif, setSystemNotif] = useState(true);
  const [color, setColor] = useState("#2563eb");
  const [logo, setLogo] = useState<string | null>(null);

  const [selectedSection, setSelectedSection] =
    useState("Admin");

  // PASSWORD STATES
  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const togglePassword = () =>
    setShowPassword(!showPassword);

  // LOGO
  const handleLogo = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setLogo(imageUrl);

      localStorage.setItem("logo", imageUrl);
    }
  };

  // LOAD SETTINGS
  useEffect(() => {
    const savedDark =
      localStorage.getItem("darkMode");

    const savedColor =
      localStorage.getItem("themeColor");

    const savedEmail =
      localStorage.getItem("emailNotif");

    const savedSystem =
      localStorage.getItem("systemNotif");

    const savedLogo =
      localStorage.getItem("logo");

    if (savedDark)
      setDarkMode(JSON.parse(savedDark));

    if (savedColor)
      setColor(savedColor);

    if (savedEmail)
      setEmailNotif(JSON.parse(savedEmail));

    if (savedSystem)
      setSystemNotif(JSON.parse(savedSystem));

    if (savedLogo)
      setLogo(savedLogo);
  }, []);

  // SAVE SETTINGS
  const handleSaveChanges = () => {
    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );

    localStorage.setItem(
      "themeColor",
      color
    );

    localStorage.setItem(
      "emailNotif",
      JSON.stringify(emailNotif)
    );

    localStorage.setItem(
      "systemNotif",
      JSON.stringify(systemNotif)
    );

    alert("Settings Saved Successfully!");
  };

  // UPDATE PASSWORD
  const handleUpdatePassword = async () => {
    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch("/api/admin/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    updatePassword: true,
    currentPassword,
    newPassword,
  }),
});
   

    const data = await res.json();

    if (data.success) {
      alert(
        "Password Updated Successfully!"
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div
      className={
        darkMode
          ? "min-h-screen bg-slate-900 text-white"
          : "min-h-screen bg-gray-100"
      }
    >
      {/* NAVBAR */}
      <div
        className={
          darkMode
            ? "bg-slate-800 shadow px-6 py-4 flex justify-between items-center"
            : "bg-white shadow px-6 py-4 flex justify-between items-center"
        }
      >
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <User size={24} />
          Settings
        </h1>

        <div className="flex items-center gap-4">
          {/* THEME */}
          <div className="relative">
            <button
              onClick={() =>
                setThemeDropdown(!themeDropdown)
              }
              className={
                darkMode
                  ? "flex items-center gap-2 px-4 py-2 rounded-full bg-slate-700 border border-slate-600"
                  : "flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border"
              }
            >
              {darkMode ? (
                <Moon size={18} />
              ) : (
                <Sun size={18} />
              )}

              <span>
                {darkMode
                  ? "Dark Mode"
                  : "Light Mode"}
              </span>

              <ChevronDown size={16} />
            </button>

            {themeDropdown && (
              <div
                className={
                  darkMode
                    ? "absolute right-0 mt-2 w-40 bg-slate-800 border border-slate-700 rounded-xl shadow-lg z-10"
                    : "absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg z-10"
                }
              >
                <button
                  onClick={() => {
                    setDarkMode(false);
                    setThemeDropdown(false);
                  }}
                  className="w-full px-4 py-3 flex items-center gap-2 hover:bg-blue-100 text-left"
                >
                  <Sun size={16} />
                  Light
                </button>

                <button
                  onClick={() => {
                    setDarkMode(true);
                    setThemeDropdown(false);
                  }}
                  className="w-full px-4 py-3 flex items-center gap-2 hover:bg-blue-100 text-left"
                >
                  <Moon size={16} />
                  Dark
                </button>
              </div>
            )}
          </div>

          {/* ADMIN */}
          <button
            className={
              darkMode
                ? "bg-slate-700 px-4 py-2 rounded-full flex items-center gap-2"
                : "bg-gray-100 px-4 py-2 rounded-full flex items-center gap-2"
            }
          >
            <User size={18} />
            Admin
          </button>
        </div>
      </div>

      <div className="flex">
        {/* SIDEBAR */}
        <div
          className={
            darkMode
              ? "w-64 min-h-screen bg-slate-800 border-r border-slate-700 p-6 hidden md:block"
              : "w-64 min-h-screen bg-white border-r p-6 hidden md:block"
          }
        >
          <ul className="space-y-3">
            {[
              "Admin",
              "Appearance",
              "Settings",
              "Notifications",
            ].map((item) => (
              <li
                key={item}
                onClick={() =>
                  setSelectedSection(item)
                }
                className={
                  selectedSection === item
                    ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-3 rounded-xl font-semibold cursor-pointer shadow-lg"
                    : darkMode
                    ? "px-4 py-3 rounded-xl cursor-pointer hover:bg-slate-700"
                    : "px-4 py-3 rounded-xl cursor-pointer hover:bg-blue-50"
                }
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-6 max-w-4xl mx-auto space-y-8">
          {/* ADMIN */}
          {selectedSection === "Admin" && (
            <div
              className={
                darkMode
                  ? "bg-slate-800 p-6 rounded-2xl shadow-xl space-y-5"
                  : "bg-white p-6 rounded-2xl shadow-xl space-y-5"
              }
            >
              <h2 className="text-xl font-bold">
                Password Settings
              </h2>

              {/* CURRENT */}
              <div className="relative">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(
                      e.target.value
                    )
                  }
                  className="w-full p-3 border rounded-xl text-black"
                />

                <button
                  onClick={togglePassword}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {/* NEW */}
              <div className="relative">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                  className="w-full p-3 border rounded-xl text-black"
                />

                <button
                  onClick={togglePassword}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {/* CONFIRM */}
              <div className="relative">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  className="w-full p-3 border rounded-xl text-black"
                />

                <button
                  onClick={togglePassword}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <button
                onClick={
                  handleUpdatePassword
                }
                className="bg-blue-600 text-white px-5 py-3 rounded-xl"
              >
                Update Password
              </button>
            </div>
          )}

          {/* APPEARANCE */}
          {selectedSection ===
            "Appearance" && (
            <div
              className={
                darkMode
                  ? "bg-slate-800 p-6 rounded-2xl shadow-xl space-y-5"
                  : "bg-white p-6 rounded-2xl shadow-xl space-y-5"
              }
            >
              <h2 className="text-xl font-bold">
                Appearance
              </h2>

              <div className="flex justify-between items-center">
                <span>Dark Mode</span>

                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() =>
                    setDarkMode(!darkMode)
                  }
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">
                  Theme Color
                </label>

                <input
                  type="color"
                  value={color}
                  onChange={(e) =>
                    setColor(
                      e.target.value
                    )
                  }
                  className="ml-3"
                />
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {selectedSection ===
            "Settings" && (
            <div
              className={
                darkMode
                  ? "bg-slate-800 p-6 rounded-2xl shadow-xl space-y-5"
                  : "bg-white p-6 rounded-2xl shadow-xl space-y-5"
              }
            >
              <h2 className="text-xl font-bold">
                System Settings
              </h2>

              <input
                type="file"
                onChange={handleLogo}
              />

              {logo && (
                <img
                  src={logo}
                  className="w-24 h-24 object-cover rounded-xl"
                />
              )}

              <button className="bg-green-600 text-white px-5 py-3 rounded-xl">
                Save Logo
              </button>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {selectedSection ===
            "Notifications" && (
            <div
              className={
                darkMode
                  ? "bg-slate-800 p-6 rounded-2xl shadow-xl space-y-5"
                  : "bg-white p-6 rounded-2xl shadow-xl space-y-5"
              }
            >
              <h2 className="text-xl font-bold">
                Notifications
              </h2>

              <div className="flex justify-between">
                <span>
                  Email Notifications
                </span>

                <input
                  type="checkbox"
                  checked={emailNotif}
                  onChange={() =>
                    setEmailNotif(
                      !emailNotif
                    )
                  }
                />
              </div>

              <div className="flex justify-between">
                <span>System Alerts</span>

                <input
                  type="checkbox"
                  checked={systemNotif}
                  onChange={() =>
                    setSystemNotif(
                      !systemNotif
                    )
                  }
                />
              </div>
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="px-5 py-3 border rounded-xl"
            >
              Reset
            </button>

            <button
              onClick={
                handleSaveChanges
              }
              className="px-5 py-3 text-white rounded-xl"
              style={{
                backgroundColor: color,
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}