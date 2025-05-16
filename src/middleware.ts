import { NextRequest, NextResponse } from "next/server";
import { checkAuthentication } from "./utils/auth";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log(`Middleware processing path: ${path}`);

  // Protected routes that require authentication
  const protectedRoutes = ["/profile"];

  // Check for nested routes (e.g., /profile/settings, /profile/settings/edit)
  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  console.log(`Is protected route: ${isProtectedRoute}`);

  // Only check authentication for protected routes
  if (isProtectedRoute) {
    console.log("Checking authentication in middleware");

    // Pass request cookies to the authentication function
    const { isAuthenticated } = await checkAuthentication(request.cookies);

    console.log(`Authentication result: ${isAuthenticated}`);

    // Redirect unauthenticated users
    if (!isAuthenticated) {
      console.log("User not authenticated, redirecting to home page");
      return NextResponse.redirect(new URL("/", request.url));
    }

    console.log("User authenticated, allowing access to protected route");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*"],
};
