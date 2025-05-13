import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
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

    // Check NextAuth session if custom session not authenticated
    if (!isAuthenticated) {
      try {
        const token = await getToken({
          req: request,
          secret: process.env.NEXTAUTH_SECRET,
        });

        if (token) {
          isAuthenticated = true;
        }
      } catch (error) {
        console.error("NextAuth session check error:", error);
      }
    }

    // Redirect unauthenticated users
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return undefined;
}

/**
 * @note - without this, the middleware will run on every request.
 * It will trigger the middleware whenever the path starts with "/profile",
 * and paths that may have additional segments after "/profile/"
 * (e.g., '/profile/settings')
 */
export const config = {
  matcher: ["/profile/:path*"],
};
