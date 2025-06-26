import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de registro real
    await login(email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-400">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Registrarse</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Crear cuenta</button>
        <a href="/login" className="block mt-4 text-blue-600 hover:underline text-center">¿Ya tienes cuenta? Inicia sesión</a>
      </form>
      <a href="/" className="mt-4 text-white underline">Volver al inicio</a>
    </div>
  );
};

export default Register;
