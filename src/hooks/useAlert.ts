import { useState, useCallback } from "react";

export interface AlertItem {
  id: string;
  type: "success" | "error" | "warning" | "info" | "loading";
  title?: string;
  message: string;
  duration?: number;
  showIcon?: boolean;
  dismissible?: boolean;
}

export function useAlert() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const generateId = () => `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const addAlert = useCallback((alert: Omit<AlertItem, "id">) => {
    const newAlert: AlertItem = {
      id: generateId(),
      showIcon: true,
      dismissible: true,
      duration: alert.type === "loading" ? 0 : 5000,
      ...alert,
    };

    setAlerts((prev) => [...prev, newAlert]);
    return newAlert.id;
  }, []);

  const removeAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const updateAlert = useCallback((id: string, updates: Partial<Omit<AlertItem, "id">>) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, ...updates } : alert)));
  }, []);

  const clearAll = useCallback(() => {
    setAlerts([]);
  }, []);

  // Métodos de conveniencia
  const success = useCallback(
    (message: string, options?: Partial<Omit<AlertItem, "id" | "type" | "message">>) => {
      return addAlert({ type: "success", message, ...options });
    },
    [addAlert]
  );

  const error = useCallback(
    (message: string, options?: Partial<Omit<AlertItem, "id" | "type" | "message">>) => {
      return addAlert({ type: "error", message, duration: 0, ...options });
    },
    [addAlert]
  );

  const warning = useCallback(
    (message: string, options?: Partial<Omit<AlertItem, "id" | "type" | "message">>) => {
      return addAlert({ type: "warning", message, ...options });
    },
    [addAlert]
  );

  const info = useCallback(
    (message: string, options?: Partial<Omit<AlertItem, "id" | "type" | "message">>) => {
      return addAlert({ type: "info", message, ...options });
    },
    [addAlert]
  );

  const loading = useCallback(
    (message: string, options?: Partial<Omit<AlertItem, "id" | "type" | "message">>) => {
      return addAlert({ type: "loading", message, duration: 0, dismissible: false, ...options });
    },
    [addAlert]
  );

  return {
    alerts,
    addAlert,
    removeAlert,
    updateAlert,
    clearAll,
    success,
    error,
    warning,
    info,
    loading,
  };
}
