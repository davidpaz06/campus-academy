import { useEffect, useState } from "react";
import "./Alert.css";

export type AlertType = "success" | "error" | "warning" | "info" | "loading";

export interface AlertProps {
  type: AlertType;
  title?: string;
  message: string | string[];
  duration?: number;
  showIcon?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const alertIcons: Record<AlertType, string> = {
  success: "✅",
  error: "❌",
  warning: "⚠️",
  info: "ℹ️",
  loading: "⟳",
};

const alertTitles: Record<AlertType, string> = {
  success: "Success",
  error: "Error",
  warning: "Warning",
  info: "Information",
  loading: "Loading",
};

export default function Alert({
  type,
  title,
  message,
  duration = 5000,
  showIcon = true,
  dismissible = true,
  onDismiss,
  className = "",
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (duration > 0 && type !== "loading") {
      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, type]);

  const handleDismiss = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, 300);
  };

  if (!isVisible) return null;

  const alertTitle = title || alertTitles[type];

  const messageArray = Array.isArray(message) ? message : [message];

  return (
    <div
      className={`alert alert-${type} ${isAnimating ? "alert-dismissing" : ""} ${className}`}
      role="alert"
      aria-live="polite"
    >
      <div className="alert-content">
        {showIcon && (
          <div className="alert-icon" onClick={handleDismiss}>
            <span className={type === "loading" ? "alert-spinner" : ""}>{alertIcons[type]}</span>
          </div>
        )}

        <div className="alert-body">
          {alertTitle && <div className="alert-title">{alertTitle}</div>}
          <div className="alert-message">
            {messageArray.map((msg, index) => (
              <div key={index} className="alert-message-line">
                • {msg}
              </div>
            ))}
          </div>
        </div>

        {dismissible && type !== "loading" && (
          <button className="alert-dismiss" onClick={handleDismiss} aria-label="Dismiss alert">
            ✕
          </button>
        )}
      </div>

      {duration > 0 && type !== "loading" && (
        <div className="alert-progress" style={{ animationDuration: `${duration}ms` }} />
      )}
    </div>
  );
}
