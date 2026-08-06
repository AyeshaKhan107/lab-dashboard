import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoDB";

export async function POST(req: Request) {
  try {
    const { templatesCollection } = await connectDB();

    const body = await req.json();

    const existing = await templatesCollection.findOne({
      slug: body.slug,
    });

    if (existing) {
      await templatesCollection.updateOne(
        { slug: body.slug },
        { $set: body }
      );
    } else {
      await templatesCollection.insertOne(body);
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save template",
      },
      { status: 500 }
    );
  }
}

