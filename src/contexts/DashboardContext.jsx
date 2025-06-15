import { createContext, useContext } from "react";

export const DashboardContext = createContext(undefined);

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider"
    );
  }
  const { userData, setUserData } = context;
  if (!userData) {
    throw new Error("DashboardContext must have userData");
  }
  if (!userData.user.email) {
    throw new Error("DashboardContext must have userData.user.email");
  }
  if (!userData.firstName) {
    throw new Error("DashboardContext must have userData.firstName");
  }

  return { userData, setUserData };
};

export const useThemeContext = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a DashboardProvider");
  }
  const { theme, setTheme } = context;
  if (theme === undefined || setTheme === undefined) {
    throw new Error("DashboardContext must have theme and setTheme");
  }
  return { theme, setTheme };
};

export const DashboardProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  return (
    <DashboardContext.Provider
      value={{
        userData,
        setUserData,
        theme,
        setTheme,
        shorturls,
        setShorturls,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
