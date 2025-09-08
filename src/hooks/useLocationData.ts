import { useState, useEffect, useMemo } from "react"; // ✅ Solo agregar useMemo

interface Country {
  id: number;
  name: string;
  iso2: string;
  iso3: string;
  phonecode: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  region: string;
  subregion: string;
}

interface State {
  id: number;
  name: string;
  country_id: number;
  country_code: string;
  iso2: string;
  type: string;
  latitude: string;
  longitude: string;
}

interface City {
  id: number;
  name: string;
  state_id: number;
  state_code: string;
  country_id: number;
  country_code: string;
  latitude: string;
  longitude: string;
}

// ✅ Agregar interface para phoneCountries
interface PhoneCountry {
  code: string;
  name: string;
  prefix: string;
  numericCode: number;
}

interface UseLocationDataResult {
  countries: Country[];
  states: State[];
  cities: City[];
  phoneCountries: PhoneCountry[]; // ✅ Solo agregar esta línea
  loading: boolean;
  error: string | null;
  loadStatesForCountry: (countryCode: string) => Promise<void>;
  loadCitiesForState: (countryCode: string, stateCode: string) => Promise<void>;
}

const API_KEY = import.meta.env.VITE_LOCATION_API_KEY || "";
const BASE_URL = "https://api.countrystatecity.in/v1";

export function useLocationData(): UseLocationDataResult {
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Agregar función para generar lista de prefijos únicos
  const phoneCountries = useMemo(() => {
    const uniquePrefixes = new Map();

    countries
      .filter((country) => country.phonecode)
      .forEach((country) => {
        const prefix = `+${country.phonecode}`;
        const numericCode = parseInt(country.phonecode);

        // Solo agregar si no existe o si el nombre del país es más corto (preferencia)
        if (!uniquePrefixes.has(prefix) || country.name.length < uniquePrefixes.get(prefix).name.length) {
          uniquePrefixes.set(prefix, {
            code: country.iso2,
            name: country.name,
            prefix: prefix,
            numericCode: numericCode,
          });
        }
      });

    // Convertir Map a array y ordenar por valor numérico
    return Array.from(uniquePrefixes.values()).sort((a, b) => a.numericCode - b.numericCode);
  }, [countries]);

  // Función para hacer fetch con la estructura exacta de la API
  const fetchLocationData = async (endpoint: string) => {
    const headers = new Headers();
    headers.append("X-CSCAPI-KEY", API_KEY);

    const requestOptions: RequestInit = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, requestOptions);
      const result = await response.text();

      // Verificar si hay error de autorización
      if (result.includes("Unauthorized")) {
        throw new Error("API Key is invalid or missing");
      }

      return JSON.parse(result);
    } catch (err: any) {
      console.error("API Error:", err);
      throw err;
    }
  };

  // Cargar todos los países al montar
  useEffect(() => {
    const loadCountries = async () => {
      if (!API_KEY) {
        setError("API Key is required");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await fetchLocationData("/countries");
        setCountries(result);
      } catch (err: any) {
        setError(err.message || "Error loading countries");
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  // Cargar estados de un país específico usando: /countries/{countryCode}/states
  const loadStatesForCountry = async (countryCode: string) => {
    if (!countryCode || !API_KEY) return;

    setLoading(true);
    setError(null);

    try {
      const result = await fetchLocationData(`/countries/${countryCode}/states`);
      setStates(result);
      // Limpiar ciudades cuando cambia el país
      setCities([]);
    } catch (err: any) {
      setError(err.message || "Error loading states");
      setStates([]);
    } finally {
      setLoading(false);
    }
  };

  // Cargar ciudades de un estado específico usando: /countries/{countryCode}/states/{stateCode}/cities
  const loadCitiesForState = async (countryCode: string, stateCode: string) => {
    if (!countryCode || !stateCode || !API_KEY) return;

    setLoading(true);
    setError(null);

    try {
      const result = await fetchLocationData(`/countries/${countryCode}/states/${stateCode}/cities`);
      setCities(result);
    } catch (err: any) {
      setError(err.message || "Error loading cities");
      setCities([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    countries,
    states,
    cities,
    phoneCountries, // ✅ Solo agregar esta línea
    loading,
    error,
    loadStatesForCountry,
    loadCitiesForState,
  };
}
