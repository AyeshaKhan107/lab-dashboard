// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import {
//   LayoutDashboard,
//   Users,
//   FileText,
//   FlaskConical,
//   QrCode,
//   User,
//   Settings,
//   LogOut,
// } from "lucide-react";

// export default function Sidebar() {
//   const pathname = usePathname();

//   const menu = [
//     { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
//     { name: "Patients", href: "/dashboard/patients", icon: Users },
//     { name: "Tests", href: "/dashboard/tests", icon: FlaskConical },
//     { name: "Reports", href: "/dashboard/reports", icon: FileText },
//     { name: "Record", href: "/dashboard/record", icon: FileText },
//     { name: "QR Scanner", href: "/dashboard/qr", icon: QrCode },
//     { name: "Users", href: "/dashboard/users", icon: Users },
//     { name: "Profile", href: "/dashboard/profile", icon: User },
//     { name: "Settings", href: "/dashboard/settings", icon: Settings },
//   ];

//   return (
//     <aside className="fixed top-0 left-0 h-screen min-h-screen w-64 bg-gradient-to-b from-blue-900 via-slate-900 to-slate-800 shadow-2xl flex flex-col p-0 border-r border-slate-800 z-40 print:hidden">
//       {/* Branding */}
//       <div className="flex items-center gap-3 px-6 py-8 bg-gradient-to-r from-blue-700 to-blue-900 rounded-br-3xl">
//         <div className="bg-white rounded-full p-2 shadow-lg">
//           <LayoutDashboard className="text-blue-700" size={28} />
//         </div>
//         <div>
//           <h1 className="text-2xl font-extrabold tracking-tight text-white drop-shadow">City Lab</h1>
//           <p className="text-xs text-blue-200 font-medium">Dashboard Panel</p>
//         </div>
//       </div>

//       {/* Menu */}
//       <nav className="flex-1 mt-6 px-2 space-y-1">
//         {menu.map((item) => {
//           const isActive = pathname === item.href;
//           const Icon = item.icon;
//           return (
//             <Link
//               key={item.name}
//               href={item.href}
//               className={`flex items-center gap-3 px-4 py-3 my-1 rounded-xl font-medium text-base transition-all duration-200
//                 ${
//                   isActive
//                     ? "bg-blue-600 text-white shadow-lg scale-105"
//                     : "text-blue-100 hover:bg-blue-800 hover:text-white hover:scale-105"
//                 }`}
//             >
//               <Icon size={22} />
//               <span>{item.name}</span>
//             </Link>
//           );
//         })}
//       </nav>
//  <button
//           onClick={() => {
//             localStorage.removeItem("auth");
//             router.push("/login");
//           }}
//           className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
//         >
//           Logout
//         </button>
   
//     </aside>
//   );
// }





"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  FileText,
  FlaskConical,
  QrCode,
  User,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menu = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Patients", href: "/dashboard/patients", icon: Users },
    { name: "Tests", href: "/dashboard/tests", icon: FlaskConical },
    { name: "Reports", href: "/dashboard/reports", icon: FileText },
    { name: "Record", href: "/dashboard/record", icon: FileText },
    { name: "QR Scanner", href: "/dashboard/qr", icon: QrCode },
    { name: "Users", href: "/dashboard/users", icon: Users },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  // Updated Logout
  const handleLogout = () => {
    // Remove Cookie
    document.cookie =
      "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    // Clear Storage
    localStorage.clear();
    sessionStorage.clear();

    // Redirect
    router.replace("/login");
  };

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-[#0B1120] border-r border-white/10 shadow-2xl flex flex-col z-50 overflow-hidden print:hidden">
      
      {/* Glow */}
      <div className="absolute top-0 left-0 w-full h-40 bg-blue-600/20 blur-3xl pointer-events-none" />

      {/* Logo */}
      <div className="relative px-5 pt-5 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">

          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <LayoutDashboard size={22} className="text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white leading-none">
              City Lab
            </h1>

            <p className="text-xs text-slate-400 mt-1">
              Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">

        {menu.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300

              ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">

                <div
                  className={`p-1.5 rounded-lg transition-all duration-300

                  ${
                    isActive
                      ? "bg-white/20"
                      : "bg-white/5 group-hover:bg-white/10"
                  }`}
                >
                  <Icon size={17} />
                </div>

                <span className="text-sm font-medium">
                  {item.name}
                </span>
              </div>

              <ChevronRight
                size={15}
                className={`transition-all duration-300

                ${
                  isActive
                    ? "translate-x-0 opacity-100"
                    : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              />
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-white/10 bg-white/[0.02]">

        {/* User */}
        <div className="flex items-center gap-2.5 mb-3 px-1">

          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
            A
          </div>

          <div>
            <h3 className="text-sm text-white font-semibold leading-none">
              Dr.Ayaz Khan
            </h3>

            <p className="text-[11px] text-slate-400 mt-1">
              Lab Manager
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="group w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
          bg-gradient-to-r from-red-500 to-red-600
          hover:from-red-600 hover:to-red-700
          text-white text-sm font-semibold
          shadow-lg shadow-red-500/20
          transition-all duration-300 hover:scale-[1.02] active:scale-95"
        >
          <LogOut
            size={18}
            className="transition-transform duration-300 group-hover:rotate-12"
          />

          Logout
        </button>
      </div>
    </aside>
  );
}