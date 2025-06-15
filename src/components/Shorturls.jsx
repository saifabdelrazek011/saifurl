import React, { useState, useEffect } from "react";
import ShortUrl from "./Shorturl";

const apiUrl =
  import.meta.env.VITE_API_URL || "https://api.saifabdelrazek.com/v1";

function Shorturls() {
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
    <div className="bg-gradient-to-br from-blue-50 via-white to-red-100 rounded-2xl shadow-lg p-8 border-2 border-blue-200">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 drop-shadow">
        Your Short URLs
      </h2>
      {loading && <p className="text-blue-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl border border-blue-200 shadow">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-red-500">
                <th className="py-3 px-4 border-b border-blue-200 text-white font-semibold">
                  Original URL
                </th>
                <th className="py-3 px-4 border-b border-blue-200 text-white font-semibold">
                  Short URL
                </th>
                <th className="py-3 px-4 border-b border-blue-200 text-white font-semibold">
                  Created At
                </th>
                <th className="py-3 px-4 border-b border-blue-200 text-white font-semibold">
                  Clicks
                </th>
              </tr>
            </thead>
            <tbody>
              {shortUrls.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-red-500">
                    No short URLs found.
                  </td>
                </tr>
              ) : (
                shortUrls.map((url) => <ShortUrl key={url._id} url={url} />)
              )}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-8 text-right">
        <a
          href="/create-shorturl"
          className="inline-block bg-gradient-to-r from-blue-600 to-red-500 text-white px-6 py-2 rounded-lg shadow hover:from-red-600 hover:to-blue-600 transition font-semibold"
        >
          + Create New Short URL
        </a>
      </div>
    </div>
  );
}

export default Shorturls;
