import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRegister } from "../hooks/useAuth";

function RegisterPage() {
  const navigate = useNavigate();
  const register = useRegister();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirm: "",
    first_name: "",
    last_name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.password_confirm) {
      alert("Passwords do not match!");
      return;
    }

    register.mutate(formData, {
      onSuccess: () => {
        alert("Registration successful! Please log in.");
        navigate("/login");
      },
      onError: (error) => {
        console.error("Registration failed:", error);
      },
    });
  };

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="box">
              <h1 className="title has-text-centered">Create Account</h1>

              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label">Username</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="columns">
                  <div className="column">
                    <div className="field">
                      <label className="label">First Name</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="field">
                      <label className="label">Last Name</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      className="input"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Confirm Password</label>
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      name="password_confirm"
                      value={formData.password_confirm}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <button
                      type="submit"
                      className={`button is-primary is-fullwidth ${
                        register.isPending ? "is-loading" : ""
                      }`}
                      disabled={register.isPending}
                    >
                      Create Account
                    </button>
                  </div>
                </div>

                {register.isError && (
                  <div className="notification is-danger">
                    {register.error?.message ||
                      "Registration failed. Please try again."}
                  </div>
                )}
              </form>

              <div className="has-text-centered mt-4">
                <p>
                  Already have an account? <Link to="/login">Sign in</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
