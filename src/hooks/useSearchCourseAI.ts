import { useState, useCallback } from "react";

interface SearchResult {
  // Define aquí la estructura esperada de la respuesta de la API
  // Ejemplo: courses: Course[]; o lo que devuelva la API
  [key: string]: any;
}

export const useSearchCourseAI = () => {
  const [data, setData] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/academy/courses/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "student",
              content: query,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en la búsqueda: ${response.statusText}`);
      }

      const result: SearchResult = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, search };
};
