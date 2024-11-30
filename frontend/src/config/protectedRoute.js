import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import { useEffect } from "react";
import { showErrorToast } from "../components/Toast";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, token } = useUserStore.getState();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false || token === null) {
      navigate("/login");
      showErrorToast({ text: "Please login first" });
    }
  }, [isAuthenticated, token]);

  return children;
};

export default ProtectedRoute;
