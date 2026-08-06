import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

let ADMIN_EMAIL = "admin@citylab.com";
let ADMIN_PASSWORD = "01234567";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const {
    email,
    password,
    updatePassword,
    currentPassword,
    newPassword,
  } = body;

  // UPDATE PASSWORD
  if (updatePassword) {
    if (currentPassword !== ADMIN_PASSWORD) {
      return NextResponse.json(
        {
          success: false,
          message: "Current password is incorrect",
        },
        {
          status: 401,
        }
      );
    }

    ADMIN_PASSWORD = newPassword;

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    });
  }

  // LOGIN
  if (
    email === ADMIN_EMAIL &&
    password === ADMIN_PASSWORD
  ) {
    return NextResponse.json({
      success: true,
    });
  }

  return NextResponse.json(
    {
      success: false,
      message: "Invalid credentials",
    },
    {
      status: 401,
    }
  );
}