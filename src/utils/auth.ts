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

  // Handle cookies differently based on context
  // (middleware vs API route)
  if (requestCookies) {
    // For middleware
    jwtSessionCookie = requestCookies.get(
      authConstants.SESSION_COOKIE_NAME
    )?.value;
  } else {
    // For API routes
    const cookieStore = await cookies();
    jwtSessionCookie = cookieStore.get(
      authConstants.SESSION_COOKIE_NAME
    )?.value;
  }

  // First try the custom session
  if (jwtSessionCookie) {
    try {
      const session = await decrypt(jwtSessionCookie);

      if (session?.userId) {
        // For middleware, just check if session exists without
        // database validation
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
    const session = await auth();

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
  return { isAuthenticated: false };
}
