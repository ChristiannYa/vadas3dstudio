import { OrderConfirmationEmail } from "@/app/components/emails/OrderConfirmationEmail";
import { OwnerNotificationEmail } from "@/app/components/emails/OwnerNotificationEmail";
import { Resend } from "resend";
import prisma from "@/lib/prisma";
import { OrderItem } from "@/app/definitions";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);
const STORE_EMAIL = process.env.STORE_EMAIL || "owner@vadas3dstudio.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "orders@vadas3dstudio.com";

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return Response.json({ error: "Order ID is required" }, { status: 400 });
    }

    // Fetch order details from the database
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: true,
        orderItems: true,
      },
    });

    if (!order) {
      return Response.json({ error: "Order not found" }, { status: 404 });
    }

    // Send confirmation email to customer
    const customerEmailResult = await resend.emails.send({
      from: `Vada 3D Studio <${FROM_EMAIL}>`,
      to: [order.user.email],
      subject: `Order Confirmation #${order.id}`,
      react: React.createElement(OrderConfirmationEmail, {
        customerName: `${order.user.name} ${order.user.last_name}`,
        orderId: order.id,
        orderItems: order.orderItems as OrderItem[],
        total: order.total,
      }),
    });

    // Send notification email to store owner
    const ownerEmailResult = await resend.emails.send({
      from: `Vada 3D Studio <${FROM_EMAIL}>`,
      to: [STORE_EMAIL],
      subject: `New Order #${order.id}`,
      react: React.createElement(OwnerNotificationEmail, {
        customerName: `${order.user.name} ${order.user.last_name}`,
        customerEmail: order.user.email,
        orderId: order.id,
        orderItems: order.orderItems as OrderItem[],
        total: order.total,
      }),
    });

    return Response.json({
      customerEmail: customerEmailResult,
      ownerEmail: ownerEmailResult,
    });
  } catch (error) {
    console.error("Error sending order emails:", error);
    return Response.json(
      { error: "Failed to send order emails" },
      { status: 500 }
    );
  }
}
