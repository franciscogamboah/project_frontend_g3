import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2";

const RegisterContext = createContext();

export function useRegister() {
  return useContext(RegisterContext);
}

export function RegisterProvider({ children }) {
  const [registerError, setRegisterError] = useState("");

  const registerUser = async (form, onSuccess) => {
    setRegisterError("");

    if (form.password !== form.confirmPassword) {
      setRegisterError("Las contraseñas no coinciden.");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden.",
      });
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{7,}$/;
    if (!passwordRegex.test(form.password)) {
      setRegisterError("La contraseña debe tener al menos 7 caracteres, una mayúscula y un número.");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La contraseña debe tener al menos 7 caracteres, una mayúscula y un número.",
      });
      return;
    }

    try {
      const res = await fetch("https://r36c7jyp0b.execute-api.us-east-1.amazonaws.com/dev/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone,
          address: form.address,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "No se pudo registrar el usuario");
      }

      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "Tu cuenta ha sido creada correctamente.",
        confirmButtonColor: "#3085d6"
      }).then(() => {
        onSuccess?.(); // redirige si hay callback
      });

    } catch (err) {
      setRegisterError(err.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Hubo un problema al registrar.",
      });
    }
  };

  return (
    <RegisterContext.Provider value={{ registerUser, registerError }}>
      {children}
    </RegisterContext.Provider>
  );
}

