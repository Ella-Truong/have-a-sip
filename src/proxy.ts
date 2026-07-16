/**
 * Acts as a gatekeeper before protected routes
 * It uses auth(...) returned by NextAuth() to determine if incoming request has a valid authenticated session
 */

import { auth } from "./auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
    const { nextUrl } = req;

    const isLoggedIn =  !!req.auth;

    const isAdminRoute = 
        nextUrl.pathname.startsWith("/admin") ||
        nextUrl.pathname.startsWith("/api/admin");

    if (isAdminRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL("/login", req.url))
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*"]
}