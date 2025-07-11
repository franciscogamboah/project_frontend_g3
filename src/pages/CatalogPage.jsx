import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useCatalog } from "../context/CatalogContext";
import Swal from "sweetalert2";
import { getImageBySkuId } from "../utils/imageResolver";

export default function CatalogPage() {
  const { addToCart } = useCart();
  const { products, loading, error } = useCatalog();

  const handleAddToCart = (game) => {
    const localImg = getImageBySkuId(game.sku_id);
    const imageSrc =
      localImg ||
      game.image ||
      "https://via.placeholder.com/400x200.png?text=Imagen+no+disponible";
    addToCart({ id: game.sku_id, ...game, image: imageSrc });
    Swal.fire({
      icon: "success",
      title: "¡Agregado!",
      text: "El producto se agregó al carrito correctamente.",
      showConfirmButton: false,
      timer: 1200,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 px-4 py-10 flex flex-col">
      <h1
        className="text-4xl font-extrabold mb-8 text-center text-indigo-100 drop-shadow"
        style={{ fontFamily: "Orbitron, Arial, sans-serif" }}
      >
        🎮 Catálogo de Juegos
      </h1>

      {loading && (
        <p className="text-center text-indigo-200 text-lg">Cargando productos...</p>
      )}
      {error && (
        <p className="text-center text-red-400 text-lg">
          Error al cargar productos: {error}
        </p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
          {products.map((game) => {
            const localImg = getImageBySkuId(game.sku_id);
            const imageSrc =
              localImg ||
              game.image ||
              "https://via.placeholder.com/400x200.png?text=Imagen+no+disponible";

            return (
              <div
                key={game.sku_id}
                className="bg-white/90 border-4 border-indigo-700 rounded-2xl shadow-xl hover:shadow-indigo-400 transition hover:scale-105 p-5 flex flex-col"
              >
                <img
                  src={imageSrc}
                  alt={game.name}
                  className="w-full h-44 object-cover rounded-xl mb-4 shadow"
                />
                <h2 className="text-xl font-bold text-indigo-900" style={{ fontFamily: "Orbitron, Arial, sans-serif" }}>
                  {game.name}
                </h2>
                <p className="text-sm text-gray-500">SKU: {game.sku_id}</p>
                <p className="text-gray-700 font-semibold mt-1">
                  💰 Precio: <span className="text-pink-600">${game.price}</span>
                </p>
                <p className="text-gray-600 mb-1">📦 Estado: {game.status}</p>
                <p className="text-gray-600 mb-1">Categoría: {game.category}</p>
                <p className="text-gray-600 mb-3">Marca: {game.brand}</p>
                <button
                  onClick={() => handleAddToCart(game)}
                  className="mt-auto w-full py-2 rounded bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold text-md shadow-md hover:from-yellow-400 hover:to-pink-600 hover:shadow-xl transition-all duration-200 outline-none"
                >
                  ➕ Agregar al carrito
                </button>
              </div>
            );
          })}
        </div>
      )}

      <Link
        to="/cart"
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-4 rounded-full shadow-xl hover:from-yellow-400 hover:to-green-500 hover:scale-105 transition font-extrabold text-lg z-50"
        style={{ fontFamily: "Orbitron, Arial, sans-serif" }}
      >
        🛒 Ver Carrito
      </Link>
    </div>
  );
}
