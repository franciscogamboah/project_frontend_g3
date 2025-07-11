import { useState } from "react";
import { useRegister } from "../context/RegisterContext";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">📝 Registro</h2>
        {registerError && (
          <p className="text-red-600 text-sm mb-4 text-center">{registerError}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-gray-700">Nombre</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded mt-1"
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
              className="w-full border px-3 py-2 rounded mt-1"
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
              className="w-full border px-3 py-2 rounded mt-1"
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
              className="w-full border px-3 py-2 rounded mt-1"
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
              className="w-full border px-3 py-2 rounded mt-1"
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
              className="w-full border px-3 py-2 rounded mt-1"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Registrarse
          </button>

        <div className="mt-4 text-center">
            <p>
                ¿Ya tienes cuenta?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                Inicia sesión
                </a>
            </p>
        </div>
        </form>
      </div>
    </div>
  );
}
