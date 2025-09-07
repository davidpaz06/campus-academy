import { useState, useEffect, useRef, useCallback } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useFetch } from "@/hooks/useFetch";
import "./InstitutionSearch.css";

interface Institution {
  institutionId: string;
  institutionName: string;
}

interface ApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Institution[];
  timestamp: string;
}

interface InstitutionSearchProps {
  value?: string | null;
  onSelect: (institution: Institution | null) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function InstitutionSearch({
  value,
  onSelect,
  placeholder = "Search for an institution...",
  disabled = false,
}: InstitutionSearchProps) {
  const [query, setQuery] = useState("");
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 500);
  const containerRef = useRef<HTMLDivElement>(null);

  // Usar useFetch hook
  const { get, loading, error } = useFetch<ApiResponse>();

  // Función para buscar instituciones
  const searchInstitutions = async () => {
    if (!debouncedQuery.trim() || debouncedQuery.length < 2) {
      setInstitutions([]);
      setIsOpen(false);
      return;
    }

    try {
      const result = await get(
        `https://campus-api-gateway.onrender.com/api/institutions/search?name=${encodeURIComponent(debouncedQuery)}`
      );

      if (result?.success && result.data) {
        setInstitutions(result.data);
        setIsOpen(true);
      } else {
        setInstitutions([]);
        setIsOpen(false);
      }
    } catch (err) {
      setInstitutions([]);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    searchInstitutions();
  }, [debouncedQuery]);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    // Si borra todo, limpiar selección
    if (!newQuery.trim()) {
      setSelectedInstitution(null);
      onSelect(null);
    }
  };

  const handleSelectInstitution = (institution: Institution) => {
    setSelectedInstitution(institution);
    setQuery(institution.institutionName);
    setIsOpen(false);
    onSelect(institution);
  };

  const handleClearSelection = () => {
    setQuery("");
    setSelectedInstitution(null);
    setIsOpen(false);
    onSelect(null);
  };

  return (
    <div className="institution-search" ref={containerRef}>
      <div className="institution-search-input-container">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`institution-search-input ${selectedInstitution ? "selected" : ""}`}
          autoComplete="off"
        />

        {loading && (
          <div className="institution-search-loading">
            <span className="spinner">⟳</span>
          </div>
        )}

        {selectedInstitution && (
          <button type="button" onClick={handleClearSelection} className="institution-search-clear" disabled={disabled}>
            ✕
          </button>
        )}
      </div>

      {error && <div className="institution-search-error">{error}</div>}

      {isOpen && institutions.length > 0 && (
        <div className="institution-search-dropdown">
          {institutions.map((institution) => (
            <div
              key={institution.institutionId}
              className="institution-search-option"
              onClick={() => handleSelectInstitution(institution)}
            >
              <div className="institution-option-name">{institution.institutionName}</div>
              <div className="institution-option-details">ID: {institution.institutionId.slice(0, 8)}...</div>
            </div>
          ))}
        </div>
      )}

      {isOpen && !loading && institutions.length === 0 && debouncedQuery.length >= 2 && (
        <div className="institution-search-no-results">No institutions found for "{debouncedQuery}"</div>
      )}
    </div>
  );
}
