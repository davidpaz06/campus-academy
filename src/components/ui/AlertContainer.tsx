import { useAlertContext } from "@/context/AlertContext";
import Alert from "./Alert";
import "./AlertContainer.css";

export default function AlertContainer() {
  const { alerts, removeAlert } = useAlertContext();

  if (alerts.length === 0) return null;

  return (
    <div className="alert-container">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          type={alert.type}
          title={alert.title}
          message={alert.message}
          duration={alert.duration}
          showIcon={alert.showIcon}
          dismissible={alert.dismissible}
          onDismiss={() => removeAlert(alert.id)}
        />
      ))}
    </div>
  );
}
