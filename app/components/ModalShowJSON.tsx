import React from "react";

interface ModalShowJSONProps {
  isOpen: boolean;
  onClose: () => void;
  message: any;
}

const ModalShowJSON: React.FC<ModalShowJSONProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
          padding: "2rem",
          minWidth: "320px",
          maxWidth: "90vw",
          maxHeight: "80vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "#eee",
            border: "none",
            borderRadius: "4px",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Cerrar
        </button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(message, null, 2));
          }}
          style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            background: "#222",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Copiar JSON
        </button>
        <h2 style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>Vista JSON</h2>
        <pre
          style={{
            background: "#222",
            color: "#fff",
            borderRadius: "6px",
            padding: "1rem",
            fontSize: "0.95rem",
            overflowX: "auto",
          }}
        >
          {JSON.stringify(message, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ModalShowJSON;
