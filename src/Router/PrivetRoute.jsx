import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const PrivetRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Wait until Firebase checks authentication status
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F1E8]">
        <span className="loading loading-spinner loading-lg text-[#174C3A]"></span>
      </div>
    );
  }

  // Allow authenticated users
  if (user) {
    return children;
  }

  // Redirect unauthenticated users to login
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivetRoute;
