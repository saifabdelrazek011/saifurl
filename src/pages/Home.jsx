import React from "react";
import { Link } from "react-router-dom";
import { useDashboardContext } from "../contexts/DashboardContext";
import SignoutBtn from "../components/SignoutBtn";

const Home = () => {
  const { userData, isUserLoading, theme, toggleTheme } = useDashboardContext();

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-gradient-to-br from-blue-100 via-white to-red-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 bg-white/80 shadow-md dark:bg-gray-800/80 dark:shadow-lg transition-colors duration-300">
        <h1 className="text-3xl font-bold tracking-tight text-blue-700 dark:text-blue-300">
          Saif<span className="text-red-600 dark:text-red-400">URL</span>
        </h1>
        <div className="flex items-center space-x-4">
          {isUserLoading ? (
            // Show spinner
            <span className="loader inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin dark:border-blue-400 dark:border-t-transparent"></span>
          ) : userData ? (
            <>
              <SignoutBtn />
              <Link to="/dashboard" className="px-5 py-2 rounded-lg font-semibold transition bg-blue-600 text-white hover:bg-blue-700">
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link to="/signin" className="px-5 py-2 rounded-lg font-semibold transition bg-blue-600 text-white hover:bg-blue-700">
                Login
              </Link>
              <Link to="/signup" className="px-5 py-2 rounded-lg font-semibold transition bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700">
                Signup
              </Link>
            </>
          )}
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg font-semibold shadow transition bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <a href="https://status.saifabdelrazek.com" target="_blank" rel="noopener noreferrer">
          <img
            src={theme === "dark"
              ? "https://uptime.saifabdelrazek.com/api/badge/3/status?upColor=%2360a5fa&downColor=%23f87171&pendingColor=%23fbbf24&maintenanceColor=%234ade80&style=for-the-badge"
              : "https://uptime.saifabdelrazek.com/api/badge/3/status?upColor=%233b82f6&downColor=%23ef4444&pendingColor=%23f59e42&maintenanceColor=%2322c55e&style=for-the-badge"
            }
            alt="Service Status"
            className="h-6 mb-4"
          />
        </a>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-800 dark:text-blue-200">
          Shorten your links with <span className="text-red-600 dark:text-red-400">SaifURL</span>
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-xl text-gray-700 dark:text-gray-300">
          SaifURL is a simple, fast, and secure URL shortener. Make your links easy to share and manage.
        </p>
        <Link
          to={userData ? "/dashboard" : "/signup"}
          className="inline-block px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition bg-gradient-to-r from-blue-600 to-red-500 text-white dark:from-blue-600 dark:to-red-600"
        >
          Get Started
        </Link>

        <a
          href="https://github.com/saifabdelrazek011/saifurl"
          className="mt-6 transition text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
        >
          Star the project on GitHub
        </a>
        <div className="mt-8 text-gray-600 dark:text-gray-400">
          <p>
            Made with  by <a href="https://github.com/saifabdelrazek011" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="hover:underline text-blue-600 dark:text-blue-400">Saif Abdelrazek</a>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} SaifURL. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
