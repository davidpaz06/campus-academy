import { useState, useEffect, useCallback } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface FetchOptions {
  headers?: Record<string, string>;
  body?: any;
  contentType?: "json" | "form";
}

interface UseFetchResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  get: (endpoint: string, options?: FetchOptions) => Promise<T>;
  post: (endpoint: string, body?: any, contentType?: "json" | "form") => Promise<T>;
  put: (endpoint: string, body?: any, contentType?: "json" | "form") => Promise<T>;
  patch: (endpoint: string, body?: any, contentType?: "json" | "form") => Promise<T>;
  delete: (endpoint: string, options?: FetchOptions) => Promise<T>;
  refetch: () => Promise<T | null>;
  reset: () => void;
}

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function useFetch<T = any>(endpoint?: string, options?: FetchOptions): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper para crear headers con autenticación
  const getHeaders = useCallback(
    (customHeaders?: Record<string, string>, contentType: "json" | "form" = "json") => {
      const headers: Record<string, string> = {
        ...options?.headers,
        ...customHeaders,
      };

      // Agregar token de autenticación si existe
      const token = localStorage.getItem("token");
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      // Establecer Content-Type según el tipo
      if (contentType === "form") {
        headers["Content-Type"] = "application/x-www-form-urlencoded";
      } else {
        headers["Content-Type"] = "application/json";
      }

      return headers;
    },
    [options?.headers]
  );

  // Helper para convertir body según content-type
  const prepareBody = useCallback((body: any, contentType: "json" | "form" = "json"): string | undefined => {
    if (!body) return undefined;

    if (contentType === "form") {
      const formData = new URLSearchParams();
      Object.entries(body).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          formData.append(key, String(value));
        }
      });
      return formData.toString();
    } else {
      return JSON.stringify(body);
    }
  }, []);

  // Función principal de request
  const request = useCallback(
    async (
      url: string,
      method: HttpMethod,
      body?: any,
      contentType: "json" | "form" = "json",
      customOptions?: FetchOptions
    ): Promise<T> => {
      setLoading(true);
      setError(null);

      try {
        const headers = getHeaders(customOptions?.headers, contentType);
        const preparedBody = method !== "GET" ? prepareBody(body, contentType) : undefined;

        console.log(`🚀 ${method} ${url}`, { body, preparedBody, headers });

        const response = await fetch(url, {
          method,
          headers,
          body: preparedBody,
        });

        if (!response.ok) {
          let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

          try {
            const errorText = await response.text();
            const errorJson = JSON.parse(errorText);
            errorMessage = errorJson.message || errorJson.error || errorMessage;
          } catch {
            // Si no se puede parsear, usar el mensaje por defecto
          }

          throw new Error(errorMessage);
        }

        const result = await response.json();
        console.log(`✅ ${method} ${url} success:`, result);

        setData(result);
        return result;
      } catch (err: any) {
        const errorMessage = err.message || "Network error occurred";
        console.error(`❌ ${method} ${url} error:`, errorMessage);

        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [getHeaders, prepareBody]
  );

  // Métodos HTTP específicos
  const get = useCallback(
    (url: string, customOptions?: FetchOptions): Promise<T> => {
      return request(url, "GET", undefined, "json", customOptions);
    },
    [request]
  );

  const post = useCallback(
    (url: string, body?: any, contentType: "json" | "form" = "form"): Promise<T> => {
      return request(url, "POST", body, contentType);
    },
    [request]
  );

  const put = useCallback(
    (url: string, body?: any, contentType: "json" | "form" = "form"): Promise<T> => {
      return request(url, "PUT", body, contentType);
    },
    [request]
  );

  const patch = useCallback(
    (url: string, body?: any, contentType: "json" | "form" = "form"): Promise<T> => {
      return request(url, "PATCH", body, contentType);
    },
    [request]
  );

  const del = useCallback(
    (url: string, customOptions?: FetchOptions): Promise<T> => {
      return request(url, "DELETE", undefined, "json", customOptions);
    },
    [request]
  );

  // Auto-fetch si se proporciona endpoint inicial
  useEffect(() => {
    if (endpoint) {
      get(endpoint).catch((err) => {
        console.error("Auto-fetch error:", err);
      });
    }
  }, [endpoint, get]);

  // Refetch manual
  const refetch = useCallback(async (): Promise<T | null> => {
    if (!endpoint) return null;
    try {
      return await get(endpoint);
    } catch (err) {
      console.error("Refetch error:", err);
      return null;
    }
  }, [endpoint, get]);

  // Reset del estado
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    get,
    post,
    put,
    patch,
    delete: del,
    refetch,
    reset,
  };
}
