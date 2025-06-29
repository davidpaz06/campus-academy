import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-blue-600 dark:text-amber-300 mb-4">
        Dashboard Privado
      </h1>
      <p className="mb-4 text-gray-700 dark:text-white">
        Bienvenido, {user?.email}
      </p>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Dashboard;
