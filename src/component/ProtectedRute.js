import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token"); // Ambil token dari localStorage

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
