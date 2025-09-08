import { createContext, useContext, ReactNode } from "react";
import { useAlert, AlertItem } from "@/hooks/useAlert";

interface AlertContextType {
  alerts: AlertItem[];
  addAlert: (alert: Omit<AlertItem, "id">) => string;
  removeAlert: (id: string) => void;
  updateAlert: (id: string, updates: Partial<Omit<AlertItem, "id">>) => void;
  clearAll: () => void;
  success: (message: string, options?: Partial<Omit<AlertItem, "id" | "type" | "message">>) => string;
  error: (message: string, options?: Partial<Omit<AlertItem, "id" | "type" | "message">>) => string;
  warning: (message: string, options?: Partial<Omit<AlertItem, "id" | "type" | "message">>) => string;
  info: (message: string, options?: Partial<Omit<AlertItem, "id" | "type" | "message">>) => string;
  loading: (message: string, options?: Partial<Omit<AlertItem, "id" | "type" | "message">>) => string;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function useAlertContext() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlertContext must be used within an AlertProvider");
  }
  return context;
}

interface AlertProviderProps {
  children: ReactNode;
}

export function AlertProvider({ children }: AlertProviderProps) {
  const alertMethods = useAlert();

  return <AlertContext.Provider value={alertMethods}>{children}</AlertContext.Provider>;
}
