// src/components/PaymentModal.jsx
import { useState } from "react";

export default function PaymentModal({ onClose, onConfirm, totalAmount }) {
  const [card, setCard] = useState({ email: "", number: "", exp: "", cvv: "" });

  const handleChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow">
        <h2 className="text-lg font-bold mb-4 text-center text-purple-700">CULQI CHECKOUT</h2>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={card.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mb-2"
        />
        <input
          type="text"
          name="number"
          placeholder="Número de tarjeta"
          value={card.number}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mb-2"
        />
        <div className="flex gap-2">
          <input
            type="text"
            name="exp"
            placeholder="MM/YY"
            value={card.exp}
            onChange={handleChange}
            className="w-1/2 border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={card.cvv}
            onChange={handleChange}
            className="w-1/2 border px-3 py-2 rounded"
          />
        </div>
        <button
          onClick={() => onConfirm(card)}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          PAGAR ${totalAmount.toFixed(2)}
        </button>
        <button
          onClick={onClose}
          className="mt-2 text-sm text-gray-500 hover:underline w-full text-center"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
