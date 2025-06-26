import { useState, useEffect } from "react";
import { useDashboardContext } from "../../contexts/DashboardContext";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { userData, apiUrl, isUserLoading } = useDashboardContext();

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4 text-center">
          <Link
            to="/"
            className="text-blue-600 hover:underline text-sm inline-block"
          >
            ← Back to Home
          </Link>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Sign Up to <span className="text-blue-600">SaifURL</span>
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
          <div id="error-region" className="mb-4">
            <p className="text-red-500">{errorMessage}</p>
          </div>
        )}
        <form
          className="space-y-3 max-h-[60vh] overflow-y-auto pr-2"
          id="signup-form"
          onSubmit={!loading ? handleSignup : null}
        >
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="firstname"
              >
                First name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="First name"
              />
            </div>
            <div className="flex-1">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="lastname"
              >
                Last name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Last name"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
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
          <div>
            <label
              className="block text-sm font-medium mb-1"
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
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="show-password"
              className="mt-1"
              onChange={(e) => {
                setShowPassword(e.target.checked);
              }}
            />
            <label htmlFor="show-password" className="ml-2 text-sm">
              Show Password
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            {loading ? (
              <span className="animate-spin">🔄 Signing Up...</span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to={"/signin"} className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Signup;
