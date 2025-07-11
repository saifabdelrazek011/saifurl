import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDashboardContext } from "../../contexts/DashboardContext";

function Signin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    userData,
    apiUrl,
    refreshUserData,
    isUserLoading,
    theme, // keep for toggleTheme, but don't use for styling
    toggleTheme,
  } = useDashboardContext();

  useEffect(() => {
    if (userData && !isUserLoading) {
      navigate("/dashboard");
    }
  }, [userData, isUserLoading, navigate]);

  const handleSignin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.currentTarget;
    const email = form.elements.namedItem("email").value;
    const password = form.elements.namedItem("password").value;

    try {
      const response = await fetch(apiUrl + "/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || "Signin failed. Please try again."
        );
        return;
      }

      await response.json();
      setErrorMessage(null);
      form.reset();
      setShowPassword(false);
      await refreshUserData();
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-red-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 transition-colors duration-300">
      <div className="p-8 rounded-lg shadow-xl w-96 border bg-white border-white/50 dark:bg-gray-800/90 dark:border-gray-700/50 dark:shadow-2xl transition-colors duration-300">
        {/* Header with theme toggle */}
        <div className="flex justify-between items-center mb-4">
          <Link
            to="/"
            className="text-sm inline-flex items-center transition text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg font-semibold shadow transition text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Sign In to{" "}
          <span className="text-blue-600 dark:text-blue-400">SaifURL</span>
        </h2>

        <div className="text-center mb-6">
          <a
            href="https://status.saifabdelrazek.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={
                theme === "dark"
                  ? "https://uptime.saifabdelrazek.com/api/badge/7/status?upColor=%2360a5fa&downColor=%23f87171&pendingColor=%23fbbf24&maintenanceColor=%234ade80&style=for-the-badge"
                  : "https://uptime.saifabdelrazek.com/api/badge/7/status?upColor=%233b82f6&downColor=%23ef4444&pendingColor=%23f59e42&maintenanceColor=%2322c55e&style=for-the-badge"
              }
              alt="Service Status"
              className="h-6 mx-auto animate-pulse transition-all duration-500 ease-in-out transform hover:scale-105"
            />
          </a>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg text-sm bg-red-50 text-red-600 border border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700/50">
            {errorMessage}
          </div>
        )}

        <form
          className="space-y-4"
          id="signin-form"
          onSubmit={!loading ? handleSignin : null}
        >
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 transition bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 transition bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="show-password"
              className="mr-2 rounded focus:ring-2 bg-white border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-blue-600 dark:focus:ring-blue-500"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label
              htmlFor="show-password"
              className="text-sm text-gray-700 dark:text-gray-300"
            >
              Show Password
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded font-semibold transition duration-200 ${
              loading
                ? "cursor-not-allowed opacity-75"
                : "hover:scale-[1.02] active:scale-[0.98]"
            } bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 focus:outline-none focus:ring-2`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing In...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-6 space-y-2 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              className="font-semibold transition text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Sign Up
            </Link>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <Link
              to={"/forget-password"}
              className="font-semibold transition text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
