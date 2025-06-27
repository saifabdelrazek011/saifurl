import React from "react";

const Loader = ({ text = "Loading...", className = "", theme }) => (
  <div
    className={`flex flex-col items-center justify-center min-h-screen w-full ${
      theme === "dark"
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900"
        : "bg-gradient-to-br from-blue-100 via-white to-blue-200"
    } ${className}`}
  >
    <svg
      className={`animate-spin h-14 w-14 mb-6 ${
        theme === "dark" ? "text-blue-400" : "text-blue-600"
      }`}
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
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
    <h1
      className={`text-3xl font-extrabold mb-2 tracking-wide ${
        theme === "dark" ? "text-blue-200" : "text-blue-700"
      }`}
    >
      SaifURL
    </h1>
    <span
      className={`font-semibold text-lg ${
        theme === "dark" ? "text-blue-100" : "text-blue-700"
      }`}
    >
      {text}
    </span>
  </div>
);

export default Loader;
