// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const { cartItems } = useCart();
  const { user, logout } = useUser();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ❌ No renderizar navbar si no hay usuario autenticado
  if (!user) return null;

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <div className="flex gap-4">
        <Link to="/catalog" className="hover:underline">Catálogo</Link>
        <Link to="/cases" className="hover:underline">Reclamos</Link>
        <Link to="/about" className="hover:underline">¿Quiénes somos?</Link>
      </div>

      <div className="flex items-center gap-4 relative">
        {/* Carrito */}
        <Link to="/cart" className="relative">
          <span className="text-2xl">🛒</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

        {/* Menú de usuario */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-10 h-10 rounded-full bg-white text-gray-800 flex items-center justify-center text-xl font-bold border border-gray-300 hover:bg-gray-100"
            title="Usuario"
          >
            {user.data?.name?.charAt(0).toUpperCase() || "U"}
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded shadow z-50">
              <button
                onClick={() => {
                  setShowMenu(false);
                  navigate("/profile");
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                👤 Perfil
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                🚪 Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
