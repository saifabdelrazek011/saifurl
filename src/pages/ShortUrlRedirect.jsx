import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShortUrlRedirect = () => {
  const { slug = "" } = useParams();
  const [error, setError] = useState(null);

  const apiUrl =
    import.meta.env.VITE_API_URL || "https://api.saifabdelrazek.com/v1";

  useEffect(() => {
    const redirectToShortUrl = async () => {
      try {
        const response = await fetch(`${apiUrl}/shorturls/info/${slug}`, {
          method: "GET",
        });

        setEffect(() => {
          if (!response) {
            setError("No response from the server.");
            return;
          }
          if (!response.ok) {
            if (response.status === 404) {
              setError("Short URL not found.");
            } else if (response.status === 403) {
              setError("Access to this short URL is forbidden.");
            } else if (response.status === 500) {
              setError("Internal server error.");
            } else {
              setError("Failed to fetch short URL.");
            }
            return;
          }
        });

        const data = await response.json();

        if (!data || !data.shortUrl || !data.shortUrl.full) {
          setError("Invalid or missing short URL data.");
          return;
        }

        // Redirect to the full URL
        window.location.replace(data.shortUrl.full);
      } catch (error) {
        setError("Network error or invalid response.");
        console.error("Error redirecting to short URL:", error);
      }
    };
    redirectToShortUrl();
    // eslint-disable-next-line
  }, [slug]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-red-100">
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        {error ? (
          <>
            <h1 className="text-3xl font-bold text-red-600 mb-2">
              404 Not Found
            </h1>
            <p className="text-gray-700">{error}</p>
          </>
        ) : (
          <>
            <svg
              className="animate-spin h-8 w-8 text-blue-600 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            <p className="text-blue-700 text-lg font-semibold">
              Redirecting to the short URL...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ShortUrlRedirect;
