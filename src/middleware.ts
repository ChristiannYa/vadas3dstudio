import { NextRequest, NextResponse } from "next/server";
import { checkAuthentication } from "./utils/auth";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const protectedRoutes = ["/account"];

  // Check for nested routes (e.g., /account/settings, /account/settings/edit)
  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  if (isProtectedRoute) {
    // Pass request cookies to the authentication function and skip
    // database check
    const { isAuthenticated } = await checkAuthentication(
      request.cookies,
      true
    );

    // Redirect unauthenticated users
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*"],
};
