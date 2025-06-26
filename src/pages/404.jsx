import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const lastValidRoute = localStorage.getItem("lastValidRoute") || "/";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-extrabold text-blue-700 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate(lastValidRoute, { replace: true })}
        className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold text-lg shadow hover:bg-blue-700 transition"
      >
        Go Back
      </button>
      <p className="mt-2 text-sm text-gray-500">
        Or return to the{" "}
        <Link to="/" className="text-blue-600 hover:underline">
          homepage
        </Link>
        .
      </p>
    </div>
  );
};

export default NotFound;
