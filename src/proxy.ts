/**
 * Acts as the gatekeeper for protected routes.
 *
 * Next.js only executes this proxy for routes matching `config.matcher`.
 * Auth.js authenticates the request first and attaches the session to `req.auth`.
 *
 * If `req.auth` exists, the request is allowed to continue.
 * Otherwise, the user is redirected to the login page.
 */

import { auth } from "./auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
    /**
     * Auth.js attaches the authenticated session to `req.auth`.
     *
     * req.auth === null
     *   → User is not logged in.
     *
     * req.auth === Session object
     *   → User is authenticated.
     */
    const isLoggedIn = !!req.auth;

    // Block unauthenticated users from protected routes.
    if (!isLoggedIn) {
        return NextResponse.redirect(
            new URL("/login", req.url)
        );
    }

    // Authentication passed.
    // Tell Next.js to continue processing the request.
    return NextResponse.next();
});

/**
 * Next.js checks this configuration BEFORE executing the proxy.
 *
 * Only requests matching these paths will run the proxy.
 *
 * /admin
 * /admin/*
 * /api/admin
 * /api/admin/*
 */
export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*"],
};