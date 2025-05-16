import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { authConstants } from "@/lib/constants/auth";

export async function GET() {
  try {
    let userId: number | null = null;

    // Check for custom session first
    const cookieStore = await cookies();
    const jwtSessionCookie = cookieStore.get(
      authConstants.SESSION_COOKIE_NAME
    )?.value;

    if (jwtSessionCookie) {
      try {
        const session = await decrypt(jwtSessionCookie);
        if (session?.userId) {
          // Get user from custom session
          const user = await prisma.user.findUnique({
            where: { id: session.userId },
          });

          if (user) {
            userId = user.id;
          }
        }
      } catch (error) {
        console.error("Error with custom session:", error);
      }
    }

    // If custom session failed, try NextAuth
    if (!userId) {
      const session = await auth();
      if (session?.user?.email) {
        const user = await prisma.user.findUnique({
          where: { email: session.user.email },
        });

        if (user) {
          userId = user.id;
        }
      }
    }

    // If no user found through either method, return unauthorized
    if (!userId) {
      return NextResponse.json(
        { error: "You must be logged in to view your orders" },
        { status: 401 }
      );
    }

    // Fetch user's orders with order items
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: true,
      },
      orderBy: {
        created_at: "desc", // Most recent orders first
      },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
