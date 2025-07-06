import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDashboardContext } from "../contexts/DashboardContext";

const web3formsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const Contact = () => {
  const { userData, isUserLoading, theme, toggleTheme } = useDashboardContext();
  const navigate = useNavigate();
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const user = userData?.user || null;

  // Update form data when user data changes
  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResult("");

    // Validation for Web3Forms access key
    if (!web3formsAccessKey || web3formsAccessKey === "undefined") {
      console.error("Web3Forms access key is not configured");
      setResult("Configuration error. Please contact the administrator.");
      setLoading(false);
      return;
    }

    const submitData = new FormData();
    submitData.append("access_key", web3formsAccessKey);
    submitData.append(
      "name",
      user
        ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
        : formData.name
    );
    submitData.append("email", user ? user.email : formData.email);
    submitData.append("message", formData.message);
    submitData.append("subject", "New Contact Form Submission from SaifURL");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submitData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully! We'll get back to you soon.");
        setFormData({
          name: user
            ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
            : "",
          email: user ? user.email : "",
          message: "",
        });
      } else {
        console.error("Web3Forms error:", data);
        setResult("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setResult("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900"
          : "bg-gradient-to-br from-blue-700 via-white to-red-600"
      } transition-colors duration-300`}
    >
      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Header Section - Matching Dashboard Style */}
        <div
          className={`flex flex-col md:flex-row justify-between items-center mb-6 ${
            theme === "dark"
              ? "bg-gradient-to-r from-gray-800 to-blue-900"
              : "bg-gradient-to-r from-blue-600 to-red-500"
          } rounded-xl shadow-xl p-6 border-4 border-white`}
        >
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-1 drop-shadow">
              Contact Us
            </h1>
            <p className="text-xl text-white">
              {user ? (
                <>
                  Get in touch,{" "}
                  <span className="font-bold text-yellow-200">
                    {user.firstName} {user.lastName ? user.lastName : ""}
                  </span>
                </>
              ) : (
                "We'd love to hear from you!"
              )}
            </p>
          </div>

          <div className="flex gap-3 items-center mt-4 md:mt-0">
            {/* Status Badge */}
            <a
              href="https://status.saifabdelrazek.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block"
              title="View detailed service status"
            >
              <img
                src={
                  theme === "dark"
                    ? "https://uptime.saifabdelrazek.com/api/badge/3/status?upColor=%2360a5fa&downColor=%23f87171&pendingColor=%23fbbf24&maintenanceColor=%234ade80&style=for-the-badge"
                    : "https://uptime.saifabdelrazek.com/api/badge/3/status?upColor=%233b82f6&downColor=%23ef4444&pendingColor=%23f59e42&maintenanceColor=%2322c55e&style=for-the-badge"
                }
                alt="Service Status"
                className="h-6 mr-2 drop-shadow-lg rounded-full border border-white"
              />
            </a>

            {/* Navigation Buttons */}
            {isUserLoading ? (
              <div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full"></div>
            ) : user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`px-4 py-2 rounded-lg font-semibold shadow transition ${
                    theme === "dark"
                      ? "bg-blue-900 text-white hover:bg-blue-700"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className={`px-4 py-2 rounded-lg font-semibold shadow transition ${
                    theme === "dark"
                      ? "bg-blue-900 text-white hover:bg-blue-700"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className={`px-4 py-2 rounded-lg font-semibold shadow transition ${
                    theme === "dark"
                      ? "bg-blue-900 text-white hover:bg-blue-700"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className={`px-4 py-2 rounded-lg font-semibold shadow transition ${
                    theme === "dark"
                      ? "bg-red-800 text-white hover:bg-red-700"
                      : "bg-red-100 text-red-700 hover:bg-red-200"
                  }`}
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`px-4 py-2 rounded-lg font-semibold shadow transition ${
                theme === "dark"
                  ? "bg-blue-700 text-white hover:bg-blue-600"
                  : "bg-white text-blue-700 hover:bg-blue-100"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </div>

        {/* Contact Form - Matching Dashboard Form Style */}
        <div
          className={`w-full mx-auto rounded-xl shadow-lg p-1 ${
            theme === "dark"
              ? "bg-gradient-to-br from-blue-900 via-gray-900 to-gray-800"
              : "bg-gradient-to-br from-blue-50 via-white to-red-100"
          }`}
        >
          <form
            onSubmit={onSubmit}
            className={
              "space-y-6 text-lg rounded-xl p-8 " +
              (theme === "dark"
                ? "bg-gray-900 text-blue-100"
                : "bg-white text-blue-900")
            }
          >
            {/* Name Field */}
            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
              <label
                className={
                  "font-semibold w-40 inline-block " +
                  (theme === "dark" ? "text-blue-100" : "text-blue-900")
                }
                htmlFor="name"
              >
                Full Name:
              </label>
              {user ? (
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={`${user.firstName || ""} ${
                    user.lastName || ""
                  }`.trim()}
                  readOnly
                  className={`flex-1 px-3 py-2 border rounded transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gray-800/50 border-gray-700 text-gray-400 cursor-not-allowed opacity-60"
                      : "bg-gray-100/70 border-gray-300 text-gray-500 cursor-not-allowed opacity-75"
                  }`}
                />
              ) : (
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                    theme === "dark"
                      ? "bg-gray-800 text-blue-100 border-blue-900 focus:ring-blue-600"
                      : "bg-white text-blue-900 border-blue-200 focus:ring-blue-400"
                  }`}
                  placeholder="Enter your full name"
                />
              )}
            </div>

            {/* Email Field - Matching Profile Style */}
            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
              <label
                className={
                  "font-semibold w-40 inline-block " +
                  (theme === "dark" ? "text-blue-100" : "text-blue-900")
                }
                htmlFor="email"
              >
                Email Address:
              </label>
              {user ? (
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  readOnly
                  className={`flex-1 px-3 py-2 border rounded transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gray-800/50 border-gray-700 text-gray-400 cursor-not-allowed opacity-60"
                      : "bg-gray-100/70 border-gray-300 text-gray-500 cursor-not-allowed opacity-75"
                  }`}
                />
              ) : (
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                    theme === "dark"
                      ? "bg-gray-800 text-blue-100 border-blue-900 focus:ring-blue-600"
                      : "bg-white text-blue-900 border-blue-200 focus:ring-blue-400"
                  }`}
                  placeholder="Enter your email address"
                />
              )}
            </div>

            {/* Message Field */}
            <div className="flex flex-col md:flex-row md:gap-4">
              <label
                className={
                  "font-semibold w-40 inline-block mb-2 md:mb-0 " +
                  (theme === "dark" ? "text-blue-100" : "text-blue-900")
                }
                htmlFor="message"
              >
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="6"
                className={`flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 resize-none ${
                  theme === "dark"
                    ? "bg-gray-800 text-blue-100 border-blue-900 focus:ring-blue-600"
                    : "bg-white text-blue-900 border-blue-200 focus:ring-blue-400"
                }`}
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>

            {/* User Info Display (if logged in) */}
            {user && (
              <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                <span className="font-semibold w-40 inline-block">
                  Account Status:
                </span>
                <div className="flex items-center space-x-2">
                  {user.verified ? (
                    <>
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-green-600 font-medium">
                        Verified Account
                      </span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-yellow-600 font-medium">
                        Unverified Account
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Result Message */}
            {result && (
              <div
                className={`p-4 rounded-lg text-center font-medium ${
                  result.includes("successfully")
                    ? "text-green-600 bg-green-100 border border-green-200"
                    : "text-red-600 bg-red-100 border border-red-200"
                }`}
              >
                {result}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-300 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : theme === "dark"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Additional Contact Info */}
        <div
          className={`mt-8 rounded-xl shadow-lg p-6 ${
            theme === "dark"
              ? "bg-gradient-to-br from-blue-900 via-gray-900 to-gray-800 text-blue-100"
              : "bg-gradient-to-br from-blue-50 via-white to-red-100 text-blue-900"
          }`}
        >
          <h3 className="text-xl font-bold mb-4 text-center">
            Other Ways to Reach Us
          </h3>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <a
              href="https://github.com/saifabdelrazek011"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-2 hover:scale-105 transition-transform ${
                theme === "dark"
                  ? "text-blue-300 hover:text-blue-400"
                  : "text-blue-600 hover:text-blue-700"
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </a>
            <a
              href="https://status.saifabdelrazek.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-2 hover:scale-105 transition-transform ${
                theme === "dark"
                  ? "text-blue-300 hover:text-blue-400"
                  : "text-blue-600 hover:text-blue-700"
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span>Service Status</span>
            </a>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex flex-wrap gap-4">
          {user ? (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-300 ${
                  theme === "dark"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => navigate("/profile")}
                className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-300 ${
                  theme === "dark"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                View Profile
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/")}
                className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-300 ${
                  theme === "dark"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                Back to Home
              </button>
              <button
                onClick={() => navigate("/bots")}
                className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-300 ${
                  theme === "dark"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                Try Our Bots
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
