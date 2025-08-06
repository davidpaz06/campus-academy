import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de registro real
    await login(email, password);
  };

  return (
    <div className="register-container flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        style={{ width: "500px" }}
      >
        <h2>Registrarse</h2>
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
        <button type="submit">Crear cuenta</button>
        <a href="/login">¿Ya tienes cuenta? Inicia sesión</a>
      </form>
      <a href="/">Volver al inicio</a>
    </div>
  );
};

export default Register;
