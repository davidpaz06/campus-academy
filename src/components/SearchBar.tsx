import { useState } from "react";
import { Icon } from "@iconify/react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  variant?: "default" | "compact" | "expanded";
  disabled?: boolean;
  autoFocus?: boolean;
}

export default function SearchBar({
  placeholder = "Buscar...",
  onSearch,
  className = "",
  variant = "default",
  disabled = false,
  autoFocus = false,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(variant === "expanded");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleExpanded = () => {
    if (variant === "compact") {
      setIsExpanded(!isExpanded);
    }
  };

  const baseClasses = "search-bar";
  const variantClasses = {
    default: "",
    compact: "search-bar--compact",
    expanded: "search-bar--expanded",
  };

  return (
    <form className={`${baseClasses} ${variantClasses[variant]} ${className}`} onSubmit={handleSubmit}>
      <div className="search-bar__container">
        {variant === "compact" && !isExpanded && (
          <button type="button" className="search-bar__toggle" onClick={toggleExpanded} disabled={disabled}>
            <Icon icon="material-symbols:search" />
          </button>
        )}

        {(variant !== "compact" || isExpanded) && (
          <>
            <div className="search-bar__input-container">
              <Icon icon="material-symbols:search" className="search-bar__icon" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="search-bar__input"
                disabled={disabled}
                autoFocus={autoFocus}
              />
              {query && (
                <button type="button" className="search-bar__clear" onClick={() => setQuery("")} disabled={disabled}>
                  <Icon icon="material-symbols:close" />
                </button>
              )}
            </div>

            <button type="submit" className="search-bar__submit" disabled={disabled || !query.trim()}>
              <Icon icon="material-symbols:search" />
              <span>Buscar</span>
            </button>
          </>
        )}
      </div>
    </form>
  );
}
