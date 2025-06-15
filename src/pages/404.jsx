import React from "react";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 font-sans">
    <h1 className="text-7xl font-bold m-0">404</h1>
    <p className="text-2xl mt-4 mb-2 text-center">
      Sorry, the page you are looking for does not exist.
    </p>
    <a
      href="/"
      className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg font-medium transition-colors hover:bg-blue-700"
    >
      Go Home
    </a>
  </div>
);

export default NotFound;
