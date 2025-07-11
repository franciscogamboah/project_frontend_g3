import { createContext, useContext } from "react";
import Cookies from "js-cookie";

const LoginContext = createContext();

export function LoginProvider({ children }) {
  const login = async (form) => {
    const response = await fetch("https://r36c7jyp0b.execute-api.us-east-1.amazonaws.com/dev/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!response.ok) throw new Error("Credenciales inválidas");

    const loginData = await response.json();
    const token = loginData.data.token;

    Cookies.set("token", token, { expires: 1 });

    const profileResponse = await fetch("https://r36c7jyp0b.execute-api.us-east-1.amazonaws.com/dev/api/users/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!profileResponse.ok) throw new Error("No se pudo obtener el perfil");

    const profileData = await profileResponse.json();

    localStorage.setItem("user", JSON.stringify(profileData.data));
    return profileData.data;
  };

  return (
    <LoginContext.Provider value={{ login }}>
      {children}
    </LoginContext.Provider>
  );
}

export function useLogin() {
  return useContext(LoginContext);
}
