"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md bg-white shadow-2xl rounded-3xl p-8 border border-blue-100"
      >
        {/* Big 404 */}
        <h1 className="text-7xl font-extrabold text-blue-600 tracking-tight">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Page Not Found
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-gray-500 text-sm leading-relaxed">
          The page you are looking for doesn’t exist or has been moved.
          Please check the URL or return to dashboard.
        </p>

        {/* Illustration (simple animated pulse dot style) */}
        <div className="flex justify-center my-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full bg-blue-200 animate-ping"></div>
            <div className="relative w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
              !
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-medium transition"
          >
            Go to Dashboard
          </Link>

          <button
            onClick={() => window.history.back()}
            className="border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 rounded-xl font-medium transition"
          >
            Go Back
          </button>
        </div>

        {/* Footer hint */}
        <p className="mt-6 text-xs text-gray-400">
          CityLab Diagnostics System
        </p>
      </motion.div>
    </div>
  );
}