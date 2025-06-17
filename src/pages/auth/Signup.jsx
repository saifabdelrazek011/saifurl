import { useState, useEffect } from "react";
import { useDashboardContext } from "../../contexts/DashboardContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
      form.reset(); // Reset the form fields after successful signup
      setShowPassword(false); // Reset password visibility state
      const passwordInput = document.getElementById("password");
      if (passwordInput) {
        passwordInput.type = "password"; // Reset the password input type
      }
      const showPasswordCheckbox = document.getElementById("show-password");
      if (showPasswordCheckbox) {
        showPasswordCheckbox.checked = false; // Reset the checkbox state
      }
      setErrorMessage(null);

      navigate("/signin");
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage("An error occurred during signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  }, [errorMessage]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign Up to <span className="text-blue-600">SaifURL</span>
        </h2>
        <img
          src="https://uptime.saifabdelrazek.com/api/badge/7/status?upColor=%233b82f6&downColor=%23ef4444&pendingColor=%23f59e42&maintenanceColor=%2322c55e&style=for-the-badge"
          alt="Service Status"
          className="  h-6 mb-4 mx-auto animate-pulse transition-all duration-500 ease-in-out transform hover:scale-105"
        />
        {errorMessage && (
          <div id="error-region" className="mb-4">
            <p className="text-red-500">{errorMessage}</p>
          </div>
        )}
        <form
          className="space-y-4"
          id="signup-form"
          onSubmit={!loading ? handleSignup : null}
        >
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
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
          <div className="mb-4">
            <label
              className=" inline text-sm font-medium mb-2"
              htmlFor="firstname"
            >
              First name
            </label>
            <input
              type="text"
              id="firstname"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your firstname"
            />
            <label
              className="inline text-sm font-medium mb-2"
              htmlFor="lastname"
            >
              Last name
            </label>
            <input
              type="text"
              id="lastname"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your lastname"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
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
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            <label htmlFor="confirmed-password">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="show-password"
                className="mt-2"
                onChange={(e) => {
                  setShowPassword(e.target.checked);
                }}
              />
              <label htmlFor="show-password" className="ml-2 text-sm">
                Show Password
              </label>
            </div>
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
