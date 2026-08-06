"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);

    if (email === "admin@citylab.com" && password === "01234567") {

      // Set Auth Cookie
      document.cookie =
        "auth=true; path=/; max-age=86400; SameSite=Lax";

      // Small Delay
      setTimeout(() => {
        router.replace("/dashboard");
      }, 300);

    } else {
      setIsError(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4">

      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 border border-gray-100">

        {/* Logo */}
        <div className="text-center mb-8">

          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
            C
          </div>

          <h1 className="text-3xl font-bold mt-4 text-gray-800">
            City Lab
          </h1>

          <p className="text-gray-500 text-sm mt-2">
            Admin Dashboard Login
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsError(false);
            }}
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none rounded-xl px-4 py-3 transition"
          />
        </div>

        {/* Password */}
        <div className="mb-5">

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsError(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none rounded-xl px-4 py-3 transition"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 active:scale-[0.98] transition-all duration-200 text-white font-semibold py-3 rounded-xl shadow-lg"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Error */}
        {isError && (
          <p className="text-red-500 text-sm text-center mt-4 font-medium">
            Incorrect Email or Password
          </p>
        )}
      </div>
    </div>
  );
}