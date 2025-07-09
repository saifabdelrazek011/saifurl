import { useState } from "react";
import { useDashboardContext } from "../contexts/DashboardContext";

function SignoutBtn() {
  const { setUser, apiUrl, refreshUserData } = useDashboardContext();
  const [loadingSignOut, setLoadingSignOut] = useState(false);

  const handleSignout = async () => {
    setLoadingSignOut(true);
    await fetch(apiUrl + "/auth/signout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    await refreshUserData();
    setLoadingSignOut(false);
  };

  return (
    <button
      onClick={!loadingSignOut ? handleSignout : null}
      className={`w-full md:w-auto px-4 py-2 rounded-lg font-semibold shadow transition bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:text-white dark:hover:bg-red-600 ${
        loadingSignOut ? "cursor-not-allowed opacity-75" : ""
      }`}
      disabled={loadingSignOut}
    >
      {loadingSignOut ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Signing Out...</span>
        </div>
      ) : (
        "Sign Out"
      )}
    </button>
  );
}

export default SignoutBtn;
