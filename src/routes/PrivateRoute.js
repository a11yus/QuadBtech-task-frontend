import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  return isUserLoggedIn ? children : <Navigate to="/login" />;
};
