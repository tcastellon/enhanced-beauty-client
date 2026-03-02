import { Link, useNavigate } from "react-router-dom";
import { useLogout, useIsAuthenticated } from "../../hooks/useAuth";
import { useState } from "react";

function Navbar() {
  const logout = useLogout();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar is-primary">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <strong>Enhanced Beauty</strong>
        </Link>

        <a
          role="button"
          className={`navbar-burger ${isMenuOpen ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className={`navbar-menu ${isMenuOpen ? "is-active" : ""}`}>
        <div className="navbar-start">
          <Link to="/clients" className="navbar-item">
            Clients
          </Link>
          <Link to="/visits" className="navbar-item">
            Visits
          </Link>
        </div>

        {isAuthenticated && (
          <div className="navbar-end">
            <div className="navbar-item">
              <button
                className={`button is-light ${
                  logout.isLoading ? "is-loading" : ""
                }`}
                onClick={handleLogout}
                disabled={logout.isLoading}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
