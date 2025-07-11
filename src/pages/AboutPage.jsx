import logo from "../assets/img/logo.png"; // O tu logo gamer

export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 px-4 py-10">
      <div className="w-full max-w-3xl bg-white/90 shadow-2xl border-4 border-indigo-700 rounded-2xl p-10 relative overflow-hidden">
        {/* Efecto luz gamer */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-400 opacity-30 blur-3xl rounded-full z-0"></div>

        <img
          src={logo}
          alt="Logo GameShop"
          className="mx-auto w-24 mb-4 drop-shadow-lg z-10 relative"
        />
        <h1
          className="text-3xl font-extrabold text-center mb-6 text-indigo-900 drop-shadow"
          style={{ fontFamily: "Orbitron, Arial, sans-serif" }}
        >
          👨‍💻 ¿Quiénes Somos?
        </h1>

        <p className="text-gray-800 text-lg leading-7 text-center mb-3">
          Esta aplicación es una <strong>Prueba de Concepto (POC)</strong> desarrollada como parte del proyecto final de la Universidad de Ingeniería y Tecnología (UTEC).
        </p>

        <p className="mt-2 text-gray-800 text-lg leading-7 text-center mb-3">
          El objetivo de esta POC es demostrar el diseño e implementación de una plataforma web con catálogo de productos, carrito, órdenes y gestión de reclamos.
        </p>

        <p className="mt-2 text-gray-800 text-lg leading-7 text-center">
          Este proyecto fue realizado por el <strong>Grupo 3</strong>, conformado por los estudiantes:
        </p>

        <ul className="list-disc list-inside mt-5 text-indigo-700 text-lg text-center space-y-1">
          <li>Francisco Gamboa</li>
          <li>Miguel Vega</li>
          <li>Juan Carranza</li>
          <li>Marco Matos</li>
        </ul>

        <p className="mt-8 text-gray-700 text-base italic text-center">
          ¡Gracias por visitar nuestra aplicación! 💻🚀
        </p>
      </div>
    </div>
  );
}
