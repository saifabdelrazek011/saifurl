import React, { useEffect, useState } from "react";
import { useDashboardContext } from "../contexts/DashboardContext";
import { Link } from "react-router-dom";

const Developer = () => {
  const { userData, theme, apiUrl, toggleTheme } = useDashboardContext();
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showKey, setShowKey] = useState(false);

  // Fetch API key on mount
  useEffect(() => {
    if (!userData) return;
    setLoading(true);
    fetch(`${apiUrl}/users/apikey`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
          setApiKey(null);
          return;
        }
        const data = await res.json();
        setApiKey(data.apiKey || null);
      })
      .catch(() => setApiKey(null))
      .finally(() => setLoading(false));
  }, [userData, apiUrl]);

  // Create API key
  const handleCreate = async () => {
    setActionLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const res = await fetch(`${apiUrl}/users/apikey`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create API key.");
      }
      const data = await res.json();
      setApiKey(data.apiKey);
      setSuccessMsg("API key created successfully!");
    } catch (e) {
      setErrorMsg(e.message || "Error creating API key.");
    } finally {
      setActionLoading(false);
    }
  };

  // Update (regenerate) API key
  const handleUpdate = async () => {
    if (
      !window.confirm(
        "Are you sure you want to regenerate your API key? Your old key will stop working."
      )
    )
      return;
    setActionLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const res = await fetch(`${apiUrl}/users/apikey`, {
        method: "PATCH",
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to regenerate API key.");
      }
      const data = await res.json();
      setApiKey(data.apiKey);
      setSuccessMsg("API key regenerated successfully!");
    } catch (e) {
      setErrorMsg(e.message || "Error regenerating API key.");
    } finally {
      setActionLoading(false);
    }
  };

  // Delete API key
  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your API key? You will not be able to use the API until you create a new one."
      )
    )
      return;
    setActionLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const res = await fetch(`${apiUrl}/users/apikey`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete API key.");
      }
      setApiKey(null);
      setSuccessMsg("API key deleted successfully!");
    } catch (e) {
      setErrorMsg(e.message || "Error deleting API key.");
    } finally {
      setActionLoading(false);
    }
  };

  // Copy API key
  const handleCopy = () => {
    if (!apiKey) return;
    navigator.clipboard.writeText(apiKey);
    setSuccessMsg("API key copied to clipboard!");
    setTimeout(() => setSuccessMsg(""), 1500);
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900"
          : "bg-gradient-to-br from-blue-700 via-white to-red-600"
      } transition-colors duration-300`}
    >
      <div className="max-w-3xl mx-auto py-12 px-4">
        {/* Header */}
        <div
          className={`flex flex-col md:flex-row justify-between items-center mb-8 ${
            theme === "dark"
              ? "bg-gradient-to-r from-gray-800 to-blue-900"
              : "bg-gradient-to-r from-blue-600 to-red-500"
          } rounded-xl shadow-xl p-6 border-4 border-white`}
        >
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-1 drop-shadow">
              Developer API
            </h1>
            <p className="text-xl text-white">
              Manage your API key to access and create short URLs
              programmatically.
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className={`mt-4 md:mt-0 px-4 py-2 rounded-lg font-semibold shadow transition ${
              theme === "dark"
                ? "bg-blue-700 text-white hover:bg-blue-600"
                : "bg-white text-blue-700 hover:bg-blue-100"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>

        {/* API Key Section */}
        <div
          className={`rounded-xl shadow-lg p-8 mb-8 ${
            theme === "dark"
              ? "bg-gradient-to-br from-blue-900 via-gray-900 to-gray-800 text-blue-100"
              : "bg-gradient-to-br from-blue-50 via-white to-red-100 text-blue-900"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">Your API Key</h2>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : apiKey ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <input
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  readOnly
                  className={`flex-1 px-3 py-2 rounded-lg border font-mono text-sm ${
                    theme === "dark"
                      ? "bg-gray-800 text-blue-100 border-blue-900"
                      : "bg-white text-blue-900 border-blue-200"
                  }`}
                />
                <button
                  onClick={() => setShowKey((v) => !v)}
                  className={`px-3 py-2 rounded-lg font-semibold shadow transition ${
                    theme === "dark"
                      ? "bg-blue-700 text-white hover:bg-blue-600"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  {showKey ? "Hide" : "Show"}
                </button>
                <button
                  onClick={handleCopy}
                  className={`px-3 py-2 rounded-lg font-semibold shadow transition ${
                    theme === "dark"
                      ? "bg-blue-700 text-white hover:bg-blue-600"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  Copy
                </button>
              </div>
              <div className="flex flex-wrap gap-3 mt-2">
                <button
                  onClick={handleUpdate}
                  disabled={actionLoading}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    theme === "dark"
                      ? "bg-yellow-600 text-white hover:bg-yellow-700"
                      : "bg-yellow-400 text-white hover:bg-yellow-500"
                  }`}
                >
                  {actionLoading ? "Regenerating..." : "Regenerate"}
                </button>
                <button
                  onClick={handleDelete}
                  disabled={actionLoading}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    theme === "dark"
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  {actionLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="text-gray-500 mb-2">
                You don't have an API key yet.
              </div>
              <button
                onClick={handleCreate}
                disabled={actionLoading}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  theme === "dark"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {actionLoading ? "Creating..." : "Create API Key"}
              </button>
            </div>
          )}
          {successMsg && (
            <div className="text-green-600 font-semibold mt-4">
              {successMsg}
            </div>
          )}
          {errorMsg && (
            <div className="text-red-600 font-semibold mt-4">{errorMsg}</div>
          )}
        </div>
        {/* API Usage Section */}
        <div
          className={`rounded-xl shadow-lg p-8 mb-3 ${
            theme === "dark"
              ? "bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-blue-100"
              : "bg-gradient-to-br from-blue-50 via-white to-red-100 text-blue-900"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">API Usage</h2>
          <p className="mb-2">
            Use your API key as a <span className="font-mono">apiKey</span>{" "}
            query parameter:
          </p>
          <pre
            className={`rounded p-4 overflow-x-auto text-sm ${
              theme === "dark"
                ? "bg-gray-800 text-blue-100"
                : "bg-gray-100 text-blue-900"
            }`}
          >
            {`?apiKey=YOUR_API_KEY`}
          </pre>
          <p className="mt-4 mb-2 font-semibold">Example: Create a short URL</p>
          <pre
            className={`rounded p-4 overflow-x-auto text-sm ${
              theme === "dark"
                ? "bg-gray-800 text-blue-100"
                : "bg-gray-100 text-blue-900"
            }`}
          >
            {`POST ${apiUrl}/shorturls?apiKey=YOUR_API_KEY
Content-Type: application/json

Body:
{
  "fullUrl": "https://example.com",
  "shortUrl": "myalias"
}
`}
          </pre>
          <p className="mt-4 mb-2 font-semibold">
            Example: Get your short URLs
          </p>
          <pre
            className={`rounded p-4 overflow-x-auto text-sm ${
              theme === "dark"
                ? "bg-gray-800 text-blue-100"
                : "bg-gray-100 text-blue-900"
            }`}
          >
            {`GET ${apiUrl}/shorturls?apiKey=YOUR_API_KEY
            
Response:
{
"success": true, 
"message": "Your short URLs fetched successfully." shortUrls:
[{
"_id": "your_short_url_id",
"full": "your_full_url",
"short": "your_short_url",
]}
"clicks": "number_of_clicks",
"createdAt": "date_created",
"updatedAt": "date_updated"
},...
]}`}
          </pre>
          <p className="mt-4 mb-2 font-semibold">
            Example: Get a specific short URL
          </p>
          <pre
            className={`rounded p-4 overflow-x-auto text-sm ${
              theme === "dark"
                ? "bg-gray-800 text-blue-100"
                : "bg-gray-100 text-blue-900"
            }`}
          >
            {`GET ${apiUrl}/shorturls/YOUR_SHORT_URL_ID?apiKey=YOUR_API_KEY
Response:
{
  "success": true,
  "message": "Short URL fetched successfully.",
  "shortUrl": {
    "_id": "your_short_url_id",
    "full": "your_full_url",
    "short": "your_short_url",
    "clicks": "number_of_clicks",
    "createdAt": "date_created",
    "updatedAt": "date_updated"
  }
}`}
          </pre>
          <p className="mt-4 mb-2 font-semibold">Example: Update a short URL</p>
          <pre
            className={`rounded p-4 overflow-x-auto text-sm ${
              theme === "dark"
                ? "bg-gray-800 text-blue-100"
                : "bg-gray-100 text-blue-900"
            }`}
          >
            {`PATCH ${apiUrl}/shorturls/YOUR_SHORT_URL_ID?apiKey=YOUR_API_KEY
Content-Type: application/json
Body:
{
  "fullUrl": "https://newexample.com",
  "shortUrl": "newalias"
}
Response:
{
  "success": true,
  "message": "Short URL updated successfully.",
  "shortUrl": {
    "_id": "your_short_url_id",
    "full": "new_full_url",
    "short": "new_short_url",
    "clicks": "number_of_clicks",
    "createdAt": "date_created",
    "updatedAt": "date_updated"
  }
}`}
          </pre>

          <p className="mt-4 mb-2 font-semibold">Example: Delete a short URL</p>
          <pre
            className={`rounded p-4 overflow-x-auto text-sm ${
              theme === "dark"
                ? "bg-gray-800 text-blue-100"
                : "bg-gray-100 text-blue-900"
            }`}
          >
            {`DELETE ${apiUrl}/shorturls/YOUR_SHORT_URL_ID?apiKey=YOUR_API_KEY

Response:
{ success: true, message: "Short URL deleted successfully."}
`}
          </pre>
        </div>
        {/* Dashboard Link */}
        <div className="mb-8 flex justify-end">
          <Link
            to="/dashboard"
            className={`px-4 py-2 rounded-lg font-semibold shadow transition ${
              theme === "dark"
                ? "bg-blue-900 text-white hover:bg-blue-700"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
            }`}
            aria-label="Dashboard"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
      {/* Footer */}

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
          <span>© {new Date().getFullYear()} SaifURL</span>
        </div>
        <div className="mt-2">
          <span>
            Found an issue? Contact{" "}
            <a
              href="mailto:dev@saifabdelrazek.com"
              className={`hover:underline ${
                theme === "dark" ? "text-blue-300" : "text-blue-600"
              }`}
            >
              dev@saifabdelrazek.com
            </a>
          </span>
        </div>
        <div className="mt-2">
          <a
            href="https://github.com/saifabdelrazek011/saifurl"
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:underline ${
              theme === "dark" ? "text-blue-300" : "text-blue-600"
            }`}
          >
            GitHub
          </a>
          <span className="mx-2">|</span>
          <a
            href="https://saifabdelrazek.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:underline ${
              theme === "dark" ? "text-blue-300" : "text-blue-600"
            }`}
          >
            Portfolio
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Developer;
