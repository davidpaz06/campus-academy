import React from "react";
import "./LoadingSpinner.css";

interface LoadingSpinnerProps {
  message?: string;
  size?: "small" | "medium" | "large";
  overlay?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Cargando...",
  size = "medium",
  overlay = false,
}) => {
  const containerClass = overlay ? "loading-overlay" : "loading-container";

  return (
    <div className={containerClass}>
      <div className={`loading-spinner ${size}`}>
        <div className="spinner"></div>
        <p className="loading-message">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
