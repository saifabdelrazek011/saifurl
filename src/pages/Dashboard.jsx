import { useUserContext } from "../contexts/dashboard.context.jsx";
import Shorturls from "../components/Shorturls.jsx";

function Dashboard() {
  const user = useUserContext()?.userData.user;
  if (!user) {
    window.location.href = "/signin";
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-white to-red-600">
      <div className="max-w-5xl mx-auto py-12 px-4">
        <div className="bg-gradient-to-r from-blue-600 to-red-500 rounded-xl shadow-xl p-10 mb-10 border-4 border-white">
          <h1 className="text-4xl font-extrabold text-white mb-3 drop-shadow">
            Dashboard
          </h1>
          <p className="text-xl text-white mb-2">
            Welcome,{" "}
            <span className="font-bold text-yellow-200">
              {user?.firstName} {user?.lastName ? user?.lastName : ""}
            </span>
          </p>
          <p className="text-white/90">
            Here you can manage your account settings, view your activity, and
            more.
          </p>
        </div>
        <Shorturls />
      </div>
    </div>
  );
}

export default Dashboard;
