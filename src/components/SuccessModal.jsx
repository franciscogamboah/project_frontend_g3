// src/components/SuccessModal.jsx
export default function SuccessModal({ orderId, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow text-center max-w-sm w-full">
        <h2 className="text-lg font-bold text-green-700 mb-4">✅ Pago exitoso</h2>
        <p className="mb-4">Tu compra ha sido procesada correctamente.</p>
        <p className="font-mono text-blue-600">ID de orden: <strong>{orderId}</strong></p>
        <button
          onClick={onClose}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Aceptar
        </button>
      </div>
    </div>
  );
}
