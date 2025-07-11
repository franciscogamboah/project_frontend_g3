export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded mt-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">👨‍💻 ¿Quiénes Somos?</h1>
      
      <p className="text-gray-800 text-lg leading-7">
        Esta aplicación es una <strong>Prueba de Concepto (POC)</strong> desarrollada como parte del proyecto final de la Universidad de Ingeniería y Tecnología (UTEC).
      </p>

      <p className="mt-4 text-gray-800 text-lg leading-7">
        El objetivo de esta POC es demostrar el diseño e implementación de una plataforma web con funcionalidades de catálogo de productos, carrito de compras, generación de órdenes y gestión de reclamos.
      </p>

      <p className="mt-4 text-gray-800 text-lg leading-7">
        Este proyecto fue realizado por el <strong>Grupo 3</strong>, conformado por los estudiantes:
      </p>

      <ul className="list-disc list-inside mt-3 text-gray-800 text-lg">
        <li>Francisco Gamboa</li>
        <li>Miguel Vega</li>
        <li>Juan Carranza</li>
        <li>Marco Matos</li>
      </ul>

      <p className="mt-6 text-gray-700 text-base italic text-center">
        ¡Gracias por visitar nuestra aplicación! 💻🚀
      </p>
    </div>
  );
}
