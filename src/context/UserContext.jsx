import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null; // Solo data
  });

  useEffect(() => {
    const token = Cookies.get("token");

    if (token && !user) {
      fetch("https://r36c7jyp0b.execute-api.us-east-1.amazonaws.com/dev/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          if (data.data) {
            setUser(data.data); // <- solo data
            localStorage.setItem("user", JSON.stringify(data.data));
          }
        })
        .catch(err => {
          console.error("Error al obtener perfil:", err);
          setUser(null);
        });
    }
  }, []);

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
