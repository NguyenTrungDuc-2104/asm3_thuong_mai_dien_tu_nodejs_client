import { useEffect } from "react";
import { useRouteError, useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    if (error.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("roomId");
      navigate("/login");
    }
  }, [error]);
};
export default ErrorPage;
