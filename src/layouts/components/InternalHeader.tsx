import { Icon } from "@iconify/react";
import "./InternalHeader.css";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/user";
import { useState, useRef } from "react";
import Sidebar from "./Sidebar";

export default function InternalHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // ✅ Función para obtener el nombre de la institución (desde cookies)
  const getInstitutionName = (user: User | null) => {
    return user?.institutionName || "Campus";
  };

  const getDisplayName = (user: User | null) => {
    if (!user) return "";
    if (user.username) return user.username; // ✅ Aquí se utiliza el username de las cookies
    return `User ${user.campusUserId.slice(-4)}`;
  };

  return (
    <header className="internal-header">
      <div className="header-content-grid">
        <div className="header-icon">
          <Icon
            className="sidebar-icon"
            icon="material-symbols:left-panel-open-rounded"
            onClick={() => setSidebarOpen(true)}
          />
        </div>
        <div className="header-institution">
          <h2>{getInstitutionName(user)}</h2>
        </div>
        <div className="header-search">
          {/* <input type="text" className="header-search-input" placeholder="Crear componente search" />
          <button className="header-search-btn" aria-label="search">
            <Icon icon="material-symbols:search-rounded" />
          </button> */}
        </div>
        <div className="header-options">
          <button className="upgrade-btn">Upgrade Campus</button>
          <h3 className="user-name">{getDisplayName(user)}</h3>
          <Icon className="user-avatar" icon="material-symbols:person-rounded" />
        </div>
      </div>
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          ref={overlayRef}
          onClick={(e) => {
            if (e.target === overlayRef.current) setSidebarOpen(false);
          }}
        >
          <Sidebar />
        </div>
      )}
    </header>
  );
}
