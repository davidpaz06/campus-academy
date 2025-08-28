import { Icon } from "@iconify/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Card from "@/components/Card";
import "./Hub.css";

export default function Hub() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <div className="hub-container">
      <header className="hub-header">
        <h2 className="hub-institution">Liceo Los Robles</h2>
        <div className="hub-search">buscar 🔍</div>
        <div className="hub-header-options">
          <button>Upgrade Campus</button>
          <h3 className="hub-username">username</h3>
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
      <aside className="hub-sidebar">
        <nav>
          <ul>
            <li
              className={location.pathname === "/dashboard" ? "active" : ""}
              onClick={() => navigate("/dashboard")}
            >
              <Icon
                icon="material-symbols:home-outline-rounded"
                width="32"
                height="32"
              />
            </li>
          </ul>
        </nav>
        <div className="hub-sidebar-options">
          <ul>
            <li
              className={location.pathname === "/settings" ? "active" : ""}
              onClick={() => navigate("/settings")}
            >
              <Icon
                icon="material-symbols:settings-outline-rounded"
                width="32"
                height="32"
              />
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
      <main className="hub-main">
        <div className="hub-content">
          <h1>Campus Hub</h1>
          <section className="dashboard">
            <h2>Dashboard</h2>
            <p>
              Is there something specific you’re looking for? Ask Xavier about
              it.
            </p>
            <Card className="search-box">
              <textarea
                className="search-input"
                placeholder="Tell Xavier exactly what and how you would like to learn?"
              />
              <button className="search-btn">Search</button>
            </Card>
          </section>
          <section className="explore">
            <h2>Explore Campus</h2>
            <div className="module-options">
              <Card
                className="module-card"
                onClick={() => navigate("/academy")}
              >
                <h3 className="academy">Academy</h3>
                <p>
                  Start your own academy by creating multiple courses and
                  lectures for all your students.
                </p>
              </Card>
              <Card className="module-card" onClick={() => navigate("/xavier")}>
                <h3 className="xavier">Xavier AI</h3>
                <p>
                  Meet Xavier, your personal AI tutor. Get help with your
                  studies, ask questions, and receive instant feedback.
                </p>
              </Card>
              <Card
                className="module-card"
                onClick={() => navigate("/threads")}
              >
                <h3 className="threads">Threads</h3>
                <p>
                  Engage in discussions, share resources, and collaborate with
                  your peers in real-time.
                </p>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
