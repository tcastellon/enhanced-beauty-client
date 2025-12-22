import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar is-primary">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <strong>Enhanced Beauty</strong>
        </Link>
      </div>

      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to="/clients" className="navbar-item">
            Clients
          </Link>
          <Link to="/visits" className="navbar-item">
            Visits
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <button className="button is-light">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
