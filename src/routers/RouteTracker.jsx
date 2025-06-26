import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function RouteTracker({ children }) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/404") {
      localStorage.setItem("lastValidRoute", location.pathname);
    }
  }, [location]);

  return <>{children}</>;
}

export default RouteTracker;
