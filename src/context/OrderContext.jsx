// src/context/OrderContext.jsx
import { createContext, useContext } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const OrderContext = createContext();

export function useOrder() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }) {
  const createOrder = async (form, cartItems, onSuccess, onError) => {
    try {
      const token = Cookies.get("token");
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.user_id;
      const now = new Date().toISOString();
      const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const payload = {
        UserId: userId,
        Address: {
          Reference: form.reference,
          Country: form.Country,
          Default: true,
          City: form.city,
          Location: {
            Lat: -12.104533,
            Lon: -77.00571,
          },
          State: form.state,
          Type: form.state,
          Line1: form.line1,
          Line2: form.line2,
        },
        CreatedAt: now,
        DeliveredAt: now,
        DeliveryRating: 4,
        DeliveryStartedAt: now,
        Items: cartItems.map(item => ({
          SkuId: item.sku_id,
          Price: item.price,
          Quantity: item.quantity,
        })),
        Notes: form.notes,
        PaidAt: now,
        PaymentMethod: form.paymentMethod,
        Status: "delivered",
        StoreId: form.storeId,
        TotalAmount: total,
        TrackingStatus: "delivered",
      };

      const res = await fetch("https://r36c7jyp0b.execute-api.us-east-1.amazonaws.com/dev/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al procesar la orden");
      const data = await res.json();
      Swal.fire({
        icon: "success",
        title: "¡Orden registrada!",
        text: "Tu orden se ha procesado correctamente.",
        confirmButtonColor: "#3085d6"
      }).then(() => {
        onSuccess(data?.orderId || "ORD-000123");
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Hubo un problema al registrar la orden.",
      });
      onError(err);
    }
  };

  return (
    <OrderContext.Provider value={{ createOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
