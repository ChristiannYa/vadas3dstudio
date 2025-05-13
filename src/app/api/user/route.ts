import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { authConstants } from "@/lib/constants/auth";

const userSelect = {
  id: true,
  name: true,
  last_name: true,
  email: true,
  created_at: true,
};

export async function GET() {
  try {
    // Check for custom session
    const cookieStore = await cookies();
    const jwtSessionCookie = cookieStore.get(
      authConstants.SESSION_COOKIE_NAME
    )?.value;

    // First try the custom session
    if (jwtSessionCookie) {
      try {
        const session = await decrypt(jwtSessionCookie);
        if (session?.userId) {
          const user = await prisma.user.findUnique({
            where: { id: session.userId },
            select: userSelect,
          });

          if (user) {
            return NextResponse.json({
              isLoggedIn: true,
              user,
              authType: authConstants.AUTH.TYPES.CUSTOM,
            });
          }
        }
      } catch (error) {
        console.error("Error with custom session:", error);
      }
    }

    // If custom session failed, try NextAuth using the auth() function
    try {
      console.log("Trying NextAuth session using auth()");
      const session = await auth();
      console.log(
        "NextAuth session:",
        session
          ? {
              user: session.user
                ? {
                    name: session.user.name,
                    email: session.user.email,
                  }
                : "No user in session",
            }
          : "No session found"
      );

      if (session?.user?.email) {
        const user = await prisma.user.findUnique({
          where: { email: session.user.email },
          select: userSelect,
        });

        console.log(
          "User found from session:",
          user ? { id: user.id, email: user.email } : "No user found"
        );

        if (user) {
          return NextResponse.json({
            isLoggedIn: true,
            user,
            authType: authConstants.AUTH.TYPES.NEXTAUTH,
          });
        }
      }
    } catch (error) {
      console.error("Error with NextAuth session:", error);
    }

    // If we get here, neither auth method worked
    return NextResponse.json({ isLoggedIn: false });
  } catch (error) {
    console.error("Error getting user data:", error);
    return NextResponse.json(
      { isLoggedIn: false, error: "Failed to get user data" },
      { status: 500 }
    );
  }
}
