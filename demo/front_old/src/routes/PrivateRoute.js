import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function PrivateRoute({ children, role }) {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;
  if (user.role !== role) return <Navigate to="/login" />;

  return children;
}
