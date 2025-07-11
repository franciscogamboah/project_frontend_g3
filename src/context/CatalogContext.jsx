import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext"; // o la ruta correcta de tu UserContext
import Cookies from "js-cookie";

const CatalogContext = createContext();

export function useCatalog() {
  return useContext(CatalogContext);
}

export function CatalogProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useUser();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!user || !token) {
      setProducts([]); // Limpiar productos si no hay sesión
      setError("");    // Limpiar error si no hay usuario o token
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      setError(""); // Limpiar errores antes de intentar
      try {
        const res = await fetch(
          "https://r36c7jyp0b.execute-api.us-east-1.amazonaws.com/dev/api/products?store_id=miraflores1&category=Juegos",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Error al obtener productos");

        const data = await res.json();
        setProducts(data.Data);
        setError(""); // <--- Limpia el error si el fetch fue exitoso
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user]);

  return (
    <CatalogContext.Provider value={{ products, loading, error }}>
      {children}
    </CatalogContext.Provider>
  );
}
