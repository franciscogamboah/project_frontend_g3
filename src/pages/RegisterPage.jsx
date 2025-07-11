import { useState } from "react";
import { useRegister } from "../context/RegisterContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png"; // Usa tu logo aquí

export default function RegisterPage() {
  const { registerUser, registerError } = useRegister();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.name) newErrors.name = "Nombre es requerido";
    if (!form.email) {
      newErrors.email = "Correo es requerido";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Correo no es válido";
    }

    if (!form.password) {
      newErrors.password = "Contraseña es requerida";
    } else if (form.password.length < 7 || !/[A-Z]/.test(form.password) || !/\d/.test(form.password)) {
      newErrors.password = "Debe tener al menos 7 caracteres, una mayúscula y un número";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Debes repetir la contraseña";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (!form.phone) {
      newErrors.phone = "Teléfono es requerido";
    } else if (!/^\d{9,}$/.test(form.phone)) {
      newErrors.phone = "El teléfono debe tener al menos 9 dígitos";
    }

    if (!form.address) newErrors.address = "Dirección es requerida";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await registerUser(form, () => navigate("/login"));
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
          📝 Regístrate en GameShop
        </h2>
        {registerError && (
          <p className="text-red-600 text-sm mb-4 text-center">{registerError}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 z-10 relative">
          <div>
            <label className="block text-gray-700">Nombre</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-indigo-300 px-3 py-2 rounded bg-gray-100 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
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
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Repetir Contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border border-indigo-300 px-3 py-2 rounded bg-gray-100 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Teléfono</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border border-indigo-300 px-3 py-2 rounded bg-gray-100 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Dirección</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full border border-indigo-300 px-3 py-2 rounded bg-gray-100 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 rounded bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold text-lg shadow-md hover:from-yellow-400 hover:to-pink-600 hover:shadow-xl transition-all duration-200 outline-none"
          >
            Registrarse
          </button>
          <div className="mt-4 text-center">
            <p>
              ¿Ya tienes cuenta?{" "}
              <a href="/login" className="text-indigo-600 hover:underline font-semibold">
                Inicia sesión
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
