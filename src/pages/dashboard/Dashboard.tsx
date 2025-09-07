import { Icon } from "@iconify/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2 className="dashboard-institution">Liceo Los Robles</h2>
        <div className="dashboard-search">buscar 🔍</div>
        <div className="dashboard-header-options">
          <button>Upgrade Campus</button>
          <h3 className="dashboard-username">username</h3>
          <Icon
            icon="mdi:account"
            style={{
              backgroundColor: "#fff",
              borderRadius: "50%",
              padding: "5px",
              color: "var(--charlestone-green)",
              height: "48px",
              width: "48px",
            }}
          />
        </div>
      </header>
      <aside className="dashboard-sidebar">
        <nav>
          <ul>
            <li className={location.pathname === "/dashboard" ? "active" : ""} onClick={() => navigate("/dashboard")}>
              <Icon icon="material-symbols:home-outline-rounded" width="32" height="32" />
            </li>
          </ul>
        </nav>
        <div className="dashboard-sidebar-options">
          <ul>
            <li className={location.pathname === "/settings" ? "active" : ""} onClick={() => navigate("/settings")}>
              <Icon icon="material-symbols:settings-outline-rounded" width="32" height="32" />
            </li>
            <li>
              <Icon
                icon="material-symbols:logout-rounded"
                width="32"
                height="32"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              />
            </li>
          </ul>
        </div>
      </aside>
      <main className="dashboard-main">
        <div className="dashboard-content">
          <h1>Campus dashboard</h1>
          <section className="dashboard">
            <h2>Dashboard</h2>
            <p>Is there something specific you’re looking for? Ask Xavier about it.</p>
            <div className="search-box">
              <textarea
                className="search-input"
                placeholder="Tell Xavier exactly what and how you would like to learn?"
              />
              <button className="search-btn">Search</button>
            </div>
          </section>
          <section className="explore">
            <h2>Explore Campus</h2>
            <div className="module-options">
              <div className="module-card" onClick={() => navigate("/academy")}>
                <h3 className="academy">Academy</h3>
                <p>Start your own academy by creating multiple courses and lectures for all your students.</p>
              </div>
              <div className="module-card" onClick={() => navigate("/xavier")}>
                <h3 className="xavier">Xavier AI</h3>
                <p>
                  Meet Xavier, your personal AI tutor. Get help with your studies, ask questions, and receive instant
                  feedback.
                </p>
              </div>
              <div className="module-card" onClick={() => navigate("/threads")}>
                <h3 className="threads">Threads</h3>
                <p>Engage in discussions, share resources, and collaborate with your peers in real-time.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
