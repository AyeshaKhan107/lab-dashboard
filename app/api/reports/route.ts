import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoDB";

// ======================
// GET ALL REPORTS
// ======================
export async function GET() {
  try {
    const { reportsCollection } = await connectDB();

    const reports = await reportsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const serializedReports = reports.map((report) => ({
      ...report,
      _id: report._id.toString(),
      createdAt: report.createdAt instanceof Date ? report.createdAt.toISOString() : report.createdAt,
      updatedAt: report.updatedAt instanceof Date ? report.updatedAt.toISOString() : report.updatedAt,
    }));

    return NextResponse.json({
      success: true,
      count: serializedReports.length,
      data: serializedReports,
    });
  } catch (error) {
    console.error("❌ GET REPORTS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch reports",
      },
      { status: 500 }
    );
  }
}

// ======================
// SAVE REPORT
// ======================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body) {
      return NextResponse.json(
        { success: false, message: "Empty body" },
        { status: 400 }
      );
    }

    const { reportsCollection } = await connectDB();

    const reportData = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await reportsCollection.insertOne(reportData);

    const savedReport = {
      _id: result.insertedId.toString(),
      ...reportData,
      createdAt: reportData.createdAt.toISOString(),
      updatedAt: reportData.updatedAt.toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Report saved successfully",
      id: result.insertedId.toString(),
      data: savedReport,
    });
  } catch (error) {
    console.error("❌ SAVE REPORT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save report",
      },
      { status: 500 }
    );
  }
}
