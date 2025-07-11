import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const CatalogContext = createContext();

export function useCatalog() {
  return useContext(CatalogContext);
}

export function CatalogProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
        // const token = Cookies.get("token");
        const token = Cookies.get("token"); // lee el token de cookies

        if (!token) {
            setError("No se encontró el token de autenticación.");
            setLoading(false);
            return;
        }

      try {
        const res = await fetch("https://r36c7jyp0b.execute-api.us-east-1.amazonaws.com/dev/api/products?store_id=miraflores1&category=Juegos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Error al obtener productos");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <CatalogContext.Provider value={{ products, loading, error }}>
      {children}
    </CatalogContext.Provider>
  );
}
