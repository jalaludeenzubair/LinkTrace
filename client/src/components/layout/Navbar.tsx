import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { linkService } from "../../api/linkService";
import { useAuth } from "../../context/Auth";

interface NavbarProps {
  onCreateClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCreateClick }) => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await linkService.logout();
      logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to logout");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/dashboard" className="navbar-logo">
          LinkTrace
        </a>
        <div className="navbar-actions">
          <button className="btn btn-primary" onClick={onCreateClick}>
            <span>+</span> Create Link
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleLogout()}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </nav>
  );
};
