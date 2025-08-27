import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

const AuthForm = ({ mode }: { mode: "login" | "signup" }) => {
  const { login } = useAuth(),
    [email, setEmail] = useState<string>(""),
    [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-400">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-blue-600">
          {mode === "login" ? "Iniciar sesión" : "Registrarse"}
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border-2 border-black rounded text-black"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border-2 border-black rounded text-black"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
        <Link
          to={mode === "login" ? "/signup" : "/login"}
          className="block mt-4 text-blue-600 hover:underline text-center"
        >
          {mode === "login"
            ? "¿No tienes cuenta? Regístrate"
            : "¿Ya tienes cuenta? Inicia sesión"}
        </Link>
      </form>
      <Link to="/" className="mt-4 text-white underline">
        Volver al inicio
      </Link>
    </div>
  );
};

export default AuthForm;
