import { useEffect, useState } from "react";
import { useDashboardContext } from "../contexts/DashboardContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const {
    userData,
    theme,
    handleUpdateUser,
    toggleTheme,
    isUserLoading,
    apiUrl,
    handleCheckUserData,
  } = useDashboardContext();
  const [user, setUser] = useState(userData?.user || null);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    username: user?.username || "",
  });

  const [loading, setLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileError, setProfileError] = useState("");
  const [verifySuccess, setVerifySuccess] = useState("");
  const [verifyError, setVerifyError] = useState("");

  const navigate = useNavigate();

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [pwLoading, setPwLoading] = useState(false);
  const [pwSuccess, setPwSuccess] = useState("");
  const [pwError, setPwError] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [providedCode, setProvidedCode] = useState("");
  const [loadingCode, setLoadingCode] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  useEffect(() => {
    setUser(userData?.user || null);
    if (!userData && !isUserLoading) {
      setUser(null);
      navigate("/signin");
    }
  }, [userData, navigate, isUserLoading]);

  useEffect(() => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      username: user?.username || "",
    });
  }, [user]);
  useEffect(() => {
    if (verifyError) {
      setTimeout(() => {
        setVerifyError("");
      }, 5000);
    }
  }, [verifyError]);
  useEffect(() => {
    if (profileError) {
      setTimeout(() => {
        setProfileError("");
      }, 5000);
    }
  }, [profileError]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Password change handlers
  const handlePasswordChange = (e) => {
    setPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPwLoading(true);
    setPwSuccess("");
    setPwError("");

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setPwError("New passwords do not match.");
      setPwLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/auth/password`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
          confirmNewPassword: passwordData.confirmNewPassword,
        }),
      });
      if (!response.ok) {
        let data = null;
        const text = await response.text();
        if (text) {
          data = JSON.parse(text);
        }
        throw new Error(data.message || "Failed to change password.");
      }
      setPwSuccess("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      setPwError(error.message || "Error changing password.");
    } finally {
      setPwLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-red-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Not Signed In
          </h2>
          <p className="text-gray-700">Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoadingCode(true);
    setVerifySuccess("");
    setVerifyError("");
    try {
      const response = await fetch(`${apiUrl}/auth/verification/verify`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ providedCode, email: user.email }),
      });

      if (!response.ok) {
        let data = null;
        const text = await response.text();
        if (text) {
          data = JSON.parse(text);
        }
        throw new Error(data.message || "Failed to verify code.");
      }
      setVerifySuccess("Verification successful!");
      setProvidedCode("");
      setVerificationSent(false);
      handleCheckUserData();
    } catch (error) {
      setVerifyError(error.message || "Error verifying code.");
    } finally {
      setLoadingCode(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-white to-red-600 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 transition-colors duration-300">
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-gradient-to-r from-blue-600 to-red-500 dark:from-gray-800 dark:to-blue-900 rounded-xl shadow-xl p-6 border-4 border-white">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-1 drop-shadow">
              Profile
            </h1>
            <p className="text-xl text-white">
              Hello,{" "}
              <span className="font-bold text-yellow-200">
                {user.firstName} {user.lastName ? user.lastName : ""}
              </span>
            </p>
          </div>
          <a
            href="https://status.saifabdelrazek.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center ml-4"
            title="View detailed service status"
          >
            <img
              src={
                theme === "dark"
                  ? "https://uptime.saifabdelrazek.com/api/badge/3/status?upColor=%2360a5fa&downColor=%23f87171&pendingColor=%23fbbf24&maintenanceColor=%234ade80&style=for-the-badge"
                  : "https://uptime.saifabdelrazek.com/api/badge/3/status?upColor=%233b82f6&downColor=%23ef4444&pendingColor=%23f59e42&maintenanceColor=%2322c55e&style=for-the-badge"
              }
              alt="Service Status"
              className="h-6 mr-2 drop-shadow-lg rounded-full border border-white"
            />
          </a>
          <button
            onClick={toggleTheme}
            className="mt-4 md:mt-0 px-4 py-2 rounded-lg font-semibold shadow transition bg-white text-blue-700 hover:bg-blue-100 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-600"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
        <div className="w-full mx-auto rounded-xl shadow-lg p-1 bg-gradient-to-br from-blue-50 via-white to-red-100 dark:from-blue-900 dark:via-gray-900 dark:to-gray-800">
          <form
            className="space-y-6 text-lg rounded-xl p-8 bg-white text-blue-900 dark:bg-gray-900 dark:text-blue-100"
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              setProfileSuccess("");
              setProfileError("");
              await handleUpdateUser(formData)
                .then(() => {
                  setProfileSuccess("Profile updated successfully!");
                })
                .catch((e) => {
                  setProfileError(e.message || "Error updating user data.");
                })
                .finally(() => setLoading(false));
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
              <label
                className="font-semibold w-40 inline-block text-blue-900 dark:text-blue-100"
                htmlFor="firstName"
              >
                First Name:
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className="flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 bg-white text-blue-900 border-blue-200 focus:ring-blue-400 dark:bg-gray-800 dark:text-blue-100 dark:border-blue-900 dark:focus:ring-blue-600"
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
              <label
                className="font-semibold w-40 inline-block text-blue-900 dark:text-blue-100"
                htmlFor="lastName"
              >
                Last Name:
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className="flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 bg-white text-blue-900 border-blue-200 focus:ring-blue-400 dark:bg-gray-800 dark:text-blue-100 dark:border-blue-900 dark:focus:ring-blue-600"
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
              <label
                className="font-semibold w-40 inline-block"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                readOnly
                className="flex-1 px-3 py-2 border rounded transition-all duration-300 bg-gray-100/70 border-gray-300 text-gray-500 cursor-not-allowed opacity-75 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-400 dark:cursor-not-allowed dark:opacity-60"
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
              <label
                className="font-semibold w-40 inline-block"
                htmlFor="username"
              >
                Username:
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 bg-white text-blue-900 border-blue-200 focus:ring-blue-400 dark:bg-gray-800 dark:text-blue-100 dark:border-blue-900 dark:focus:ring-blue-600"
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
              <span className="font-semibold w-40 inline-block">Joined:</span>
              <span>
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            {profileSuccess && (
              <div className="text-green-600 font-semibold">
                {profileSuccess}
              </div>
            )}
            {profileError && (
              <div className="text-red-600 font-semibold">{profileError}</div>
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-300 bg-red-500 hover:bg-red-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Change Password Form */}
      <div className="max-w-2xl mx-auto py-6 px-4">
        <form
          onSubmit={handlePasswordSubmit}
          className="rounded-xl shadow-lg p-8 mt-4 bg-gradient-to-br from-blue-50 via-white to-red-100 text-blue-900 dark:from-blue-900 dark:via-gray-900 dark:to-gray-800 dark:text-blue-100"
        >
          <label className="text-lg font-semibold block mb-4">
            Change Password
          </label>
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="current-password"
                className="block mb-1 font-medium"
              >
                Current Password
              </label>
              <input
                type={showPasswords ? "text" : "password"}
                id="current-password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 bg-white text-blue-900 border-blue-200 focus:ring-blue-400 dark:bg-gray-800 dark:text-blue-100 dark:border-blue-900 dark:focus:ring-blue-600"
                placeholder="Enter your current password"
                required
              />
            </div>
            <div>
              <label htmlFor="new-password" className="block mb-1 font-medium">
                New Password
              </label>
              <input
                type={showPasswords ? "text" : "password"}
                id="new-password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 bg-white text-blue-900 border-blue-200 focus:ring-blue-400 dark:bg-gray-800 dark:text-blue-100 dark:border-blue-900 dark:focus:ring-blue-600"
                placeholder="Enter your new password"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirm-new-password"
                className="block mb-1 font-medium"
              >
                Confirm New Password
              </label>
              <input
                type={showPasswords ? "text" : "password"}
                id="confirm-new-password"
                name="confirmNewPassword"
                value={passwordData.confirmNewPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 bg-white text-blue-900 border-blue-200 focus:ring-blue-400 dark:bg-gray-800 dark:text-blue-100 dark:border-blue-900 dark:focus:ring-blue-600"
                placeholder="Confirm your new password"
                required
              />
            </div>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="show-passwords"
                className="mr-2"
                checked={showPasswords}
                onChange={(e) => setShowPasswords(e.target.checked)}
              />
              <label htmlFor="show-passwords" className="text-sm">
                Show Passwords
              </label>
            </div>
            {pwSuccess && (
              <div className="text-green-600 font-semibold mt-2">
                {pwSuccess}
              </div>
            )}
            {pwError && (
              <div className="text-red-600 font-semibold mt-2">{pwError}</div>
            )}
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                disabled={pwLoading}
                className="px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-300 bg-red-500 hover:bg-red-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                {pwLoading ? "Changing..." : "Change Password"}
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* Account Verification Section */}
      {user.verified ? (
        <div className="max-w-2xl mx-auto py-6 px-4">
          <div className="rounded-xl shadow-lg p-8 flex flex-col items-center bg-gradient-to-br from-blue-50 via-white to-red-100 text-blue-900 dark:from-blue-900 dark:via-gray-900 dark:to-gray-800 dark:text-blue-100">
            <svg
              className="w-10 h-10 text-green-500 mb-2"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h2 className="text-lg font-semibold mb-2">Account Verified</h2>
            <p className="text-sm text-center">
              Your account has been successfully verified. You can now access
              all features.
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto py-6 px-4">
          <div className="rounded-xl shadow-lg p-8 flex flex-col items-center bg-gradient-to-br from-blue-50 via-white to-red-100 text-blue-900 dark:from-blue-900 dark:via-gray-900 dark:to-gray-800 dark:text-blue-100">
            <svg
              className="w-10 h-10 text-yellow-400 mb-2"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <button
                onClick={toggleTheme}
                className="mt-4 md:mt-0 px-4 py-2 rounded-lg font-semibold shadow transition bg-white text-blue-700 hover:bg-blue-100 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-600"
                aria-label="Toggle theme"
              >
                Toggle Theme
              </button>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
              />
            </svg>
            <h2 className="text-lg font-semibold mb-2">Account Not Verified</h2>
            <p className="text-sm text-center mb-4">
              Please verify your account by clicking the link sent to your email
              address.
            </p>
            <div className="w-full flex flex-col items-center">
              <span className="font-semibold mb-2">
                Email: <span className="font-normal">{user.email}</span>
              </span>
              <button
                onClick={
                  loading
                    ? undefined
                    : async (e) => {
                        e.preventDefault();
                        setLoading(true);
                        setVerifySuccess("");
                        setVerifyError("");
                        try {
                          const response = await fetch(
                            `${apiUrl}/auth/verification/send`,
                            {
                              method: "PATCH",
                              credentials: "include",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                email: user.email,
                              }),
                            }
                          );
                          if (!response.ok) {
                            let data = null;
                            try {
                              const text = await response.text();
                              data = text ? JSON.parse(text) : null;
                            } catch (error) {
                              console.error("Failed to parse error response");
                            }
                            throw new Error(
                              (data && data.message) ||
                                "Failed to send verification email."
                            );
                          }
                          setVerifySuccess(
                            "Verification email sent successfully!"
                          );
                          setVerificationSent(true);
                        } catch (error) {
                          setVerifyError(
                            error.message || "Error sending verification email."
                          );
                        } finally {
                          setLoading(false);
                        }
                      }
                }
                className={`mt-2 px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-300 dark:bg-blue-600 hover:bg-blue-700 bg-red-500 hover:bg-red-600"
                }`}
              >
                {loading ? "Sending..." : "Send Verification Email"}
              </button>
            </div>
            {verifySuccess && (
              <div className="text-green-600 font-semibold mt-2">
                {verifySuccess}
              </div>
            )}
            {verifyError && (
              <div className="text-red-600 font-semibold mt-2">
                {verifyError}
              </div>
            )}
            {verificationSent && (
              <form
                onSubmit={handleVerifyCode}
                className="w-full flex flex-col items-center mt-6"
              >
                <label htmlFor="providedCode" className="mb-2 font-semibold">
                  Enter Verification Code
                </label>
                <input
                  type="text"
                  id="providedCode"
                  value={providedCode}
                  onChange={(e) => setProvidedCode(e.target.value)}
                  className="mb-2 p-2 rounded-md border w-64 bg-white text-blue-900 border-blue-200 dark:bg-gray-800 dark:text-blue-100 dark:border-blue-900"
                  placeholder="Enter the code from your email"
                  required
                />
                <button
                  type="submit"
                  disabled={loadingCode}
                  className="px-6 py-2 rounded-lg text-white font-semibold transition-colors duration-300 bg-red-500 hover:bg-red-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  {loadingCode ? "Verifying..." : "Verify Code"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      <div className="max-w-2xl mx-auto py-6 px-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-300 bg-red-500 hover:bg-red-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
        <button
          onClick={() => navigate("/contact")}
          className="ml-4 px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-300 bg-red-500 hover:bg-red-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default Profile;
