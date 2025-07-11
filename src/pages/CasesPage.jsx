import { useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

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

    console.log("Payload to send:", payload);

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
    <div className="max-w-2xl mx-auto mt-8 bg-white shadow p-6 rounded">
      <h2 className="text-xl font-bold mb-4">📝 Crear Reclamo</h2>
      {status && <p className="mb-4 text-blue-600">{status}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="orderId"
          value={form.orderId}
          onChange={handleChange}
          placeholder="Código de la orden"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Asunto del reclamo"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          name="messageText"
          value={form.messageText}
          onChange={handleChange}
          placeholder="Mensaje del reclamo"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enviar Reclamo
        </button>
      </form>
    </div>
  );
}
