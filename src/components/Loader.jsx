import React from "react";

const Loader = ({ text = "Loading...", className = "" }) => (
  <div
    className={`flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 ${className}`}
  >
    <svg
      className="animate-spin h-14 w-14 mb-6 text-blue-600 dark:text-blue-400"
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
    <h1 className="text-3xl font-extrabold mb-2 tracking-wide text-blue-700 dark:text-blue-200">
      SaifURL
    </h1>
    <span className="font-semibold text-lg text-blue-700 dark:text-blue-100">
      {text}
    </span>
  </div>
);

export default Loader;
