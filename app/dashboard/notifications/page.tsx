"use client";

import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Bell className="text-blue-500" /> Notifications
        </h1>
        <div className="mt-6 space-y-4">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <p className="text-blue-700">No new notifications.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
