import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCreateClient } from "../hooks/useClients";

function ClientFormPage() {
  const navigate = useNavigate();
  const createClient = useCreateClient();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
    date_of_birth: "",
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

    createClient.mutate(formData, {
      onSuccess: () => navigate("/dashboard/clients"),
    });
  };

  return (
    <section className="section">
      <div className="container">
        <Link to="/dashboard/clients" className="button is-light mb-4">
          ← Back to Clients
        </Link>

        <div className="box">
          <h1 className="title">New Client</h1>
          <hr />

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="First and Last Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Street Address</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="ex. 123 Main Street"
                  name="street_address"
                  value={formData.street_address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">City</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="ex. Nashville"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">State</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="ex. TN"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Zip Code</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="12345"
                  name="zip_code"
                  value={formData.zip_code}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Phone Number</label>
              <div className="control">
                <input
                  className="input"
                  type="tel"
                  placeholder="123-456-7890"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  placeholder="example@email.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Date of Birth</label>
              <div className="control">
                <input
                  className="input"
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field is-grouped">
              <button
                type="submit"
                className={`button is-primary ${
                  createClient.isPending ? "is-loading" : ""
                }`}
                disabled={createClient.isPending}
              >
                Create Client
              </button>
              <Link
                to="/dashboard/clients"
                className="button is-light"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ClientFormPage;
