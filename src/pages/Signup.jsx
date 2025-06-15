import { useState } from "react";

const apiUrl =
  import.meta.env.VITE_API_URL || "https://api.saifabdelrazek.com/v1/auth";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const errorRegion = document.getElementById("error-region");
  if (errorRegion) {
    errorRegion.innerHTML = ""; // Clear any previous error messages
  }

  const handleSignup = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      firstName: form.elements.namedItem("firstname").value,
      lastName: form.elements.namedItem("lastname").value,
      email: form.elements.namedItem("email").value,
      password: form.elements.namedItem("password").value,
    };

    try {
      const response = await fetch(apiUrl + "/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || "Signup failed. Please try again."
        );
        if (errorRegion) {
          errorRegion.innerHTML = `<p class="text-red-500">${errorMessage}</p>`;
        }
        return;
      }
      const result = await response.json();

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

      window.location.href = "/signin";
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage("An error occurred during signup. Please try again.");
      if (errorRegion) {
        errorRegion.innerHTML = `<p class="text-red-500">${errorMessage}</p>`;
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {errorMessage && (
          <div id="error-region" className="mb-4">
            <p className="text-red-500">{errorMessage}</p>
          </div>
        )}
        <form className="space-y-4" id="signup-form" onSubmit={handleSignup}>
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
            <div id="view-password">
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
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <a href={"/signin"} className="text-blue-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
