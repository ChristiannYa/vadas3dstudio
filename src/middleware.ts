import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { decrypt } from "./lib/session";
import { authConstants } from "./lib/constants/auth";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protected routes that require authentication
  const protectedRoutes = ["/profile"];

  // Check for nested routes (e.g., /profile/settings, /profile/settings/edit)
  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  // Only check authentication for protected routes
  if (isProtectedRoute) {
    let isAuthenticated = false;

    // Check custom session
    try {
      const jwtSessionCookie = request.cookies.get(
        authConstants.SESSION_COOKIE_NAME
      )?.value;

      if (jwtSessionCookie) {
        const payload = await decrypt(jwtSessionCookie);

        if (payload && payload.userId) {
          isAuthenticated = true;
        }
      }
    } catch (error) {
      console.error("Custom session check error:", error);
    }

    // Check NextAuth session
    if (!isAuthenticated) {
      try {
        console.log("Checking NextAuth session in middleware");
        const session = await auth();
        console.log(
          "NextAuth session in middleware:",
          session ? "Found" : "Not found"
        );
        if (session) {
          isAuthenticated = true;
          console.log("Authenticated with NextAuth in middleware");
        }
      } catch (error) {
        console.error("NextAuth session check error in middleware:", error);
      }
    }

    // Redirect unauthenticated users
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*"],
};
