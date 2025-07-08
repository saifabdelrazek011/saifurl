import { Link } from "react-router-dom";
import { useDashboardContext } from "../contexts/DashboardContext";
import SignoutBtn from "../components/SignoutBtn";

const Bots = () => {
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
        <Link
          to="/"
          className={`text-3xl font-bold tracking-tight ${
            theme === "dark" ? "text-blue-300" : "text-blue-700"
          }`}
        >
          Saif
          <span className={theme === "dark" ? "text-red-400" : "text-red-600"}>
            URL
          </span>
        </Link>
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
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1
              className={`text-4xl md:text-5xl font-extrabold mb-4 ${
                theme === "dark" ? "text-blue-200" : "text-blue-800"
              }`}
            >
              SaifURL{" "}
              <span
                className={theme === "dark" ? "text-red-400" : "text-red-600"}
              >
                Bots
              </span>
            </h1>
            <p
              className={`text-lg max-w-2xl mx-auto ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Use SaifURL directly from your favorite messaging platforms.
              Shorten URLs instantly without leaving your chat!
            </p>
          </div>

          {/* Service Status */}
          <div className="text-center mb-8">
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

          {/* Bots Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Telegram Bot Card - Now Working */}
            <div
              className={`backdrop-blur-sm rounded-2xl shadow-lg p-8 border ${
                theme === "dark"
                  ? "bg-gray-800/80 border-gray-700/20"
                  : "bg-white/80 border-white/20"
              }`}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </div>
                <h3
                  className={`text-xl font-bold mb-3 ${
                    theme === "dark" ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Telegram Bot
                </h3>
                <p
                  className={`mb-6 text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Shorten URLs directly in Telegram chats and channels. Fast and
                  reliable!
                </p>
                <div className="space-y-3">
                  <a
                    href="https://t.me/saifurl_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full py-3 px-6 rounded-lg font-semibold transition duration-200 text-center ${
                      theme === "dark"
                        ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]"
                        : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]"
                    }`}
                  >
                    Start Bot
                  </a>
                  <div className="flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <p
                      className={`text-xs ${
                        theme === "dark" ? "text-green-400" : "text-green-600"
                      }`}
                    >
                      Active & Working
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Coming Soon - Discord Bot */}
            <div
              className={`backdrop-blur-sm rounded-2xl shadow-lg p-8 border opacity-75 ${
                theme === "dark"
                  ? "bg-gray-800/60 border-gray-700/20"
                  : "bg-white/60 border-white/20"
              }`}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </div>
                <h3
                  className={`text-xl font-bold mb-3 ${
                    theme === "dark" ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Discord Bot
                </h3>
                <p
                  className={`mb-6 text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Coming soon! Shorten URLs in Discord servers and DMs.
                </p>
                <div className="space-y-3">
                  <button
                    disabled
                    className="block w-full py-3 px-6 rounded-lg bg-gray-400 text-white font-semibold cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                  <p
                    className={`text-xs ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    In Development
                  </p>
                </div>
              </div>
            </div>

            {/* Coming Soon - Slack Bot */}
            <div
              className={`backdrop-blur-sm rounded-2xl shadow-lg p-8 border opacity-75 ${
                theme === "dark"
                  ? "bg-gray-800/60 border-gray-700/20"
                  : "bg-white/60 border-white/20"
              }`}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6.194 6.194A3.75 3.75 0 015.25 9v6a3.75 3.75 0 001.194 2.75L8.25 15.75V8.25l-2.056-2.056zM9.75 8.25v7.5l1.5 1.5h3l1.5-1.5v-7.5l-1.5-1.5h-3l-1.5 1.5zm8 0v7.5l2.056 2.056A3.75 3.75 0 0120.75 15V9a3.75 3.75 0 00-1.194-2.75L17.75 8.25z" />
                  </svg>
                </div>
                <h3
                  className={`text-xl font-bold mb-3 ${
                    theme === "dark" ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Slack Bot
                </h3>
                <p
                  className={`mb-6 text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Coming soon! Shorten URLs directly in Slack channels and DMs.
                </p>
                <div className="space-y-3">
                  <button
                    disabled
                    className="block w-full py-3 px-6 rounded-lg bg-gray-400 text-white font-semibold cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                  <p
                    className={`text-xs ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    In Development
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How to Use Section - Updated for Telegram */}
          <div
            className={`backdrop-blur-sm rounded-2xl shadow-xl p-8 border mb-8 ${
              theme === "dark"
                ? "bg-gray-800/80 border-gray-700/20"
                : "bg-white/80 border-white/20"
            }`}
          >
            <h2
              className={`text-2xl font-bold mb-6 text-center ${
                theme === "dark" ? "text-gray-100" : "text-gray-800"
              }`}
            >
              How to Use SaifURL Telegram Bot
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    theme === "dark" ? "bg-blue-900/50" : "bg-blue-100"
                  }`}
                >
                  <span
                    className={`font-bold text-lg ${
                      theme === "dark" ? "text-blue-300" : "text-blue-600"
                    }`}
                  >
                    1
                  </span>
                </div>
                <h3
                  className={`font-semibold mb-2 ${
                    theme === "dark" ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Start the Bot
                </h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Click "Start Bot" above or search for @saifurl_bot in Telegram
                </p>
              </div>
              <div className="text-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    theme === "dark" ? "bg-blue-900/50" : "bg-blue-100"
                  }`}
                >
                  <span
                    className={`font-bold text-lg ${
                      theme === "dark" ? "text-blue-300" : "text-blue-600"
                    }`}
                  >
                    2
                  </span>
                </div>
                <h3
                  className={`font-semibold mb-2 ${
                    theme === "dark" ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Send Your URL
                </h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Simply send any long URL to the bot in a private message
                </p>
              </div>
              <div className="text-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    theme === "dark" ? "bg-blue-900/50" : "bg-blue-100"
                  }`}
                >
                  <span
                    className={`font-bold text-lg ${
                      theme === "dark" ? "text-blue-300" : "text-blue-600"
                    }`}
                  >
                    3
                  </span>
                </div>
                <h3
                  className={`font-semibold mb-2 ${
                    theme === "dark" ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Get Short URL
                </h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Receive your shortened URL instantly and share it anywhere!
                </p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className={`backdrop-blur-sm rounded-2xl shadow-xl p-6 border ${
                theme === "dark"
                  ? "bg-gray-800/80 border-gray-700/20"
                  : "bg-white/80 border-white/20"
              }`}
            >
              <h3
                className={`text-xl font-bold mb-4 ${
                  theme === "dark" ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Telegram Bot Features
              </h3>
              <ul
                className={`space-y-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Instant URL shortening
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Works in private chats
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  No registration required
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Fast and reliable service
                </li>
              </ul>
            </div>

            <div
              className={`backdrop-blur-sm rounded-2xl shadow-xl p-6 border ${
                theme === "dark"
                  ? "bg-gray-800/80 border-gray-700/20"
                  : "bg-white/80 border-white/20"
              }`}
            >
              <h3
                className={`text-xl font-bold mb-4 ${
                  theme === "dark" ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Coming Soon: More Platforms
              </h3>
              <ul
                className={`space-y-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-yellow-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Discord server integration
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-yellow-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Slack workspace apps
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-yellow-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Advanced analytics
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-yellow-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Custom domain support
                </li>
              </ul>
            </div>
          </div>

          {/* Development Status Notice */}
          <div
            className={`mt-8 backdrop-blur-sm rounded-2xl shadow-xl p-6 border text-center ${
              theme === "dark"
                ? "bg-green-900/30 border-green-700/50"
                : "bg-green-50/80 border-green-200/50"
            }`}
          >
            <div className="flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-green-500 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <h3
                className={`text-xl font-bold ${
                  theme === "dark" ? "text-green-300" : "text-green-800"
                }`}
              >
                Telegram Bot Now Live!
              </h3>
            </div>
            <p
              className={`${
                theme === "dark" ? "text-green-200" : "text-green-700"
              }`}
            >
              🎉 Our Telegram bot is now active and ready to use! Discord and
              Slack bots are still in development. Follow our{" "}
              <a
                href="https://status.saifabdelrazek.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline font-semibold"
              >
                status page
              </a>{" "}
              for updates on other platforms.
            </p>
          </div>
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

export default Bots;
