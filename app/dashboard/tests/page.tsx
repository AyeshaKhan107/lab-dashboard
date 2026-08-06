


"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TestsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");


  const tests = [
    "ogtt",
    "esr",
    "ferritin",
    "24-hour-urine-for-protein",
    "lfts",
    "ict-tb",
    "glu fbs",
    "crp",
    "electrolytes",
    "cp",
    "bilirubin total direct",
    "phosphorus",
    "ict-mp",
    "h-pylori",
    "brucella",
    "screenings",
    "tfts",
    "hbsag elisa",
    "tpha",
    "fertility-profile",
    "creatinine",
    "glucose random",
    "vit d",
    "alt",
    "cross match",
    "calcium",
    "pt,aptt,inr",
    "beta hcg",
    "blood group",
    "lipids profile",
    "blood p.film",
    "amylase",
    "stool for h pylori ag",
    "cpk",
    "hba1c",
    "mycodot",
    "urea",
    "billirubin",
    "hcv",
    "uric acid",
    "r.a-factor",
    "widal",
    "troponin",
    "dengue",
    "trop-t",
    "pregnancy-test",
    "typhidot",
    "semen analysis",
    "asot",
    "ldh",
    "d-dimer",
    "torch screening",
    "stool re",
    "tlc",
    "coagulation-profile",
    "ct bt",
    "rfts",
    "urine re",
    "serum-potassium",
    "serum-chloride",
    "cholesterol",
    "prostate-specific-antigen",
  ];

  const formatTitle = (text: string) => {
    return text
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  // ✅ FILTER LOGIC (SEARCH)
  const filteredTests = tests.filter((t) =>
    t.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Lab Tests
      </h1>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search test (e.g. CBC, Thyroid, ESR...)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {filteredTests.length > 0 ? (
          filteredTests.map((slug, i) => (
            <div
              key={i}
              onClick={() => router.push(`/dashboard/tests/${slug}`)}
              className="cursor-pointer p-4 bg-white hover:bg-blue-100 rounded-xl shadow-md text-center transition-all duration-200 hover:scale-105"
            >
              <p className="font-semibold text-gray-700">
                {formatTitle(slug)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No tests found
          </p>
        )}

      </div>
    </div>
  );
}