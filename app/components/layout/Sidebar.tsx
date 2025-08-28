import { Icon } from "@iconify/react";
import type { FC } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar: FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="sidebar-modal">
      <div className="sidebar-header">
        <h1>Academy</h1>
      </div>
      <div className="sidebar-content">
        <ul>
          <li>
            <a href="/academy">Return to hub</a>
          </li>
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>Browse Courses</li>
          <li>Xavier</li>
        </ul>
      </div>

      <div className="sidebar-options">
        <Icon
          className="option"
          icon="material-symbols:logout-rounded"
          onClick={() => {
            logout();
            navigate("/");
          }}
        />
        <Icon
          className="option"
          icon="material-symbols:settings-rounded"
          onClick={() => navigate("/settings")}
        />
      </div>
    </div>
  );
};

export default Sidebar;
