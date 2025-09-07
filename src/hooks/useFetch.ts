import { useState, useEffect, useCallback } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface FetchOptions {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
  auto?: boolean;
}

interface UseFetchResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  get: (endpoint: string, options?: Omit<FetchOptions, "method">) => Promise<T | null>;
  post: (endpoint: string, options?: Omit<FetchOptions, "method">) => Promise<T | null>;
  put: (endpoint: string, options?: Omit<FetchOptions, "method">) => Promise<T | null>;
  patch: (endpoint: string, options?: Omit<FetchOptions, "method">) => Promise<T | null>;
  del: (endpoint: string, options?: Omit<FetchOptions, "method">) => Promise<T | null>;
  refetch: () => Promise<T | null>; // ✅ Nuevo: refetch manual
  reset: () => void; // ✅ Nuevo: resetear estado
}

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"; // ✅ URL base configurable

export function useFetch<T = any>(endpoint?: string, options?: FetchOptions): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ Función para obtener headers con auth automático
  const getHeaders = useCallback((customHeaders?: Record<string, string>) => {
    const token = localStorage.getItem("campus_auth_token");
    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`;
    }

    return { ...defaultHeaders, ...customHeaders };
  }, []);

  const fetchData = useCallback(
    async (url: string, method: HttpMethod = "GET", opts: Omit<FetchOptions, "method"> = {}): Promise<T | null> => {
      setLoading(true);
      setError(null);

      try {
        // ✅ URL completa con base
        const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;

        const fetchOptions: RequestInit = {
          method,
          headers: getHeaders(opts.headers),
        };

        // ✅ Solo agregar body si no es GET
        if (opts.body && method !== "GET") {
          fetchOptions.body = JSON.stringify(opts.body);
        }

        const res = await fetch(fullUrl, fetchOptions);

        // ✅ Manejo mejorado de errores
        if (!res.ok) {
          let errMessage = `HTTP ${res.status}: ${res.statusText}`;
          try {
            const errData = await res.json();
            errMessage = errData.message || errData.error || errMessage;
          } catch {
            // Si no es JSON, usar el statusText
          }
          throw new Error(errMessage);
        }

        // ✅ Verificar si hay contenido antes de parsear JSON
        const contentType = res.headers.get("content-type");
        let result: T;

        if (contentType && contentType.includes("application/json")) {
          result = await res.json();
        } else {
          // ✅ Para respuestas sin contenido (ej: DELETE)
          result = (res.status === 204 ? null : await res.text()) as T;
        }

        setData(result);
        return result;
      } catch (err: any) {
        const errorMessage = err.message || "Error fetching data";
        setError(errorMessage);
        setData(null);

        // ✅ Log del error en desarrollo
        if (import.meta.env.DEV) {
          console.error("useFetch error:", errorMessage);
        }

        return null;
      } finally {
        setLoading(false);
      }
    },
    [getHeaders]
  );

  // ✅ Métodos con mejor nomenclatura
  const get = useCallback(
    (url: string, opts?: Omit<FetchOptions, "method">) => fetchData(url, "GET", opts),
    [fetchData]
  );

  const post = useCallback(
    (url: string, opts?: Omit<FetchOptions, "method">) => fetchData(url, "POST", opts),
    [fetchData]
  );

  const put = useCallback(
    (url: string, opts?: Omit<FetchOptions, "method">) => fetchData(url, "PUT", opts),
    [fetchData]
  );

  const patch = useCallback(
    (url: string, opts?: Omit<FetchOptions, "method">) => fetchData(url, "PATCH", opts),
    [fetchData]
  );

  const del = useCallback(
    (url: string, opts?: Omit<FetchOptions, "method">) => fetchData(url, "DELETE", opts),
    [fetchData]
  );

  // ✅ Refetch del endpoint original
  const refetch = useCallback(() => {
    if (!endpoint) return Promise.resolve(null);
    return get(endpoint, options);
  }, [endpoint, options, get]);

  // ✅ Reset del estado
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  // ✅ Auto-fetch mejorado
  useEffect(() => {
    if (endpoint && options?.auto !== false) {
      get(endpoint, options);
    }
  }, [endpoint, get]); // ✅ Dependencias correctas

  return {
    data,
    error,
    loading,
    get,
    post,
    put,
    patch,
    del,
    refetch,
    reset,
  };
}
