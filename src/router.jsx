import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { useDashboardContext } from "./contexts/DashboardContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import ShortUrlRedirect from "./pages/ShortUrlRedirect";
import ForgetPassword from "./pages/auth/ForgetPassword";

const apiUrl =
  import.meta.env.VITE_API_URL || "https://api.saifabdelrazek.com/v1";

function App() {
  const { userData, setUserData } = useDashboardContext();

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
        setUserData(undefined);
      }
    };
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={userData ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path=":slug" element={<ShortUrlRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
