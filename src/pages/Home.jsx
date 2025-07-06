import React from "react";
import { Link } from "react-router-dom";
import { useDashboardContext } from "../contexts/DashboardContext";
import SignoutBtn from "../components/SignoutBtn";

const Home = () => {
  const { userData, isUserLoading, theme, toggleTheme } = useDashboardContext();

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900"
          : "bg-gradient-to-br from-blue-100 via-white to-red-100"
      } flex flex-col transition-colors duration-300`}
    >
      {/* Header */}
      <header
        className={`flex justify-between items-center px-8 py-6 ${
          theme === "dark"
            ? "bg-gray-800/80 shadow-lg"
            : "bg-white/80 shadow-md"
        } transition-colors duration-300`}
      >
        <h1
          className={`text-3xl font-bold tracking-tight ${
            theme === "dark" ? "text-blue-300" : "text-blue-700"
          }`}
        >
          Saif
          <span className={theme === "dark" ? "text-red-400" : "text-red-600"}>
            URL
          </span>
        </h1>
        <div className="flex items-center space-x-4">
          {isUserLoading ? (
            // Show spinner
            <span
              className={`loader inline-block w-6 h-6 border-4 ${
                theme === "dark"
                  ? "border-blue-400 border-t-transparent"
                  : "border-blue-500 border-t-transparent"
              } rounded-full animate-spin`}
            ></span>
          ) : userData ? (
            <>
              <SignoutBtn />
              <Link
                to="/dashboard"
                className={`px-5 py-2 rounded-lg font-semibold transition ${
                  theme === "dark"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className={`px-5 py-2 rounded-lg font-semibold transition ${
                  theme === "dark"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`px-5 py-2 rounded-lg font-semibold transition ${
                  theme === "dark"
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                Signup
              </Link>
            </>
          )}
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-lg font-semibold shadow transition ${
              theme === "dark"
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-4">
        <a
          href="https://status.saifabdelrazek.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={
              theme === "dark"
                ? "https://uptime.saifabdelrazek.com/api/badge/3/status?upColor=%2360a5fa&downColor=%23f87171&pendingColor=%23fbbf24&maintenanceColor=%234ade80&style=for-the-badge"
                : "https://uptime.saifabdelrazek.com/api/badge/3/status?upColor=%233b82f6&downColor=%23ef4444&pendingColor=%23f59e42&maintenanceColor=%2322c55e&style=for-the-badge"
            }
            alt="Service Status"
            className="h-6 mb-4"
          />
        </a>
        <h2
          className={`text-4xl md:text-5xl font-extrabold mb-4 ${
            theme === "dark" ? "text-blue-200" : "text-blue-800"
          }`}
        >
          Shorten your links with{" "}
          <span className={theme === "dark" ? "text-red-400" : "text-red-600"}>
            SaifURL
          </span>
        </h2>
        <p
          className={`text-lg md:text-xl mb-8 max-w-xl ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          SaifURL is a simple, fast, and secure URL shortener. Make your links
          easy to share and manage.
        </p>
        <Link
          to={userData ? "/dashboard" : "/signup"}
          className={`inline-block px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition ${
            theme === "dark"
              ? "bg-gradient-to-r from-blue-600 to-red-600 text-white"
              : "bg-gradient-to-r from-blue-600 to-red-500 text-white"
          }`}
        >
          Get Started
        </Link>

        <a
          href="https://github.com/saifabdelrazek011/saifurl"
          className={`mt-6 transition ${
            theme === "dark"
              ? "text-gray-400 hover:text-blue-400"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          Star the project on GitHub
        </a>
        <div
          className={`mt-8 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <p>
            Made with ❤️ by{" "}
            <a
              href="https://github.com/saifabdelrazek011"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className={`hover:underline ${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              }`}
            >
              Saif Abdelrazek
            </a>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`text-center py-4 text-sm ${
          theme === "dark" ? "text-gray-500" : "text-gray-500"
        }`}
      >
        &copy; {new Date().getFullYear()} SaifURL. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
