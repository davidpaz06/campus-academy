export default function Landing() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Bienvenido a Campus Academy</h1>
      <p>Tu plataforma de aprendizaje</p>
      <div>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
    </div>
  );
}
