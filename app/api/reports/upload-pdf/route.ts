import { NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const runtime = "nodejs";

const r2Endpoint = process.env.R2_ENDPOINT;
const r2AccessKeyId = process.env.R2_ACCESS_KEY_ID;
const r2SecretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const r2BucketName = process.env.R2_BUCKET_NAME;
const r2PublicBaseUrl = process.env.R2_PUBLIC_BASE_URL;

const r2Client =
  r2Endpoint && r2AccessKeyId && r2SecretAccessKey
    ? new S3Client({
        region: "auto",
        endpoint: r2Endpoint,
        credentials: {
          accessKeyId: r2AccessKeyId,
          secretAccessKey: r2SecretAccessKey,
        },
      })
    : null;

const buildPublicUrl = (key: string) => {
  if (!r2PublicBaseUrl) {
    throw new Error("R2_PUBLIC_BASE_URL is missing");
  }

  return `${r2PublicBaseUrl.replace(/\/$/, "")}/${key}`;
};

export async function POST(req: Request) {
  try {
    if (!r2Client || !r2BucketName) {
      return NextResponse.json(
        {
          success: false,
          message:
            "R2 is not configured. Set R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME and R2_PUBLIC_BASE_URL.",
        },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: "No PDF file uploaded" },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { success: false, message: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const key = `reports/${Date.now()}-${safeFileName}`;

    await r2Client.send(
      new PutObjectCommand({
        Bucket: r2BucketName,
        Key: key,
        Body: buffer,
        ContentType: "application/pdf",
      })
    );

    const url = buildPublicUrl(key);

    return NextResponse.json({
      success: true,
      key,
      url,
    });
  } catch (error) {
    console.error("❌ R2 PDF UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to upload PDF",
      },
      { status: 500 }
    );
  }
}
