import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const auth = request.cookies.get("auth");

  const isDashboardRoute =
    request.nextUrl.pathname.startsWith("/dashboard");

  // If not logged in
  if (isDashboardRoute && !auth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};