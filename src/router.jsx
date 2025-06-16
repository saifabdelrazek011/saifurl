import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDashboardContext } from "./contexts/DashboardContext";
import { ShorturlsProvider } from "./contexts/ShorturlsContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import ShortUrlRedirect from "./pages/ShortUrlRedirect";
import ForgetPassword from "./pages/auth/ForgetPassword";
import NotFound from "./pages/404";

function App() {
  const { userData } = useDashboardContext();

  return (
    <ShorturlsProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              userData ? <Dashboard /> : <Navigate to="/signin" replace />
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/signin"
            element={
              !userData ? <Signin /> : <Navigate to="/dashboard" replace />
            }
          />
          <Route
            path="/signup"
            element={
              !userData ? <Signup /> : <Navigate to="/dashboard" replace />
            }
          />
          <Route
            path="/forget-password"
            element={
              !userData ? (
                <ForgetPassword />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          <Route path=":slug" element={<ShortUrlRedirect />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </HashRouter>
    </ShorturlsProvider>
  );
}

export default App;
