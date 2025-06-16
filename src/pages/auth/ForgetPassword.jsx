import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const { apiUrl } = useDashboardContext();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForget = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${apiUrl}/auth/password/forget`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to send reset email.");
      }
      setStep(2);
      setMessage("Check your email for the reset token.");
    } catch (err) {
      setMessage(err.message || "Failed to send reset email.");
    }
    setLoading(false);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${apiUrl}/auth/password/reset`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, providedCode: token, newPassword }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to reset password.");
      }
      setMessage("Password reset successful. You can now log in.");
      setStep(3);
      setTimeout(() => {
        navigate("/signin"); // Redirect to sign-in page
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      setMessage(err.message || "Failed to reset password.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Forget Password</h2>
      {message && (
        <div className="mb-4 p-3 rounded bg-blue-100 text-blue-800 text-sm">
          {message}
        </div>
      )}
      {step === 1 && (
        <>
          <form onSubmit={handleForget} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Email:</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Reset Email"}
            </button>
          </form>
          <Link to="/signin" className="text-blue-600 hover:underline">
            Go to Sign In
          </Link>
        </>
      )}
      {step === 2 && (
        <>
          <h3 className="text-lg font-semibold mb-4">Reset Password</h3>
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Reset Token:</label>
              <input
                type="text"
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
                disabled={loading}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">New Password:</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-60"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </>
      )}
      {step === 3 && (
        <div className="text-center mt-6">
          <p className="text-green-700 font-semibold">
            Password has been reset. You may now log in.
          </p>
          <Link to="/signin" className="text-blue-600 hover:underline">
            Go to Sign In
          </Link>{" "}
          Or wait for automatic redirect.
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
