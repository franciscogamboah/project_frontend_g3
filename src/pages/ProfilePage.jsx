import { useUser } from "../context/UserContext";
import logo from "../assets/img/logo.png"; // Usa tu logo gamer

export default function ProfilePage() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900">
        <p className="text-indigo-200 text-xl font-bold">Cargando perfil...</p>
      </div>
    );
  }

  const { name, email, address, phone } = user.data ?? user; // por si cambia la forma

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 px-4 py-10">
      <div className="w-full max-w-lg bg-white/90 p-10 rounded-2xl shadow-2xl border-4 border-indigo-700 relative overflow-hidden">
        {/* Luz gamer */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-400 opacity-30 blur-3xl rounded-full z-0"></div>
        <img src={logo} alt="Logo GameShop" className="mx-auto w-16 mb-4 drop-shadow-lg z-10 relative" />
        <h1
          className="text-2xl font-extrabold mb-6 text-center text-indigo-900 drop-shadow"
          style={{ fontFamily: "Orbitron, Arial, sans-serif" }}
        >
          👤 Mi Perfil
        </h1>
        <div className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold">Nombre</label>
            <input
              type="text"
              value={name}
              readOnly
              className="w-full border border-indigo-300 px-3 py-2 rounded bg-gray-100 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full border border-indigo-300 px-3 py-2 rounded bg-gray-100 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Dirección</label>
            <input
              type="text"
              value={address}
              readOnly
              className="w-full border border-indigo-300 px-3 py-2 rounded bg-gray-100 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Teléfono</label>
            <input
              type="text"
              value={phone}
              readOnly
              className="w-full border border-indigo-300 px-3 py-2 rounded bg-gray-100 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
