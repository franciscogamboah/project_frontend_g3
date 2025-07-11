import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../context/OrderContext";
import { useCart } from "../context/CartContext";

import Modal from "../components/Modal";

export default function OrderPage() {
  const [form, setForm] = useState({
    country: "Perú",
    line1: "",
    line2: "",
    city: "",
    state: "",
    reference: "",
    notes: "",
    paymentMethod: "tarjeta",
    storeId: "miraflores1",
  });
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();
  const { createOrder } = useOrder();
  const { cartItems, clearCart } = useCart();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowPayment(true); // Solo muestra el popup
  };

  const handlePayment = async () => {
    await createOrder(
      form,
      cartItems,
      (generatedOrderId) => {
        setOrderId(generatedOrderId);
        setShowPayment(false);
        setPaymentSuccess(true);
        clearCart();
      },
      (error) => {
        alert("Error en el pago: " + error.message);
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-xl font-bold mb-4">📦 Detalles de la Orden</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="country" value={form.country} onChange={handleChange} placeholder="Pais" required className="w-full border px-3 py-2 rounded" />
        <input name="state" value={form.state} onChange={handleChange} placeholder="Departamento o Región" required className="w-full border px-3 py-2 rounded" />
        <input name="city" value={form.city} onChange={handleChange} placeholder="Ciudad" required className="w-full border px-3 py-2 rounded" />
        <input name="line1" value={form.line1} onChange={handleChange} placeholder="Dirección Línea 1" required className="w-full border px-3 py-2 rounded" />
        <input name="line2" value={form.line2} onChange={handleChange} placeholder="Dirección Línea 2" className="w-full border px-3 py-2 rounded" />
        <input name="reference" value={form.reference} onChange={handleChange} placeholder="Referencia" className="w-full border px-3 py-2 rounded" />
        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notas adicionales" className="w-full border px-3 py-2 rounded" />
        <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} className="w-full border px-3 py-2 rounded">
          <option value="tarjeta">Tarjeta</option>
        </select>

        <div className="flex justify-center gap-4 mt-4">
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Guardar Compra
          </button>
          <button type="button" onClick={() => navigate("/catalog")} className="bg-red-400 text-white py-2 px-4 rounded hover:bg-gray-500">
            Cancelar
          </button>
        </div>
      </form>

      {/* Popup de pago */}
      {showPayment && (
        <Modal onClose={() => setShowPayment(false)}>
          <h3 className="text-lg font-bold mb-4">💳 Ingresa los datos de tu tarjeta</h3>
          <input placeholder="Correo electrónico" className="w-full border px-3 py-2 rounded mb-2" />
          <input placeholder="Número de tarjeta" className="w-full border px-3 py-2 rounded mb-2" />
          <div className="flex gap-2">
            <input placeholder="MM/AA" className="w-1/2 border px-3 py-2 rounded mb-2" />
            <input placeholder="CVV" className="w-1/2 border px-3 py-2 rounded mb-2" />
          </div>
          <button
            onClick={handlePayment}
            className="bg-green-600 w-full text-white py-2 rounded hover:bg-green-700"
          >
            Pagar
          </button>
        </Modal>
      )}

      {/* Popup de éxito */}
      {paymentSuccess && (
        <Modal onClose={() => setPaymentSuccess(false)}>
          <div className="text-center">
            <h3 className="text-xl font-bold text-green-600">✅ Pago exitoso</h3>
            <p className="mt-2">Tu orden ha sido registrada con el ID:</p>
            <p className="font-mono text-blue-700 mt-1">{orderId}</p>
            <button onClick={() => {
              setPaymentSuccess(false);
              navigate("/catalog");
            }} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Cerrar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
