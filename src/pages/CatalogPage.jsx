// src/pages/CatalogPage.jsx
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useCatalog } from "../context/CatalogContext";
import Swal from "sweetalert2";
import { getImageBySkuId } from "../utils/imageResolver"; // IMPORTANTE

export default function CatalogPage() {
  const { addToCart } = useCart();
  const { products, loading, error } = useCatalog();

  const handleAddToCart = (game) => {
    // Calcular la imagen igual que en el render
    const localImg = getImageBySkuId(game.sku_id);
    const imageSrc =
      localImg ||
      game.image ||
      "https://via.placeholder.com/400x200.png?text=Imagen+no+disponible";
    
    addToCart({ id: game.sku_id, ...game, image: imageSrc }); // <-- asegura que pase la imagen

    Swal.fire({
      icon: "success",
      title: "¡Agregado!",
      text: "El producto se agregó al carrito correctamente.",
      showConfirmButton: false,
      timer: 1200,
    });
  };


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        🎮 Catálogo de Juegos
      </h1>

      {loading && <p className="text-center">Cargando productos...</p>}
      {error && (
        <p className="text-center text-red-500">
          Error al cargar productos: {error}
        </p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((game) => {
            // 1. Buscar imagen local por sku_id
            const localImg = getImageBySkuId(game.sku_id);
            // 2. Si la respuesta del backend incluye un campo `image`, úsalo como fallback secundario
            // 3. Si no hay, mostrar el placeholder
            const imageSrc =
              localImg ||
              game.image ||
              "https://via.placeholder.com/400x200.png?text=Imagen+no+disponible";

            return (
              <div
                key={game.sku_id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <img
                  src={imageSrc}
                  alt={game.name}
                  className="w-full h-48 object-cover rounded"
                />
                <h2 className="text-xl font-semibold mt-3">{game.name}</h2>
                <p className="text-sm text-gray-500">SKU: {game.sku_id}</p>
                <p className="text-gray-700">💰 Precio: ${game.price}</p>
                <p className="text-gray-600 mb-2">📦 Estado: {game.status}</p>
                <p className="text-gray-600 mb-2">Categoría: {game.category}</p>
                <p className="text-gray-600 mb-2">Marca: {game.brand}</p>
                <button
                  onClick={() => handleAddToCart(game)}
                  className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
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
        className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-700 transition"
      >
        🛒 Ver Carrito
      </Link>
    </div>
  );
}
