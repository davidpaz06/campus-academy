import { Link } from "react-router-dom";
import "./ExternalHeader.css";

const ExternalHeader = () => {
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
      </div>
    </header>
  );
};

export default ExternalHeader;
