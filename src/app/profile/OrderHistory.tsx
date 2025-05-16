"use client";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "@/utils/ui";
import { useOrders } from "@/hooks/user";

export default function OrderHistory() {
  const { orders, loading, error } = useOrders();

  if (loading) {
    return (
      <div className="flex items-center gap-x-2">
        <p>Loading your orders</p>
        <span className="inline-block w-4 h-4 border-2 border-accent-1 border-t-amber-200 rounded-full animate-spin"></span>
      </div>
    );
  }

  if (error) {
    return (
      <aside className="error-popup w-[300px] bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3 shadow-md fixed top-5 left-1/2 -translate-x-1/2 z-10 animate-slide-down">
        <p className="text-red-500 text-sm font-dm-sans px-4">{error}</p>
        <button className="bg-red-100 hover:bg-red-300 text-red-500 rounded-full cursor-pointer w-[22px] h-[22px] flex justify-center items-center absolute top-2 right-2">
          <FontAwesomeIcon icon={faXmark} width={10} height={10} />
        </button>
      </aside>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="font-dm-sans font-[300] text-start text-lg py-4">
        <p>You haven&apos;t placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="dark:bg-white/5 rounded-lg mt-6 p-4">
      <h1 className="font-[400] font-dm-sans text-white-fg text-2xl text-start mb-2">
        Purchase History
      </h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white/2 font-poppins font-[300] px-4 py-3 rounded-lg"
          >
            <div className="flex items-center gap-x-1 flex-wrap">
              <p>Order #:</p>
              <p className="text-black/60 dark:text-white">{order.id}</p>
            </div>
            <div className="flex items-center gap-x-1 flex-wrap">
              <p>Date:</p>
              <p className="text-black/60 dark:text-white/60">
                {formatDate(order.created_at.toLocaleString())}
              </p>
            </div>
            <div className="flex items-center gap-x-1 flex-wrap">
              <p>Total:</p>
              <p className="text-black/60 dark:text-white/60">
                ${order.total.toFixed(2)}
              </p>
            </div>
            <div className="space-y-1.5 mt-2">
              <p>Items:</p>
              <div className="ml-4 space-y-1">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <p className="text-black/60 dark:text-white/60">
                      {item.title} × {item.quantity}
                    </p>
                    <p className="text-black/60 dark:text-white/70">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {orders.indexOf(order) < orders.length - 1 && (
              <hr className="my-4 border-gray-200 dark:border-gray-700" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
