import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  // console.log(token);
  
  // Si no existe el token, redirigir al login inmediatamente
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  // Si existe, renderiza las rutas hijas (el Dashboard)
  return <Outlet />;
};

export default ProtectedRoute;