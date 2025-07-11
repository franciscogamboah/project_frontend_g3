import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png"; // Si quieres el logo arriba

export default function CartPage() {
  const { cartItems, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 px-4 py-10">
      <div className="w-full max-w-3xl bg-white/90 shadow-2xl border-4 border-indigo-700 rounded-2xl p-10 relative overflow-hidden">
        {/* Luz gamer */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-400 opacity-30 blur-3xl rounded-full z-0"></div>
        {/* Logo opcional */}
        {/* <img src={logo} alt="Logo" className="mx-auto w-16 mb-4 drop-shadow-lg z-10 relative" /> */}

        <h1
          className="text-3xl font-extrabold text-center mb-8 text-indigo-900 drop-shadow"
          style={{ fontFamily: "Orbitron, Arial, sans-serif" }}
        >
          🛒 Carrito de Compras
        </h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-700 text-center text-lg">Tu carrito está vacío.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-5 border border-indigo-200 p-4 rounded-xl shadow-md bg-gray-50/80"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg border-2 border-indigo-400 bg-white"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-indigo-800">{item.name}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-3 py-1 border border-pink-500 rounded hover:bg-pink-100 font-extrabold text-lg text-pink-700"
                    >
                      -
                    </button>
                    <span className="font-semibold text-indigo-900 text-lg">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-3 py-1 border border-indigo-500 rounded hover:bg-indigo-100 font-extrabold text-lg text-indigo-700"
                    >
                      +
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {item.quantity} × ${item.price.toFixed(2)} ={" "}
                    <span className="text-pink-600 font-bold">
                      ${(item.quantity * item.price).toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-8 border-t border-indigo-300 pt-4">
              <p className="text-2xl font-extrabold mb-4 text-indigo-800 text-center">
                Total: <span className="text-pink-600">${total.toFixed(2)}</span>
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <button
                  onClick={() => navigate("/order")}
                  className="flex-1 py-2 rounded bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold text-lg shadow-md hover:from-yellow-400 hover:to-pink-600 hover:shadow-xl transition-all duration-200 outline-none"
                >
                  Finalizar compra
                </button>
                <button
                  onClick={clearCart}
                  className="flex-1 py-2 rounded bg-gradient-to-r from-red-500 to-pink-700 text-white font-bold text-lg shadow hover:from-yellow-500 hover:to-pink-600 hover:scale-105 transition"
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
