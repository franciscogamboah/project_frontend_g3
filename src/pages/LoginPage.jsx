import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginContext";
import { useUser } from "../context/UserContext";
import logo from "../assets/img/logo.png"; // Usa tu logo aquí

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useLogin();
  const { setUser } = useUser();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const profile = await login(form);
      setUser(profile);
      navigate("/catalog");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900">
      <div className="w-full max-w-md bg-white/90 p-10 rounded-2xl shadow-2xl border-4 border-indigo-700 relative overflow-hidden">
        {/* Efecto luz gamer */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-400 opacity-30 blur-3xl rounded-full z-0"></div>
        <img src={logo} alt="Logo GameShop" className="mx-auto w-20 mb-4 drop-shadow-lg z-10 relative" />
        <h2
          className="text-2xl font-extrabold mb-6 text-center text-indigo-900 drop-shadow"
          style={{ fontFamily: "Orbitron, Arial, sans-serif" }}
        >
          🎮 Bienvenido a GameShop
        </h2>
        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 z-10 relative">
          <div>
            <label className="block text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-indigo-300 px-3 py-2 rounded bg-gray-100 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-indigo-300 px-3 py-2 rounded bg-gray-100 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 rounded bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold text-lg shadow-md hover:from-yellow-400 hover:to-pink-600 hover:shadow-xl transition-all duration-200 outline-none"
          >
            Entrar
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-700 z-10 relative">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-indigo-600 hover:underline font-semibold">
            ¡Regístrate aquí!
          </a>
        </p>
      </div>
    </div>
  );
}
