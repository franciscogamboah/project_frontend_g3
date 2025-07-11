// src/pages/ProfilePage.jsx
import { useUser } from "../context/UserContext";

export default function ProfilePage() {
  const { user } = useUser();

  console.log("Perfil del usuario:", user);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-xl">Cargando perfil...</p>
      </div>
    );
  }

  const { name, email, address, phone } = user;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">👤 Mi Perfil</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Nombre</label>
            <input
              type="text"
              value={name}
              readOnly
              className="w-full border px-3 py-2 rounded bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full border px-3 py-2 rounded bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Dirección</label>
            <input
              type="text"
              value={address}
              readOnly
              className="w-full border px-3 py-2 rounded bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Teléfono</label>
            <input
              type="text"
              value={phone}
              readOnly
              className="w-full border px-3 py-2 rounded bg-gray-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
