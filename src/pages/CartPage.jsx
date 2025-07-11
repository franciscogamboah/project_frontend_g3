import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cartItems, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen flex items-start justify-center py-10">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded p-6">
        <h1 className="text-2xl font-bold mb-4">🛒 Carrito de Compras</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Tu carrito está vacío.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border p-4 rounded shadow">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-3 py-1 border rounded hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-3 py-1 border rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {item.quantity} × ${item.price.toFixed(2)} ={" "}
                    <span className="text-blue-600 font-bold">
                      ${(item.quantity * item.price).toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-6 border-t pt-4">
              <p className="text-xl font-bold mb-4">Total: ${total.toFixed(2)}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => navigate("/order")}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Finalizar compra
                </button>

                <button
                  onClick={clearCart}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
