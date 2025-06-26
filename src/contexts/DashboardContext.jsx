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
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const apiUrl =
    import.meta.env.VITE_API_URL || "https://api.saifabdelrazek.com/v1";

  const refreshUserData = async () => {
    setIsAuthenticated(false);
    setIsUserLoading(true);
    try {
      const response = await fetch(apiUrl + "/users/me", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      const data = await response.json();
      setUserData(data);
      setIsAuthenticated(true);
    } catch (error) {
      setUserData(undefined);
    } finally {
      setIsUserLoading(false);
    }
  };

  const handleUpdateUser = async (formData) => {
    setIsUserLoading(true);
    try {
      const response = await fetch(`${apiUrl}/users/me`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error("Failed to update user data");
      }

      const data = await response.json();
      await refreshUserData();
    } catch (error) {
      throw new Error(
        error.message || "Error updating user data. Please try again later."
      );
    } finally {
      setIsUserLoading(false);
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
        isUserLoading,
        isAuthenticated,
        refreshUserData,
        handleUpdateUser,
        theme,
        toggleTheme,
        apiUrl,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
