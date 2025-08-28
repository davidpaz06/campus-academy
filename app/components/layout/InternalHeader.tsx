import { Icon } from "@iconify/react";
import "./InternalHeader.css";
import { useState, useRef } from "react";
import Sidebar from "./Sidebar";

const InternalHeader = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

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
          <h2>Liceo Los Robles</h2>
        </div>
        <div className="header-search">
          {/* <SearchComponent /> */}
          <input
            type="text"
            className="header-search-input"
            placeholder="<<<<< Crear componente search >>>>>"
          />
          <button className="header-search-btn" aria-label="search">
            <Icon icon="material-symbols:search-rounded" />
          </button>
        </div>
        <div className="header-options">
          <button className="upgrade-btn">Upgrade Campus</button>
          <h3 className="user-name">davidpaz06</h3>
          <Icon
            className="user-avatar"
            icon="material-symbols:person-rounded"
          />
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
};

export default InternalHeader;
