import { useState, useEffect } from "react";
import { Order } from "@prisma/client";

interface OrderWithItems extends Order {
  orderItems: {
    id: number;
    title: string;
    price: number;
    quantity: number;
  }[];
}

export function useOrders() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/user/orders");

        if (!response.ok) {
          console.error("Failed to fetch orders:", response.status);
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Unable to load your order history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading, error };
}
