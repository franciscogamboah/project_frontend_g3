import { useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import logo from "../assets/img/logo.png"; // Usa tu logo gamer

export default function CasesPage() {
  const [form, setForm] = useState({
    orderId: "",
    category: "Reclamo de producto",
    resolutionCd: "PENDIENTE",
    subject: "",
    messageText: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    const token = Cookies.get("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.user_id;

    const payload = {
      userId,
      orderId: form.orderId,
      category: form.category,
      status: "Abierto",
      resolutionCd: form.resolutionCd,
      subject: form.subject,
      messages: [
        {
          type: "Cliente",
          createdAt: new Date().toISOString(),
          text: form.messageText,
        },
      ],
      createdDt: new Date().toISOString(),
      closedDt: null,
    };

    try {
      const response = await fetch("https://r36c7jyp0b.execute-api.us-east-1.amazonaws.com/dev/api/cases/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "text/plain",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Error al registrar el reclamo");

      Swal.fire({
        icon: "success",
        title: "¡Reclamo enviado!",
        text: "Tu reclamo se ha registrado correctamente.",
        confirmButtonColor: "#3085d6"
      });
      setStatus("✅ Reclamo enviado exitosamente");
      setForm({
        orderId: "",
        category: "Reclamo de producto",
        resolutionCd: "PENDIENTE",
        subject: "",
        messageText: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Hubo un problema al registrar el reclamo.",
      });
      setStatus("❌ Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900">
      <div className="w-full max-w-xl bg-white/90 p-10 rounded-2xl shadow-2xl border-4 border-indigo-700 relative overflow-hidden">
        {/* Efecto luz gamer */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-400 opacity-30 blur-3xl rounded-full z-0"></div>
        <img src={logo} alt="Logo GameShop" className="mx-auto w-16 mb-4 drop-shadow-lg z-10 relative" />
        <h2
          className="text-2xl font-extrabold mb-6 text-center text-indigo-900 drop-shadow"
          style={{ fontFamily: "Orbitron, Arial, sans-serif" }}
        >
          📝 Crear Reclamo
        </h2>
        {status && <p className="mb-4 text-blue-600 text-center">{status}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 z-10 relative">
          <input
            name="orderId"
            value={form.orderId}
            onChange={handleChange}
            placeholder="Código de la orden"
            className="w-full border border-indigo-300 px-3 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Asunto del reclamo"
            className="w-full border border-indigo-300 px-3 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <textarea
            name="messageText"
            value={form.messageText}
            onChange={handleChange}
            placeholder="Mensaje del reclamo"
            className="w-full border border-indigo-300 px-3 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className="w-full py-2 mt-4 rounded bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold text-lg shadow-md hover:from-yellow-400 hover:to-pink-600 hover:shadow-xl transition-all duration-200 outline-none"
          >
            Enviar Reclamo
          </button>
        </form>
      </div>
    </div>
  );
}
