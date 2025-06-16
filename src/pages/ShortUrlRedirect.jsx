import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ShortUrlRedirect = () => {
  const { slug = "" } = useParams();

  useEffect(() => {
    window.location.replace(`https://sa.died.pw/${slug}`);
  }, [slug]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-red-100">
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
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
      </div>
    </div>
  );
};

export default ShortUrlRedirect;
