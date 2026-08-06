import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoDB";
import { ObjectId } from "mongodb";


export async function GET(
  req: Request,
  { params }: { params: Promise<{ Id: string }> }
) {
  try {
    const { Id } = await params;

    if (!Id) {
      return NextResponse.json(
        { success: false, message: "Report ID is required" },
        { status: 400 }
      );
    }

    const { reportsCollection } = await connectDB();

    const report = await reportsCollection.findOne({
      _id: new ObjectId(Id),
    });

    if (!report) {
      return NextResponse.json(
        { success: false, message: "Report not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error("❌ GET SINGLE REPORT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch report",
      },
      { status: 500 }
    );
  }
}

// ======================
// UPDATE REPORT
// ======================
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ Id: string }> }
) {
  try {
    const { Id } = await params;
    const body = await req.json();

    if (!Id) {
      return NextResponse.json(
        { success: false, message: "Report ID is required" },
        { status: 400 }
      );
    }

    const { reportsCollection } = await connectDB();

    const result = await reportsCollection.updateOne(
      { _id: new ObjectId(Id) },
      {
        $set: {
          ...body,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Report not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Report updated successfully",
    });
  } catch (error) {
    console.error("❌ UPDATE REPORT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update report",
      },
      { status: 500 }
    );
  }
}

// ======================
// DELETE REPORT
// ======================
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ Id: string }> }
) {
  try {
    const { Id } = await params;

    if (!Id) {
      return NextResponse.json(
        { success: false, message: "Report ID is required" },
        { status: 400 }
      );
    }

    const { reportsCollection } = await connectDB();

    const result = await reportsCollection.deleteOne({
      _id: new ObjectId(Id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Report not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Report deleted successfully",
    });
  } catch (error) {
    console.error("❌ DELETE REPORT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete report",
      },
      { status: 500 }
    );
  }
}
