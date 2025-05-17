import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkAuthentication } from "@/utils/auth";

export async function GET() {
  try {
    const { userId } = await checkAuthentication();

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Error retrieving user orders:", error);
    return NextResponse.json(
      { error: "Error retrieving user orders" },
      { status: 500 }
    );
  }
}
