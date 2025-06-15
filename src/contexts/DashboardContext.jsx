import { createContext, useContext, useState } from "react";

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

  return (
    <DashboardContext.Provider
      value={{
        userData,
        setUserData,
        theme,
        setTheme,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
