export default function Landing() {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height: "100%" }}
    >
      <h1 className="text-4xl font-bold mb-4">Bienvenido a Campus Academy</h1>
      <p className="text-lg mb-6">Tu plataforma de aprendizaje</p>
      <div className="flex gap-4">
        <a
          href="/login"
          className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-blue-100"
        >
          Login
        </a>
        <a
          href="/register"
          className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-blue-100"
        >
          Register
        </a>
      </div>
    </div>
  );
}
