import { NextResponse } from "next/server";
import { checkAuthentication } from "@/utils/auth";
import prisma from "@/lib/prisma";

const userSelect = {
  id: true,
  name: true,
  last_name: true,
  email: true,
  created_at: true,
};

export async function GET() {
  try {
    const { isAuthenticated, userId, authType } = await checkAuthentication();

    if (!isAuthenticated) {
      return NextResponse.json({ isLoggedIn: false });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: userSelect,
    });

    return NextResponse.json({
      isLoggedIn: true,
      user,
      authType,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
