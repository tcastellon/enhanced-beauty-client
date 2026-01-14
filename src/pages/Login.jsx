import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    login.mutate(
      { username, password },
      {
        onSuccess: () => {
          navigate("/");
        },
      }
    );
  };

  return (
    <div className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-5-tablet is-4-desktop">
            <h1 className="title">Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={login.isLoading}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={login.isLoading}
                  />
                </div>
              </div>

              {login.isError && (
                <div className="notification is-danger is-light">
                  {login.error?.message || "Login failed"}
                </div>
              )}

              <div className="field">
                <div className="control">
                  <button
                    type="submit"
                    className={`button is-primary is-fullwidth ${
                      login.isLoading ? "is-loading" : ""
                    }`}
                    disabled={login.isLoading}
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>

            <div className="has-text-centered mt-4">
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
