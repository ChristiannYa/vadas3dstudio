import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { authConstants } from "@/lib/constants/auth";

const userSelect = {
  id: true,
  name: true,
  last_name: true,
  email: true,
  created_at: true,
};

export async function GET(request: Request) {
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

    // If custom session failed, try NextAuth
    try {
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (token?.sub && token.email) {
        const user = await prisma.user.findUnique({
          where: { email: token.email },
          select: userSelect,
        });

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
