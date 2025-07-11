import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useState, useEffect, useRef } from "react";
import logo from "../assets/img/logo.png"; // Usa tu logo gamer

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

  if (!user) return null;

  return (
    <nav className="bg-gradient-to-r from-indigo-900 via-pink-800 to-indigo-700 shadow-lg px-6 py-3 flex justify-between items-center border-b-4 border-pink-400 relative z-50">
      {/* Logo + Nombre */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="GameShop" className="w-10 h-10 drop-shadow-lg" />
        <span
          className="text-2xl font-extrabold text-white drop-shadow"
          style={{ fontFamily: "Orbitron, Arial, sans-serif" }}
        >
          GameShop
        </span>
      </div>

      {/* Links */}
      <div className="flex gap-5 items-center">
        <Link
          to="/catalog"
          className="text-white font-bold text-lg hover:text-yellow-400 transition"
          style={{ fontFamily: "Orbitron, Arial, sans-serif" }}
        >
          Catálogo
        </Link>
        <Link
          to="/cases"
          className="text-white font-bold text-lg hover:text-yellow-400 transition"
          style={{ fontFamily: "Orbitron, Arial, sans-serif" }}
        >
          Reclamos
        </Link>
        <Link
          to="/about"
          className="text-white font-bold text-lg hover:text-yellow-400 transition"
          style={{ fontFamily: "Orbitron, Arial, sans-serif" }}
        >
          ¿Quiénes somos?
        </Link>
      </div>

      {/* Carrito y menú usuario */}
      <div className="flex items-center gap-4 relative">
        {/* Carrito */}
        <Link to="/cart" className="relative group">
          <span className="text-3xl drop-shadow-lg">🛒</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-600 group-hover:bg-yellow-400 text-white group-hover:text-pink-700 text-xs w-6 h-6 flex items-center justify-center rounded-full border-2 border-white font-bold transition">
              {totalItems}
            </span>
          )}
        </Link>

        {/* Menú de usuario */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-10 h-10 rounded-full bg-white text-indigo-800 flex items-center justify-center text-xl font-extrabold border-2 border-pink-500 shadow hover:shadow-lg transition"
            title="Usuario"
            style={{ fontFamily: "Orbitron, Arial, sans-serif" }}
          >
            {user.data?.name?.charAt(0).toUpperCase() || "U"}
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-white/95 text-indigo-900 rounded-xl shadow-lg border-2 border-pink-500 z-50 overflow-hidden">
              <button
                onClick={() => {
                  setShowMenu(false);
                  navigate("/profile");
                }}
                className="block w-full text-left px-4 py-3 hover:bg-pink-100 hover:text-pink-600 transition"
                style={{ fontFamily: "Orbitron, Arial, sans-serif" }}
              >
                👤 Perfil
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-3 hover:bg-pink-100 hover:text-pink-600 transition"
                style={{ fontFamily: "Orbitron, Arial, sans-serif" }}
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
