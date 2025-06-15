import { useState, useEffect } from "react";
import { useUserContext } from "../contexts/dashboard.context.jsx";
import Shorturls from "../components/ShortUrls.jsx";
import { useNavigate } from "react-router-dom";

const apiUrl =
  import.meta.env.VITE_API_URL || "https://api.saifabdelrazek.com/v1";

function Dashboard() {
  const context = useUserContext();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(context?.userData);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  if (!context) {
    throw new Error("Dashboard must be used within a UserContextProvider");
  }

  useEffect(() => {
    setUserData(context?.userData);
    setUser(context?.userData?.user);
  }, [context]);

  useEffect(() => {
    if (userData === null) {
      navigate("/signin");
    }
  }, [userData, navigate]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleSignout = async () => {
    // Adjust the endpoint if needed
    await fetch(apiUrl + "/auth/signout", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/signin";
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900"
          : "bg-gradient-to-br from-blue-700 via-white to-red-600"
      } transition-colors duration-300`}
    >
      <div className="max-w-5xl mx-auto py-12 px-4">
        <div
          className={`flex justify-between items-center mb-6 ${
            theme === "dark"
              ? "bg-gradient-to-r from-gray-800 to-blue-900"
              : "bg-gradient-to-r from-blue-600 to-red-500"
          } rounded-xl shadow-xl p-6 border-4 border-white`}
        >
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-1 drop-shadow">
              Dashboard
            </h1>
            <p className="text-xl text-white">
              Welcome,{" "}
              <span className="font-bold text-yellow-200">
                {user
                  ? `${user?.firstName} ${user?.lastName ? user?.lastName : ""}`
                  : ""}
              </span>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={toggleTheme}
              className={`px-4 py-2 rounded-lg font-semibold shadow transition ${
                theme === "dark"
                  ? "bg-blue-700 text-white hover:bg-blue-600"
                  : "bg-white text-blue-700 hover:bg-blue-100"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
            </button>
            <button
              onClick={handleSignout}
              className="px-4 py-2 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700 shadow transition"
            >
              Sign Out
            </button>
          </div>
        </div>

        <Shorturls theme={theme} />
      </div>
    </div>
  );
}

export default Dashboard;
