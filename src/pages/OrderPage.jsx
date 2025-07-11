import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../context/OrderContext";
import { useCart } from "../context/CartContext";
import Modal from "../components/Modal";
import logo from "../assets/img/logo.png"; // Usa tu logo gamer

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 px-4 py-10">
      <div className="w-full max-w-2xl bg-white/90 p-10 rounded-2xl shadow-2xl border-4 border-indigo-700 relative overflow-hidden">
        {/* Luz gamer */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-400 opacity-30 blur-3xl rounded-full z-0"></div>
        <img src={logo} alt="Logo GameShop" className="mx-auto w-16 mb-4 drop-shadow-lg z-10 relative" />
        <h2
          className="text-2xl font-extrabold mb-6 text-center text-indigo-900 drop-shadow"
          style={{ fontFamily: "Orbitron, Arial, sans-serif" }}
        >
          📦 Detalles de la Orden
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 z-10 relative">
          <input name="country" value={form.country} onChange={handleChange} placeholder="País" required className="w-full border border-indigo-300 px-3 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <input name="state" value={form.state} onChange={handleChange} placeholder="Departamento o Región" required className="w-full border border-indigo-300 px-3 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <input name="city" value={form.city} onChange={handleChange} placeholder="Ciudad" required className="w-full border border-indigo-300 px-3 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <input name="line1" value={form.line1} onChange={handleChange} placeholder="Dirección Línea 1" required className="w-full border border-indigo-300 px-3 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <input name="line2" value={form.line2} onChange={handleChange} placeholder="Dirección Línea 2" className="w-full border border-indigo-300 px-3 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <input name="reference" value={form.reference} onChange={handleChange} placeholder="Referencia" className="w-full border border-indigo-300 px-3 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notas adicionales" className="w-full border border-indigo-300 px-3 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} className="w-full border border-indigo-300 px-3 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="tarjeta">Tarjeta</option>
          </select>

          <div className="flex justify-center gap-4 mt-4">
            <button type="submit" className="flex-1 py-2 rounded bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold text-lg shadow-md hover:from-yellow-400 hover:to-pink-600 hover:shadow-xl transition-all duration-200 outline-none">
              Realizar Pago
            </button>
            <button type="button" onClick={() => navigate("/cart")} className="flex-1 py-2 rounded bg-gradient-to-r from-red-500 to-pink-700 text-white font-bold text-lg shadow hover:from-yellow-500 hover:to-pink-600 hover:scale-105 transition">
              Cancelar
            </button>
          </div>
        </form>

        {/* Popup de pago */}
        {showPayment && (
          <Modal onClose={() => setShowPayment(false)}>
            <h3 className="text-lg font-bold mb-4 text-indigo-900" style={{ fontFamily: "Orbitron, Arial, sans-serif" }}>
              💳 Ingresa los datos de tu tarjeta
            </h3>
            <input placeholder="Correo electrónico" className="w-full border border-indigo-300 px-3 py-2 rounded bg-gray-100 mb-2" />
            <input placeholder="Número de tarjeta" className="w-full border border-indigo-300 px-3 py-2 rounded bg-gray-100 mb-2" />
            <div className="flex gap-2">
              <input placeholder="MM/AA" className="w-1/2 border border-indigo-300 px-3 py-2 rounded bg-gray-100 mb-2" />
              <input placeholder="CVV" className="w-1/2 border border-indigo-300 px-3 py-2 rounded bg-gray-100 mb-2" />
            </div>
            <button
              onClick={handlePayment}
              className="bg-gradient-to-r from-green-500 to-green-700 w-full text-white py-2 rounded font-bold hover:from-yellow-400 hover:to-green-500 hover:scale-105 mt-3"
              style={{ fontFamily: "Orbitron, Arial, sans-serif" }}
            >
              Pagar
            </button>
          </Modal>
        )}

        {/* Popup de éxito */}
        {paymentSuccess && (
          <Modal onClose={() => setPaymentSuccess(false)}>
            <div className="text-center">
              <h3 className="text-xl font-bold text-green-600" style={{ fontFamily: "Orbitron, Arial, sans-serif" }}>
                ✅ Pago exitoso
              </h3>
              <p className="mt-2">Tu orden ha sido registrada con el ID:</p>
              <p className="font-mono text-blue-700 mt-1">{orderId}</p>
              <button onClick={() => {
                setPaymentSuccess(false);
                navigate("/catalog");
              }} className="mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-indigo-600 text-white rounded font-bold hover:from-yellow-400 hover:to-pink-600 hover:shadow-xl transition-all duration-200 outline-none">
                Cerrar
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
