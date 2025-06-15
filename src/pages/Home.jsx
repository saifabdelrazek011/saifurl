import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-red-100 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 bg-white/80 shadow-md">
        <h1 className="text-3xl font-bold text-blue-700 tracking-tight">
          Saif<span className="text-red-600">URL</span>
        </h1>
        <div className="space-x-4">
          <Link
            to="/signin"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            Signup
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-800">
          Shorten your links with <span className="text-red-600">SaifURL</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
          SaifURL is a simple, fast, and secure URL shortener. Make your links
          easy to share and manage.
        </p>
        <Link
          to="/signup"
          className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-red-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition"
        >
          Get Started
        </Link>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} SaifURL. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
