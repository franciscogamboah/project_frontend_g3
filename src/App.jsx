import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CatalogPage from "./pages/CatalogPage";
import LoginPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";
import CasesPage from "./pages/CasesPage";
import CartPage from "./pages/CartPage";
import Navbar from "./pages/Navbar";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import { UserProvider, useUser } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import { useAutoLogout } from "./hooks/useAutoLogout";
import { LoginProvider } from "./context/LoginContext";
import RegisterPage from "./pages/RegisterPage";
import { RegisterProvider } from "./context/RegisterContext";
import { CatalogProvider } from "./context/CatalogContext";

function AppWrapper() {
  return (
    <UserProvider>
      <CartProvider>
        <LoginProvider>
          <RegisterProvider>
            <CatalogProvider>
              <Router>
                <App />
              </Router>
            </CatalogProvider>
          </RegisterProvider>
        </LoginProvider>
      </CartProvider>
    </UserProvider>
  );
}


function App() {
  const { user, loading, logout } = useUser();
  
  useAutoLogout(300000, logout); // 5 minutos de inactividad
  
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Cargando sesión...
      </div>
    );
  }

  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/catalog"
          element={user ? <CatalogPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/order"
          element={user ? <OrderPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/cases"
          element={user ? <CasesPage /> : <Navigate to="/login" />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/profile"
          element={user ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default AppWrapper;
