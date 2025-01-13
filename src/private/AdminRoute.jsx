/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading)
    return (
      <div className="flex justify-cente  items-center h-screen">
        Loading...
      </div>
    );
  if (user && user?.role === "admin") return children;

  return <Navigate state={{ from: location }} to="/login" />;
}
