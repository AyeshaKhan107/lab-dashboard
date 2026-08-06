// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { 
//   LayoutDashboard,
//   Users,
//   FileText,
//   Settings,
//   CreditCard,
//   Activity,
//   ShieldCheck,
//   Bell
// } from "lucide-react";

// export default function Dashboard() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const auth = localStorage.getItem("auth");

//     if (!auth) {
//       router.replace("/login");
//     } else {
//       setLoading(false);
//     }
//   }, [router]);

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="text-gray-600 text-lg font-medium animate-pulse">
//           Loading dashboard...
//         </div>
//       </div>
//     );
//   }

//   const cards = [
//     {
//       title: "Total Users",
//       value: "1",
//       icon: Users,
//       color: "from-blue-500 to-blue-600"
//     },
//     {
//       title: "Reports",
//       value: "1",
//       icon: FileText,
//       color: "from-purple-500 to-purple-600"
//     },
//     {
//       title: "Records",
//       value: "1",
//       icon: CreditCard,
//       color: "from-green-500 to-green-600"
//     },
//     {
//       title: "System Status",
//       value: "Active",
//       icon: ShieldCheck,
//       color: "from-pink-500 to-rose-500"
//     }
//   ];

//   const quickActions = [
//     { name: "Tests", icon: Users, href: "/dashboard/tests" },
//     { name: "View Reports", icon: FileText, href: "/dashboard/reports" },
//     { name: "Notifications", icon: Bell, href: "/dashboard/notifications" },
//     { name: "Settings", icon: Settings, href: "/dashboard/settings" }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">
//             Admin Dashboard
//           </h1>
//           <p className="text-gray-500">Welcome back, manage everything here</p>
//         </div>

//         <button
//           onClick={() => {
//             localStorage.removeItem("auth");
//             router.push("/login");
//           }}
//           className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//         {cards.map((card, index) => {
//           const Icon = card.icon;
//           return (
//             <div
//               key={index}
//               className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition"
//             >
//               <div
//                 className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r ${card.color} text-white mb-4`}
//               >
//                 <Icon size={20} />
//               </div>
//               <h2 className="text-gray-500 text-sm">{card.title}</h2>
//               <p className="text-2xl font-bold text-gray-800">
//                 {card.value}
//               </p>
//             </div>
//           );
//         })}
//       </div>

//       {/* Quick Actions */}
//       <div className="mb-10">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">
//           Quick Actions
//         </h2>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {quickActions.map((item, index) => {
//             const Icon = item.icon;
//             const isLink = !!item.href;
//             return isLink ? (
//               <a
//                 key={index}
//                 href={item.href}
//                 className="bg-white p-5 rounded-2xl shadow hover:shadow-lg cursor-pointer transition flex flex-col items-center gap-2"
//               >
//                 <Icon className="text-blue-500" />
//                 <span className="text-sm text-gray-600">{item.name}</span>
//               </a>
//             ) : (
//               <div
//                 key={index}
//                 className="bg-white p-5 rounded-2xl shadow hover:shadow-lg cursor-pointer transition flex flex-col items-center gap-2"
//               >
//                 <Icon className="text-blue-500" />
//                 <span className="text-sm text-gray-600">{item.name}</span>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Activity Section */}
//       <div className="bg-white rounded-2xl shadow p-6">
//         <h2 className="text-xl font-semibold mb-4 text-gray-700">
//           Recent Activity
//         </h2>

//         <div className="space-y-4">
//           {[1, 2, 3].map((item) => (
//             <div
//               key={item}
//               className="flex items-center justify-between border-b pb-3"
//             >
//               <div>
//                 <p className="font-medium text-gray-700">
//                   New user registered
//                 </p>
//                 <p className="text-sm text-gray-400">
//                   2 minutes ago
//                 </p>
//               </div>
//               <Activity className="text-green-500" />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }






"use client";

import { useRouter } from "next/navigation";
import {
  Users,
  FileText,
  Settings,
  CreditCard,
  Activity,
  ShieldCheck,
  Bell,
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();

  const cards = [
    {
      title: "Total Users",
      value: "1",
      icon: Users,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Reports",
      value: "1",
      icon: FileText,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Records",
      value: "1",
      icon: CreditCard,
      color: "from-green-500 to-green-600",
    },
    {
      title: "System Status",
      value: "Active",
      icon: ShieldCheck,
      color: "from-pink-500 to-rose-500",
    },
  ];

  const quickActions = [
    { name: "Tests", icon: Users, href: "/dashboard/tests" },
    { name: "View Reports", icon: FileText, href: "/dashboard/reports" },
    { name: "Notifications", icon: Bell, href: "/dashboard/notifications" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <p className="text-gray-500">
            Welcome back, manage everything here
          </p>
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            document.cookie =
              "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

            router.replace("/login");
          }}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-red-300 transition-all duration-200"
        >
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition"
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r ${card.color} text-white mb-4`}
              >
                <Icon size={20} />
              </div>

              <h2 className="text-gray-500 text-sm">
                {card.title}
              </h2>

              <p className="text-2xl font-bold text-gray-800">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-10">

        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {quickActions.map((item, index) => {
            const Icon = item.icon;

            return (
              <a
                key={index}
                href={item.href}
                className="bg-white p-5 rounded-2xl shadow hover:shadow-lg cursor-pointer transition flex flex-col items-center gap-2"
              >
                <Icon className="text-blue-500" />

                <span className="text-sm text-gray-600">
                  {item.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Activity Section */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Recent Activity
        </h2>

        <div className="space-y-4">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between border-b pb-3"
            >
              <div>
                <p className="font-medium text-gray-700">
                  New user registered
                </p>

                <p className="text-sm text-gray-400">
                  2 minutes ago
                </p>
              </div>

              <Activity className="text-green-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}