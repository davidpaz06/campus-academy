import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/variables.css";

// ✅ Verificar que los providers estén en el orden correcto
import { AlertProvider } from "./context/AlertContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AlertProvider>
      {" "}
      {/* ✅ AlertProvider primero */}
      <AuthProvider>
        {" "}
        {/* ✅ AuthProvider después */}
        <App />
      </AuthProvider>
    </AlertProvider>
  </React.StrictMode>
);
