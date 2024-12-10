// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("authToken"); // Example: Get auth token from cookies

  if (!token) {
    // If not authenticated, redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow access if authenticated
  return NextResponse.next();
}

export const config = {
  matcher: ["/protected/:path*"], // Apply middleware only to specific routes
};
