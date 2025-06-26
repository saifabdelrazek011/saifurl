import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDashboardContext } from "../../contexts/DashboardContext";

function Signin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userData, apiUrl, refreshUserData, isUserLoading } =
    useDashboardContext();

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="mb-4 text-center">
          <Link
            to="/"
            className="text-blue-600 hover:underline text-sm inline-block"
          >
            ← Back to Home
          </Link>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign In to <span className="text-blue-600">SaifURL</span>
        </h2>
        <a
          href="https://status.saifabdelrazek.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://uptime.saifabdelrazek.com/api/badge/7/status?upColor=%233b82f6&downColor=%23ef4444&pendingColor=%23f59e42&maintenanceColor=%2322c55e&style=for-the-badge"
            alt="Service Status"
            className="h-6 mb-4 mx-auto animate-pulse transition-all duration-500 ease-in-out transform hover:scale-105"
          />
        </a>
        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
        )}

        <form
          className="space-y-4"
          id="signin-form"
          onSubmit={!loading ? handleSignin : null}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="show-password"
              className="mr-2"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="show-password" className="text-sm">
              Show Password
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? (
              <span className="animate-spin">🔄 Signing In...</span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
        <p className="mt-2 text-center text-sm text-gray-600">
          <Link
            to={"/forget-password"}
            className="text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
