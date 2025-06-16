import { createContext, useContext, useState, useEffect } from "react";

export const DashboardContext = createContext(undefined);

// User context
export const useDashboardContext = () => {
  const context = useContext(DashboardContext);

  if (context === undefined) {
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider"
    );
  }

  return context;
};

// DashboardProvider component
export const DashboardProvider = ({ children }) => {
  const [userData, setUserData] = useState(undefined);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const apiUrl =
    import.meta.env.VITE_API_URL || "https://api.saifabdelrazek.com/v1";

  const refreshUserData = async () => {
    try {
      const response = await fetch(apiUrl + "/auth/users/me", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      setUserData(undefined);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      await refreshUserData();
    };
    fetchUserData();
  }, []);

  const toggleTheme = (newTheme) => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <DashboardContext.Provider
      value={{
        userData,
        theme,
        toggleTheme,
        refreshUserData,
        apiUrl,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
