import * as React from "react";
import { OwnerNotificationEmailProps } from "@/app/definitions";

export const OwnerNotificationEmail: React.FC<
  Readonly<OwnerNotificationEmailProps>
> = ({ customerName, customerEmail, orderId, orderItems, total }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
    }}
  >
    <h1
      style={{
        color: "#333",
        borderBottom: "1px solid #eee",
        paddingBottom: "10px",
      }}
    >
      New Order Received!
    </h1>

    <p style={{ fontSize: "16px", color: "#555" }}>
      You have received a new order #{orderId} from {customerName} (
      {customerEmail}).
    </p>

    <h2 style={{ color: "#333", marginTop: "30px" }}>Order Details</h2>

    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ backgroundColor: "#f8f8f8" }}>
          <th
            style={{
              padding: "10px",
              textAlign: "left",
              borderBottom: "1px solid #ddd",
            }}
          >
            Item
          </th>
          <th
            style={{
              padding: "10px",
              textAlign: "center",
              borderBottom: "1px solid #ddd",
            }}
          >
            Quantity
          </th>
          <th
            style={{
              padding: "10px",
              textAlign: "right",
              borderBottom: "1px solid #ddd",
            }}
          >
            Price
          </th>
        </tr>
      </thead>
      <tbody>
        {orderItems.map((item) => (
          <tr key={item.id}>
            <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
              {item.title}
            </td>
            <td
              style={{
                padding: "10px",
                textAlign: "center",
                borderBottom: "1px solid #eee",
              }}
            >
              {item.quantity}
            </td>
            <td
              style={{
                padding: "10px",
                textAlign: "right",
                borderBottom: "1px solid #eee",
              }}
            >
              ${item.price.toFixed(2)}
            </td>
          </tr>
        ))}
        <tr>
          <td
            colSpan={2}
            style={{ padding: "10px", textAlign: "right", fontWeight: "bold" }}
          >
            Total:
          </td>
          <td
            style={{ padding: "10px", textAlign: "right", fontWeight: "bold" }}
          >
            ${total.toFixed(2)}
          </td>
        </tr>
      </tbody>
    </table>

    <div
      style={{
        marginTop: "30px",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "5px",
      }}
    >
      <p style={{ margin: "0" }}>
        Please process this order at your earliest convenience.
      </p>
    </div>
  </div>
);
