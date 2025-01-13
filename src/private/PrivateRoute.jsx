/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading)
    return (
      <div className="flex justify-cente  items-center h-screen">
        Loading...
      </div>
    );
  if (!user) return <Navigate state={{ from: location }} to="/login" />;
  return children;
}
