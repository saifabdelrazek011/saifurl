import { useState, useEffect } from "react";
import { useDashboardContext } from "../../contexts/DashboardContext";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { userData, apiUrl, isUserLoading, theme, toggleTheme } =
    useDashboardContext();

  useEffect(() => {
    if (userData && !isUserLoading) {
      navigate("/dashboard");
    }
  }, [userData, navigate, isUserLoading]);

  const handleSignup = async (event) => {
    setLoading(true);
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      username: form.elements.namedItem("username").value,
      firstName: form.elements.namedItem("firstname").value,
      lastName: form.elements.namedItem("lastname").value,
      email: form.elements.namedItem("email").value,
      password: form.elements.namedItem("password").value,
      confirmPassword: form.elements.namedItem("confirmPassword").value,
    };

    try {
      const response = await fetch(apiUrl + "/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || "Signup failed. Please try again."
        );
        return;
      }
      const responseData = await response.json();

      if (!responseData) {
        throw new Error("No response received from the server.");
      }

      if (responseData.error) {
        setErrorMessage(responseData.error);
        return;
      }

      setErrorMessage("Signup successful! Redirecting...");
      form.reset();
      setShowPassword(false);
      setErrorMessage(null);

      navigate("/signin");
    } catch (error) {
      setErrorMessage("An error occurred during signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <div className="flex items-center justify-center min-h-screen py-8 bg-gradient-to-br from-blue-100 via-white to-red-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 transition-colors duration-300">
      <div className="p-6 rounded-lg w-full max-w-md border bg-white border-white/50 shadow-lg dark:bg-gray-800/90 dark:border-gray-700/50 dark:shadow-2xl transition-colors duration-300">
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

        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
          Sign Up to{" "}
          <span className="text-blue-600 dark:text-blue-400">SaifURL</span>
        </h2>

        <div className="text-center mb-4">
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
          <div
            id="error-region"
            className="mb-4 p-3 rounded-lg text-sm bg-red-50 text-red-600 border border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700/50"
          >
            <p>{errorMessage}</p>
          </div>
        )}

        <form
          className="space-y-3 max-h-[60vh] overflow-y-auto pr-2"
          id="signup-form"
          onSubmit={!loading ? handleSignup : null}
        >
          <div>
            <label
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 transition bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label
                className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
                htmlFor="firstname"
              >
                First name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 transition bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                placeholder="First name"
              />
            </div>
            <div className="flex-1">
              <label
                className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
                htmlFor="lastname"
              >
                Last name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 transition bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                placeholder="Last name"
              />
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
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
          <div>
            <label
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
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
          <div>
            <label
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 transition bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="Confirm your password"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="show-password"
              className="mt-1 rounded focus:ring-2 bg-white border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-blue-600 dark:focus:ring-blue-500"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label
              htmlFor="show-password"
              className="ml-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Show Password
            </label>
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 rounded-lg font-semibold transition bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="loader inline-block w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Signup;
