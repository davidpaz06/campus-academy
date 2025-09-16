import { Icon } from "@iconify/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/user";
import SearchBar from "@/components/SearchBar"; // ✅ Importar el nuevo componente
import { useSearchCourseAI } from "@/hooks/useSearchCourseAI";
import { useState } from "react"; // Agregar useState para manejar el input del textarea
import "./Dashboard.css";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { search, loading, error, data } = useSearchCourseAI();
  const [searchQuery, setSearchQuery] = useState(""); // Estado para el input del textarea

  const getDisplayName = (user: User | null) => {
    if (!user) return "";
    if (user.username) return user.username; // ✅ Aquí se utiliza el username de las cookies
    return `User ${user.campusUserId.slice(-4)}`;
  };

  const handleSearch = (query: string) => {
    search(query);
  };

  // ✅ Función para obtener el nombre de la institución (desde cookies)
  const getInstitutionName = (user: User | null) => {
    return user?.institutionName || "Campus";
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2 className="dashboard-institution">{getInstitutionName(user)}</h2>
        <div className="dashboard-search">
          <SearchBar placeholder="Buscar en el campus..." onSearch={handleSearch} />
        </div>
        <div className="dashboard-header-options">
          <h3 className="dashboard-username">{getDisplayName(user)}</h3>
          <div className="user-avatar">
            <Icon icon="mdi:account" width="32" height="32" />
          </div>
        </div>
      </header>

      <aside className="dashboard-sidebar">
        <nav className="sidebar-nav">
          <ul>
            <li
              className={location.pathname === "/dashboard" ? "active" : ""}
              onClick={() => navigate("/dashboard")}
              title="Dashboard"
            >
              <Icon icon="material-symbols:home-outline-rounded" width="24" height="24" />
            </li>
            {/* Agregar más items de navegación si es necesario */}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <ul>
            <li
              className={location.pathname === "/settings" ? "active" : ""}
              onClick={() => navigate("/settings")}
              title="Settings"
            >
              <Icon icon="material-symbols:settings-outline-rounded" width="24" height="24" />
            </li>
            <li
              onClick={() => {
                logout();
                navigate("/");
              }}
              title="Logout"
            >
              <Icon icon="material-symbols:logout-rounded" width="24" height="24" />
            </li>
          </ul>
        </div>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-content">
          <section className="dashboard-welcome">
            <h2>Dashboard</h2>
            <p>¿Hay algo específico que estés buscando? Pregúntale a Xavier al respecto.</p>
            <div className="search-box">
              <textarea
                className="search-input"
                placeholder="Dile a Xavier exactamente qué y cómo te gustaría aprender"
                rows={3}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="search-btn" onClick={() => handleSearch(searchQuery)} disabled={loading}>
                {loading ? (
                  <Icon icon="material-symbols:refresh" className="spin" width="20" height="20" />
                ) : (
                  <Icon icon="material-symbols:search" width="20" height="20" />
                )}
                {loading ? "Buscando..." : "Buscar"}
              </button>
            </div>
          </section>

          {data ? (
            loading ? (
              <LoadingSpinner />
            ) : (
              <section className="search-results-section">
                <h2>Suggestions for you</h2>
                {error && <p className="error-message">Error: {error}</p>}
                {data && data.data && data.data.response && (
                  <div className="search-results">
                    <div
                      className="ai-response"
                      dangerouslySetInnerHTML={{ __html: formatMarkdown(data.data.response) }}
                    />
                  </div>
                )}
              </section>
            )
          ) : null}

          <section className="explore-section">
            <h2>Explorar Campus</h2>
            <div className="module-options">
              <div className="module-card academy-card" onClick={() => navigate("/academy")}>
                <div className="card-icon">
                  <Icon icon="material-symbols:school-rounded" width="32" height="32" />
                </div>
                <h3>Academy</h3>
                <p>Crea tu propia academia creando múltiples cursos y conferencias para todos tus estudiantes.</p>
              </div>

              <div className="module-card xavier-card" onClick={() => navigate("/xavier")}>
                <div className="card-icon">
                  <Icon icon="material-symbols:smart-toy-rounded" width="32" height="32" />
                </div>
                <h3>Xavier AI</h3>
                <p>
                  Conoce a Xavier, tu tutor de IA personal. Obtén ayuda con tus estudios, haz preguntas y recibe
                  retroalimentación instantánea.
                </p>
              </div>

              <div className="module-card threads-card" onClick={() => navigate("/threads")}>
                <div className="card-icon">
                  <Icon icon="material-symbols:forum-rounded" width="32" height="32" />
                </div>
                <h3>Threads</h3>
                <p>Participa en discusiones, comparte recursos y colabora con tus compañeros en tiempo real.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

// Función simple para convertir markdown básico a HTML (puedes usar una librería como react-markdown para mejor soporte)
function formatMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Negritas
    .replace(/\| (.*?) \|/g, "<td>$1</td>") // Celdas de tabla simples (básico, no perfecto)
    .replace(/\n/g, "<br>"); // Saltos de línea
}
