"use client";

import React from "react";
import { usePathname } from "next/navigation";

import OGTTReport from "../../../components/templates/OGTTReport";
import ESRReport from "../../../components/templates/ESRReport";
import DynamicTemplates from "../../../components/templates/DynamicTemplates";

export default function TestPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);

  usePathname();

  // ✅ FIX: clean slug (handles %20, spaces, casing issues)
  const cleanSlug = decodeURIComponent(slug)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/%20/g, "-");

  const formatTitle = (text: string) => {
    return decodeURIComponent(text)
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const title = formatTitle(slug);

  let Component;

  // ✅ TEMPLATE ROUTING (FIXED)
  if (cleanSlug === "ogtt") {
    Component = <OGTTReport title={title} />;

  } else if (cleanSlug === "esr") {
    Component = <ESRReport title={title} />;

  } else if (cleanSlug === "24-hour-urine-for-protein") {
    Component = (
      <DynamicTemplates title={title} slug={cleanSlug} />
    );

  } else {
    Component = (
      <DynamicTemplates title={title} slug={cleanSlug} />
    );
  }

  return (
    <div className="bg-white p-4 min-h-screen">
      {Component}
    </div>
  );
}