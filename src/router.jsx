import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDashboardContext } from "./contexts/DashboardContext";
import { ShorturlsProvider } from "./contexts/ShorturlsContext";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import ShortUrlRedirect from "./pages/ShortUrlRedirect";
import ForgetPassword from "./pages/auth/ForgetPassword";
import NotFound from "./pages/404";
import Developer from "./pages/Developer";

function App() {
  const { userData, isUserLoading } = useDashboardContext();

  return (
    <ShorturlsProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              userData && !isUserLoading ? (
                <Dashboard />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/profile"
            element={
              userData && !isUserLoading ? (
                <Profile />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/developer"
            element={
              userData && !isUserLoading ? (
                <Developer />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/signin"
            element={
              !userData && !isUserLoading ? (
                <Signin />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          <Route
            path="/signup"
            element={
              !userData && !isUserLoading ? (
                <Signup />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          <Route
            path="/forget-password"
            element={
              !userData && !isUserLoading ? (
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
