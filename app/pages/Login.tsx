import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Card from "../components/Card";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "100%" }}
    >
      <Card>
        <form onSubmit={handleSubmit}>
          <h2>Iniciar sesión</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
          <a href="/register">¿No tienes cuenta? Regístrate</a>
        </form>
      </Card>
      <a href="/">Volver al inicio</a>
    </div>
  );
};

export default Login;
