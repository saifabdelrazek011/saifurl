import React, { useState, useEffect } from "react";
import ShortUrl from "./ShortUrl";

const apiUrl =
  import.meta.env.VITE_API_URL || "https://api.saifabdelrazek.com/v1";

function Shorturls({ theme }) {
  const [shortUrls, setShortUrls] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShortUrls = async () => {
      try {
        const response = await fetch(apiUrl + "/shorturls", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch short URLs");
        }

        const data = await response.json();
        setShortUrls(data.shortUrls || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShortUrls();
  }, []);

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900"
          : "bg-gradient-to-br from-blue-50 via-white to-red-100"
      } rounded-2xl shadow-lg p-8 border-2 border-blue-200 transition-colors duration-300`}
    >
      <h2
        className={`text-2xl font-bold mb-6 drop-shadow ${
          theme === "dark" ? "text-blue-200" : "text-blue-700"
        }`}
      >
        Your Short URLs
      </h2>
      {loading && (
        <p className={theme === "dark" ? "text-blue-200" : "text-blue-600"}>
          Loading...
        </p>
      )}
      {error && (
        <p className={theme === "dark" ? "text-red-400" : "text-red-500"}>
          {error}
        </p>
      )}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table
            className={`min-w-full rounded-xl border shadow ${
              theme === "dark"
                ? "bg-gray-900 border-blue-900"
                : "bg-white border-blue-200"
            }`}
          >
            <thead>
              <tr
                className={
                  theme === "dark"
                    ? "bg-gradient-to-r from-blue-900 to-red-900"
                    : "bg-gradient-to-r from-blue-600 to-red-500"
                }
              >
                <th className="py-3 px-4 border-b border-blue-200 text-white font-semibold">
                  Original URL
                </th>
                <th className="py-3 px-4 border-b border-blue-200 text-white font-semibold">
                  Short URL
                </th>
                <th className="py-3 px-4 border-b border-blue-200 text-white font-semibold">
                  Clicks
                </th>
              </tr>
            </thead>
            <tbody>
              {shortUrls.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className={`text-center py-6 ${
                      theme === "dark" ? "text-red-400" : "text-red-500"
                    }`}
                  >
                    No short URLs found.
                  </td>
                </tr>
              ) : (
                shortUrls.map((url) => (
                  <ShortUrl key={url._id} url={url} theme={theme} />
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-8 text-right">
        <a
          href="/create-shorturl"
          className={`inline-block bg-gradient-to-r from-blue-600 to-red-500 text-white px-6 py-2 rounded-lg shadow hover:from-red-600 hover:to-blue-600 transition font-semibold ${
            theme === "dark" ? "border border-blue-900" : ""
          }`}
        >
          + Create New Short URL
        </a>
      </div>
    </div>
  );
}
export default Shorturls;
