import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">Bienvenido a Campus Academy</h1>
        <p className="landing-subtitle">
          Tu plataforma de aprendizaje completa donde estudiantes, profesores e instituciones se conectan para crear
          experiencias educativas extraordinarias.
        </p>
        <div className="landing-buttons">
          <a href="/login" className="landing-btn landing-btn-primary">
            Iniciar Sesión
          </a>
          <a href="/register" className="landing-btn landing-btn-secondary">
            Registrarse
          </a>
        </div>
      </div>
    </div>
  );
}
