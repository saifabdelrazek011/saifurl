import { useState, useEffect } from "react";
import { useDashboardContext } from "../contexts/DashboardContext.jsx";
import Shorturls from "./ShortUrls.jsx";
import { useNavigate, Link } from "react-router-dom";
import { useShorturlsContext } from "../contexts/ShorturlsContext.jsx";
import SignoutBtn from "../components/SignoutBtn.jsx";

function Dashboard() {
  const navigate = useNavigate();
  const { userData, theme, toggleTheme, isUserLoading } = useDashboardContext();
  const { shortDomain, setShortDomain } = useShorturlsContext();
  const [user, setUser] = useState(userData?.user || null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!userData && !isUserLoading) {
      navigate("/signin");
      return;
    } else {
      setUser(userData.user);
    }
  }, [userData, navigate, isUserLoading, user]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900"
          : "bg-gradient-to-br from-blue-700 via-white to-red-600"
      } transition-colors duration-300`}
    >
      <div className="max-w-5xl mx-auto py-6 md:py-12 px-4">
        <div
          className={`mb-6 ${
            theme === "dark"
              ? "bg-gradient-to-r from-gray-800 to-blue-900"
              : "bg-gradient-to-r from-blue-600 to-red-500"
          } rounded-xl shadow-xl p-4 md:p-6 border-4 border-white`}
        >
          {/* Mobile Header */}
          <div className="flex justify-between items-center md:hidden">
            <div className="flex-1">
              <h1 className="text-2xl font-extrabold text-white drop-shadow">
                Dashboard
              </h1>
              <p className="text-sm text-white">
                Welcome,{" "}
                <span className="font-bold text-yellow-200">
                  {user ? `${user?.firstName}` : ""}
                </span>
              </p>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-extrabold text-white mb-1 drop-shadow">
                Dashboard
              </h1>
              <p className="text-xl text-white">
                Welcome,{" "}
                <span className="font-bold text-yellow-200">
                  {user
                    ? `${user?.firstName} ${
                        user?.lastName ? user?.lastName : ""
                      }`
                    : ""}
                </span>
              </p>
            </div>

            <div className="flex gap-3 items-center">
              {/* Status Badge */}
              <a
                href="https://status.saifabdelrazek.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:block"
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
              <Link
                to="/developer"
                className="px-4 py-2 rounded-lg font-semibold shadow transition bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-700"
                aria-label="Developer"
              >
                Developer
              </Link>
              <Link
                to="/profile"
                className="px-4 py-2 rounded-lg font-semibold shadow transition bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-700"
                aria-label="Profile"
              >
                Profile
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2 rounded-lg font-semibold shadow transition bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-700"
                aria-label="Contact"
              >
                Contact
              </Link>
              <Link
                to="/bots"
                className="px-4 py-2 rounded-lg font-semibold shadow transition bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-700"
                aria-label="Bots"
              >
                Bots
              </Link>
              <button
                onClick={toggleTheme}
                className="px-4 py-2 rounded-lg font-semibold shadow transition bg-white text-blue-700 hover:bg-blue-100 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-600"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? "🌙" : "☀️"}
              </button>
              <SignoutBtn />
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-white/20">
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Link
                  to="/developer"
                  className={`px-3 py-2 rounded-lg font-semibold shadow transition text-center text-sm ${
                    theme === "dark"
                      ? "bg-blue-900 text-white hover:bg-blue-700"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Developer
                </Link>
                <Link
                  to="/profile"
                  className={`px-3 py-2 rounded-lg font-semibold shadow transition text-center text-sm ${
                    theme === "dark"
                      ? "bg-blue-900 text-white hover:bg-blue-700"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/contact"
                  className={`px-3 py-2 rounded-lg font-semibold shadow transition text-center text-sm ${
                    theme === "dark"
                      ? "bg-blue-900 text-white hover:bg-blue-700"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  to="/bots"
                  className={`px-3 py-2 rounded-lg font-semibold shadow transition text-center text-sm ${
                    theme === "dark"
                      ? "bg-blue-900 text-white hover:bg-blue-700"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Bots
                </Link>
              </div>

              {/* Mobile Actions Row */}
              <div className="flex gap-2 items-center justify-between">
                <button
                  onClick={toggleTheme}
                  className={`flex-1 px-3 py-2 rounded-lg font-semibold shadow transition text-sm ${
                    theme === "dark"
                      ? "bg-blue-700 text-white hover:bg-blue-600"
                      : "bg-white text-blue-700 hover:bg-blue-100"
                  }`}
                >
                  {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
                </button>

                {/* Status Badge for Mobile */}
                <a
                  href="https://status.saifabdelrazek.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0"
                  title="View service status"
                >
                  <img
                    src={
                      theme === "dark"
                        ? "https://uptime.saifabdelrazek.com/api/badge/3/status?upColor=%2360a5fa&downColor=%23f87171&pendingColor=%23fbbf24&maintenanceColor=%234ade80&style=for-the-badge"
                        : "https://uptime.saifabdelrazek.com/api/badge/3/status?upColor=%233b82f6&downColor=%23ef4444&pendingColor=%23f59e42&maintenanceColor=%2322c55e&style=for-the-badge"
                    }
                    alt="Service Status"
                    className="h-6 drop-shadow-lg rounded-full border border-white"
                  />
                </a>
              </div>

              {/* Sign Out Button for Mobile */}
              <div className="mt-3 pt-3 border-t border-white/20">
                <div className="w-full">
                  <SignoutBtn />
                </div>
              </div>
            </div>
          )}
        </div>

        <Shorturls />
      </div>

      {/* Improved Short URL domains section with theme */}
      <section
        className={`max-w-5xl mx-auto px-4 py-8 mt-8 rounded-xl shadow-lg flex flex-col items-center ${
          theme === "dark"
            ? "bg-gradient-to-r from-blue-900 via-gray-900 to-red-900"
            : "bg-gradient-to-r from-blue-600 to-red-500"
        }`}
      >
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4 drop-shadow text-center">
          Available Short Domains
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
          {[
            { domain: "sa.died.pw", url: "https://sa.died.pw" },
            { domain: "sa.ix.tc", url: "https://sa.ix.tc" },
          ].map(({ domain }) => (
            <button
              className={`transition text-base md:text-lg font-semibold px-4 md:px-6 py-3 rounded-lg shadow border-2 bg-white/90 hover:bg-white text-blue-700 border-blue-200 hover:border-red-400 dark:bg-gray-900 dark:hover:bg-blue-900 dark:text-blue-200 dark:border-blue-800 dark:hover:border-red-700 ${
                shortDomain === domain
                  ? "border-red-500 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 dark:border-red-500"
                  : "border-blue-300 hover:border-red-500"
              }`}
              key={domain}
              onClick={() => setShortDomain(domain)}
            >
              {domain}
            </button>
          ))}
        </div>
      </section>

      {/* Improved Footer with theme */}
      <footer
        className={`text-center text-sm mt-16 py-6 rounded-t-xl shadow-inner ${
          theme === "dark"
            ? "bg-gradient-to-r from-blue-950/90 to-red-950/90 text-gray-400"
            : "bg-gradient-to-r from-blue-900/80 to-red-900/80 text-gray-300"
        }`}
      >
        <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
          <span>
            Made with <span className="text-red-400">❤️</span> by{" "}
            <a
              href="https://saifabdelrazek.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:underline font-semibold ${
                theme === "dark"
                  ? "text-blue-300 hover:text-red-300"
                  : "text-blue-300 hover:text-red-400"
              }`}
            >
              Saif Abdelrazek
            </a>
          </span>
          <span className="hidden md:inline-block mx-2">|</span>
          <a
            href="https://github.com/saifabdelrazek011"
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:underline font-semibold flex items-center gap-1 ${
              theme === "dark"
                ? "text-blue-300 hover:text-red-300"
                : "text-blue-300 hover:text-red-400"
            }`}
          >
            <svg
              className="w-4 h-4 inline-block"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 2.92-.39c.99.01 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.08.79 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
            </svg>
            GitHub
          </a>
        </div>
        <p className="mt-2">
          © {new Date().getFullYear()} Saif Abdelrazek. All rights reserved.
        </p>
        <p className="mt-1">
          <Link
            to="/contact"
            className={`hover:underline ${
              theme === "dark"
                ? "text-blue-300 hover:text-red-300"
                : "text-blue-300 hover:text-red-400"
            }`}
          >
            Contact us
          </Link>
        </p>
      </footer>
    </div>
  );
}

export default Dashboard;
