import { Icon } from "@iconify/react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="sidebar-modal">
      <div className="sidebar-header">
        <h1>Academy</h1>
      </div>
      <div className="sidebar-content">
        <ul>
          <li className={location.pathname === "/dashboard" ? "active" : ""}>
            <a href="/dashboard">Return to hub</a>
          </li>
          <li className={location.pathname === "/academy" ? "active" : ""}>
            <a href="/academy">Academy</a>
          </li>
          <li className={location.pathname === "/create-course" ? "active" : ""}>
            <a href="/create-course">Create Course</a>
          </li>
          <li className={location.pathname === "/courses" ? "active" : ""}>Browse Courses</li>
          <li className={location.pathname === "/xavier" ? "active" : ""}>Xavier</li>
        </ul>
      </div>

      <div className="sidebar-options">
        <Icon
          className={`option${location.pathname === "/" ? " active" : ""}`}
          icon="material-symbols:logout-rounded"
          onClick={() => {
            logout();
            navigate("/");
          }}
        />
        <Icon
          className={`option${location.pathname === "/settings" ? " active" : ""}`}
          icon="material-symbols:settings-rounded"
          onClick={() => navigate("/settings")}
        />
      </div>
    </div>
  );
}
