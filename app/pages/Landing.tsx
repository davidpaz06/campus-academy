import { Link } from "react-router-dom";

const Landing = () => (
  <main>
    <section>
      <div className="flex flex-col items-center justify-center min-h-[90vh] bg-blue-400">
        <h1 className="text-4xl font-bold text-amber-300 mb-4">
          Bienvenido a Campus Academy
        </h1>
        <p className="text-lg text-white mb-6">Tu plataforma de aprendizaje</p>
        <div className="flex gap-4 border-2 border-blue-600 rounded-lg">
          <Link
            to="/signin"
            className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-blue-100"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-blue-100"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </section>

    <section>
      <div className="flex flex-col items-center justify-center min-h-[100vh] bg-red-400">
        <h1 className="text-4xl font-bold text-amber-300 mb-4">
          Bienvenido a Campus Academy
        </h1>
        <p className="text-lg text-white mb-6">Tu plataforma de aprendizaje</p>
        <div className="flex gap-4">
          <Link
            to="/signin"
            className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-blue-100"
          >
            signin
          </Link>
          <Link
            to="/signup"
            className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-blue-100"
          >
            signup
          </Link>
        </div>
      </div>
    </section>
  </main>
);

export default Landing;
