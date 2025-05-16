import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { authConstants } from "@/lib/constants/auth";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export type AuthResult = {
  isAuthenticated: boolean;
  userId?: number;
  userEmail?: string;
  authType?: string;
};

// Define a minimal interface for cookie access
interface CookieAccessor {
  get: (name: string) => { value?: string } | undefined;
}

/**
 * Checks authentication using both custom session and NextAuth
 * Returns authentication status and user information if authenticated
 *
 * @param requestCookies Optional cookie accessor for middleware
 * @param skipDatabaseCheck Set to true when called from middleware to avoid Prisma errors
 */
export async function checkAuthentication(
  requestCookies?: CookieAccessor,
  skipDatabaseCheck = false
): Promise<AuthResult> {
  let jwtSessionCookie;

  // Handle cookies differently based on context (middleware vs API route)
  if (requestCookies) {
    // For middleware
    jwtSessionCookie = requestCookies.get(
      authConstants.SESSION_COOKIE_NAME
    )?.value;
    console.log(
      "Middleware cookie check:",
      jwtSessionCookie ? "Found cookie" : "No cookie"
    );
  } else {
    // For API routes
    const cookieStore = await cookies();
    jwtSessionCookie = cookieStore.get(
      authConstants.SESSION_COOKIE_NAME
    )?.value;
    console.log(
      "API route cookie check:",
      jwtSessionCookie ? "Found cookie" : "No cookie"
    );
  }

  // First try the custom session
  if (jwtSessionCookie) {
    try {
      console.log("Attempting to decrypt custom session");
      const session = await decrypt(jwtSessionCookie);
      console.log(
        "Session after decrypt:",
        session ? JSON.stringify(session) : "No session"
      );

      if (session?.userId) {
        // For middleware, just check if session exists without database validation
        if (skipDatabaseCheck) {
          return {
            isAuthenticated: true,
            userId: session.userId,
            authType: authConstants.AUTH.TYPES.CUSTOM,
          };
        }

        // For API routes, validate against database
        const user = await prisma.user.findUnique({
          where: { id: session.userId },
        });

        console.log(
          "User from custom session:",
          user ? `Found (ID: ${user.id})` : "Not found"
        );

        if (user) {
          return {
            isAuthenticated: true,
            userId: user.id,
            userEmail: user.email,
            authType: authConstants.AUTH.TYPES.CUSTOM,
          };
        }
      }
    } catch (error) {
      console.error("Error with custom session:", error);
    }
  }

  // If custom session failed, try NextAuth
  try {
    console.log("Attempting NextAuth session check");
    const session = await auth();
    console.log(
      "NextAuth session:",
      session ? `Found (Email: ${session.user?.email})` : "No session"
    );

    if (session?.user?.email) {
      // For middleware, just check if session exists without database validation
      if (skipDatabaseCheck) {
        return {
          isAuthenticated: true,
          userEmail: session.user.email,
          authType: authConstants.AUTH.TYPES.NEXTAUTH,
        };
      }

      // For API routes, validate against database
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      console.log(
        "User from NextAuth:",
        user ? `Found (ID: ${user.id})` : "Not found"
      );

      if (user) {
        return {
          isAuthenticated: true,
          userId: user.id,
          userEmail: user.email,
          authType: authConstants.AUTH.TYPES.NEXTAUTH,
        };
      }
    }
  } catch (error) {
    console.error("Error with NextAuth session:", error);
  }

  // If we get here, neither auth method worked
  console.log("Authentication failed - returning not authenticated");
  return { isAuthenticated: false };
}
