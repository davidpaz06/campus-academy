import { apiService } from "./api";
import { API_ENDPOINTS, STORAGE_KEYS } from "@/constants";
import type { AuthResponse, LoginCredentials, RegisterData, User } from "@/types";

export class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiService.post<{ accessToken: string }>(API_ENDPOINTS.AUTH.LOGIN, credentials);

      if (!response.accessToken) {
        throw new Error("No access token received from server");
      }

      const payload = this.decodeToken(response.accessToken);

      const user: User = {
        campusUserId: payload.campusUserId,
        profileId: payload.profileId,
        username: credentials.username,
      };

      const authResponse: AuthResponse = {
        token: response.accessToken,
        refreshToken: "",
        user: user,
      };

      this.storeAuthData(authResponse);

      // ✅ Fetch adicional para obtener el nombre de la institución
      if (user.institutionId) {
        try {
          const institutionResponse = await fetch(
            `${process.env.REACT_APP_API_BASE_URL || "http://localhost:3000"}/institutions/${user.institutionId}`,
            {
              method: "GET",
            }
          );

          if (institutionResponse.ok) {
            const institutionData = await institutionResponse.json();
            if (institutionData.success && institutionData.data?.institutionName) {
              authResponse.user.institutionName = institutionData.data.institutionName;
            }
          } else {
            console.warn("Failed to fetch institution name:", institutionResponse.statusText);
          }
        } catch (error) {
          console.warn("Error fetching institution name:", error);
        }
      }

      // ✅ Volver a guardar con el institutionName incluido
      this.storeAuthData(authResponse);

      return authResponse;
    } catch (error) {
      console.error("Login failed:", error);
      throw error instanceof Error ? error : new Error("Login failed");
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiService.post<{ accessToken: string }>(API_ENDPOINTS.AUTH.REGISTER, data);

      if (!response.accessToken) {
        throw new Error("Registration failed - no access token received");
      }

      const payload = this.decodeToken(response.accessToken);

      const user: User = {
        campusUserId: payload.campusUserId,
        profileId: payload.profileId,
      };

      const authResponse: AuthResponse = {
        token: response.accessToken,
        refreshToken: "",
        user: user,
      };

      // ✅ Guardar en cookies
      this.storeAuthData(authResponse);

      return authResponse;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error instanceof Error ? error : new Error("Registration failed");
    }
  }

  async logout(): Promise<void> {
    this.clearAuthData();
  }

  async refreshToken(): Promise<AuthResponse> {
    throw new Error("Token refresh not supported by current API");
  }

  // ✅ Método helper para decodificar token
  private decodeToken(token: string): any {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (!payload.campusUserId || !payload.profileId || !payload.exp) {
        throw new Error("Invalid token payload");
      }
      return payload;
    } catch (error) {
      throw new Error("Failed to decode token");
    }
  }

  // ✅ Método helper para guardar datos en cookies
  private storeAuthData(authResponse: AuthResponse): void {
    const COOKIE_CONFIG = {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      maxAge: 7 * 24 * 60 * 60, // 7 days
    };

    const setCookie = (name: string, value: string) => {
      let cookieString = `${name}=${encodeURIComponent(value)}`;
      cookieString += `; path=${COOKIE_CONFIG.path}`;
      cookieString += `; max-age=${COOKIE_CONFIG.maxAge}`;
      if (COOKIE_CONFIG.secure) cookieString += "; secure";
      cookieString += `; samesite=${COOKIE_CONFIG.sameSite}`;
      document.cookie = cookieString;
    };

    setCookie("accessToken", authResponse.token);
    setCookie("campus_user", JSON.stringify(authResponse.user));
  }

  // ✅ Método helper para limpiar cookies
  private clearAuthData(): void {
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    document.cookie = "campus_user=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  }

  // ✅ Métodos públicos para acceder a datos de cookies
  getStoredUser(): User | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; campus_user=`);
    if (parts.length === 2) {
      try {
        return JSON.parse(decodeURIComponent(parts.pop()?.split(";").shift() || ""));
      } catch {
        return null;
      }
    }
    return null;
  }

  getStoredToken(): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; accessToken=`);
    if (parts.length === 2) {
      return decodeURIComponent(parts.pop()?.split(";").shift() || "");
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getStoredToken();
    if (!token) return false;

    try {
      const payload = this.decodeToken(token);
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch {
      this.clearAuthData();
      return false;
    }
  }
}

export const authService = new AuthService();
