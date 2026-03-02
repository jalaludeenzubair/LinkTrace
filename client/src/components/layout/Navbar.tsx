import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { linkService } from "../../api/linkService";
import { useAuth } from "../../context/Auth";

interface NavbarProps {
  onCreateClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCreateClick }) => {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <a href="/dashboard" className="navbar-logo">
            LinkTrace
          </a>
          <div className="navbar-actions">
            <a
              href="/dashboard"
              className="nav-link"
              style={{
                textDecoration: "none",
                color: "var(--color-text)",
                fontWeight: 500,
              }}
            >
              Dashboard
            </a>
            <a
              href="/dashboard/settings"
              className="nav-link"
              style={{
                textDecoration: "none",
                color: "var(--color-text)",
                fontWeight: 500,
              }}
            >
              Settings
            </a>
          </div>
        </div>
        <div className="navbar-actions">
          {user?.flags.includes("createLink") && (
            <button className="btn btn-primary" onClick={onCreateClick}>
              <span>+</span> Create Link
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
