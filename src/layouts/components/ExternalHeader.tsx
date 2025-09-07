import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import "./ExternalHeader.css";

interface ExternalHeaderProps {
  options?: boolean;
}

export default function ExternalHeader({ options = false }: ExternalHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="external-header">
      <div className="header-content">
        <div className="logo-section">
          <Link to="/" className="logo-link">
            <h1 className="logo">Campus</h1>
          </Link>
        </div>
        <nav className="nav">
          <Link to="/products" className="nav-link">
            Products
          </Link>
          <Link to="/solutions" className="nav-link">
            Solutions
          </Link>
          <Link to="/community" className="nav-link">
            Community
          </Link>
          <Link to="/docs" className="nav-link">
            Documentation
          </Link>
          <Link to="/pricing" className="nav-link">
            Pricing
          </Link>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
        </nav>
        <div className="header-options">
          {options ? (
            <div className="options">
              <button onClick={() => navigate("/login")}>Enter Campus</button>
              <Icon className="user-avatar" icon="material-symbols:person-rounded" onClick={() => navigate("/login")} />
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
