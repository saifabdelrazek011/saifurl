import { Navigate } from "react-router-dom";
import { useDashboardContext } from "../../contexts/DashboardContext.jsx";
import Loader from "../../components/Loader.jsx";

function AuthRoute({ children }) {
  const { isAuthenticated, isUserLoading } = useDashboardContext();

  if (isUserLoading) {
    return <Loader />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
export default AuthRoute;
