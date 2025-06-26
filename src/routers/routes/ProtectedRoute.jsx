import { Navigate } from "react-router-dom";
import Loader from "../../components/Loader.jsx";
import { useDashboardContext } from "../../contexts/DashboardContext.jsx";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isUserLoading } = useDashboardContext();

  if (isUserLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
