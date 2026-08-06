"use client";

import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function Scanner() {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 250,
      },
      false
    );

    scanner.render(
      (decodedText) => {
        console.log("QR SCANNED:", decodedText);

        // redirect to report page
        window.location.href = decodedText;
      },
      (error) => {
        // ignore scan errors
        console.log("Scan error:", error);
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-lg font-bold mb-3">QR Scanner</h2>

      {/* CAMERA VIEW */}
      <div id="qr-reader" className="w-full max-w-md"></div>

      <p className="text-sm text-gray-500 mt-2">
        Scan QR code to open report instantly
      </p>
    </div>
  );
}