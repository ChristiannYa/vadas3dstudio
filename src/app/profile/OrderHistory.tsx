"use client";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "@/utils/ui";
import { useOrders } from "@/hooks/user";

export default function OrderHistory() {
  const { orders, loading } = useOrders();

  if (loading) {
    return (
      <div className="dark:bg-white/5 rounded-lg animate-pulse h-full p-3 md:p-4">
        <div className="flex gap-x-2">
          <p className="leading-none">Loading your orders</p>
          <span className="inline-block w-4 h-4 border-2 border-accent-1 border-t-amber-200 rounded-full animate-spin"></span>
        </div>
      </div>
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
    <div className="dark:bg-white/5 rounded-lg p-3 md:p-4">
      <div className="mb-2">
        <h1 className="font-[400] font-dm-sans text-white-fg text-2xl text-start">
          Order History
        </h1>
        <h2 className="text-white-fg/90 font-poppins font-[300]">
          Total: <span className="text-white-fg/90">{orders.length}</span>
        </h2>
      </div>
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={order.id}
            className="bg-white/2 font-poppins font-[300] px-3 md:px-4 py-2.5 md:py-3 rounded-lg relative"
          >
            <div className="bg-white/5 rounded-full w-4.5 h-4.5 flex justify-center items-center absolute top-2 right-2">
              <p className="font-poppins text-white-fg text-xs">{index + 1}</p>
            </div>
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
            <div className="mt-1">
              {/* Order items title */}
              <p>Items:</p>
              {/* Order items list */}
              <ul className="list-disc pl-5 relative">
                {order.orderItems.map((item) => (
                  <li key={item.id}>
                    <div className="text-sm flex justify-between">
                      <div className="flex items-center gap-x-1">
                        <div className="flex items-center gap-x-1">
                          <p className="text-black/60 dark:text-white/60">
                            {item.title}
                          </p>
                          <p className="text-black/60 dark:text-white/60 text-xs">
                            (${item.price})
                          </p>
                        </div>
                        <p className="text-black/70 dark:text-white/70">
                          <FontAwesomeIcon
                            icon={faXmark}
                            width={6}
                            height={6}
                          />{" "}
                          {item.quantity}
                        </p>
                      </div>
                      <p className="text-black/60 dark:text-white/70">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              {/* Order items total */}
              <div className="text-sm mt-2 flex justify-end items-center gap-x-1 flex-wrap">
                <p>Total:</p>
                <p className="text-black/60 dark:text-white/60">
                  ${order.total.toFixed(2)}
                </p>
              </div>
            </div>
            <hr className="my-2 border-gray-200 dark:border-gray-700" />
          </div>
        ))}
      </div>
    </div>
  );
}
