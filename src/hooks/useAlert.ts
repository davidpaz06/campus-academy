import { useState, useCallback } from "react";

export interface AlertItem {
  id: string;
  type: "success" | "error" | "warning" | "info" | "loading";
  title?: string;
  message: string | string[]; // ✅ Cambiar de string a string | string[]
  duration?: number;
  showIcon?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function useAlert() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const addAlert = useCallback((alert: Omit<AlertItem, "id">) => {
    const id = Date.now().toString();
    const newAlert: AlertItem = { ...alert, id };
    setAlerts((prev) => [...prev, newAlert]);
    return id;
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

  // ✅ Actualizar todas las funciones helper para aceptar string | string[]
  const success = useCallback(
    (message: string | string[], options?: Partial<Omit<AlertItem, "id" | "type" | "message">>) => {
      return addAlert({ type: "success", message, ...options });
    },
    [addAlert]
  );

  const error = useCallback(
    (message: string | string[], options?: Partial<Omit<AlertItem, "id" | "type" | "message">>) => {
      return addAlert({ type: "error", message, ...options });
    },
    [addAlert]
  );

  const warning = useCallback(
    (message: string | string[], options?: Partial<Omit<AlertItem, "id" | "type" | "message">>) => {
      return addAlert({ type: "warning", message, ...options });
    },
    [addAlert]
  );

  const info = useCallback(
    (message: string | string[], options?: Partial<Omit<AlertItem, "id" | "type" | "message">>) => {
      return addAlert({ type: "info", message, ...options });
    },
    [addAlert]
  );

  const loading = useCallback(
    (message: string | string[], options?: Partial<Omit<AlertItem, "id" | "type" | "message">>) => {
      return addAlert({ type: "loading", message, ...options });
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
