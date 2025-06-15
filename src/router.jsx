import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  useNavigate,
  useParams,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ShortUrlRedirect from "./pages/ShortUrlRedirect";
import { DashboardContext } from "./contexts/dashboard.context";

const apiUrl =
  import.meta.env.VITE_API_URL || "https://api.saifabdelrazek.com/v1";

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(apiUrl + "/auth/users/me", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <DashboardContext.Provider value={{ userData }}>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate to={userData === null ? "/signin" : "/dashboard"} />
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path=":slug" element={<ShortUrlRedirect />} />
        </Routes>
      </DashboardContext.Provider>
    </BrowserRouter>
  );
}

export default App;
