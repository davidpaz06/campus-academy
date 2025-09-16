import React, { createContext, useContext, useReducer, useEffect } from "react";
import { authService } from "@/services/auth";
import { useAlertContext } from "@/context/AlertContext"; // ✅ Agregar
import { User } from "@/types/user";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: User }
  | { type: "AUTH_ERROR"; payload: string }
  | { type: "LOGOUT" };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, isLoading: true, error: null };
    case "AUTH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case "AUTH_ERROR":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  const { success, error: showError } = useAlertContext(); // ✅ Agregar hook de alertas

  useEffect(() => {
    const initAuth = async () => {
      const token = authService.getStoredToken();
      const isAuthenticated = authService.isAuthenticated();

      if (isAuthenticated && token) {
        const storedUser = authService.getStoredUser();
        if (storedUser) {
          dispatch({ type: "AUTH_SUCCESS", payload: storedUser });
        } else {
          dispatch({ type: "LOGOUT" });
        }
      } else {
        dispatch({ type: "LOGOUT" });
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch({ type: "AUTH_START" });
      const response = await authService.login(credentials);

      dispatch({ type: "AUTH_SUCCESS", payload: response.user });
      success("Login successful!", { title: "Welcome back!" }); // ✅ Mostrar éxito
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Login failed";
      dispatch({ type: "AUTH_ERROR", payload: errorMessage });
      showError(errorMessage, { title: "Login Failed" }); // ✅ Mostrar error
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.warn("Logout service error (ignored):", error);
    }

    dispatch({ type: "LOGOUT" });
    success("Logged out successfully", { title: "Goodbye!" }); // ✅ Mostrar éxito
  };

  const register = async (userData: any) => {
    try {
      dispatch({ type: "AUTH_START" });
      const response = await authService.register(userData);

      dispatch({ type: "AUTH_SUCCESS", payload: response.user });
      success("Registration successful!", { title: "Welcome!" }); // ✅ Mostrar éxito
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Registration failed";
      dispatch({ type: "AUTH_ERROR", payload: errorMessage });
      showError(errorMessage, { title: "Registration Failed" }); // ✅ Mostrar error
      throw error;
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
