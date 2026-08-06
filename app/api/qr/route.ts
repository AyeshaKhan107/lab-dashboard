import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(req: Request) {
  const { text } = await req.json();

  if (!text) {
    return NextResponse.json(
      { error: "No text provided" },
      { status: 400 }
    );
  }

  const qrImage = await QRCode.toDataURL(text);

  return NextResponse.json({ qrImage });
}