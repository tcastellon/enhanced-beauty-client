import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useClient, useUpdateClient } from "../hooks/useClients";

function EditClientPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: client,
    isLoading: clientLoading,
    isError: clientError,
  } = useClient(id);
  const updateClient = useUpdateClient();

  const [formData, setFormData] = useState(() => {
    if (client) {
      return {
        name: client.name,
        email: client.email,
        phone_number: client.phone_number,
        street_address: client.street_address,
        city: client.city,
        state: client.state,
        zip_code: client.zip_code,
        date_of_birth: client.date_of_birth,
      };
    }
    return {
      name: "",
      email: "",
      phone_number: "",
      street_address: "",
      city: "",
      state: "",
      zip_code: "",
      date_of_birth: "",
    };
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
    updateClient.mutate(
      { id, data: formData },
      {
        onSuccess: () => navigate(`/clients/${id}`),
      }
    );
  };

  if (clientLoading) {
    return (
      <section className="section">
        <div className="container">
          <p>Loading client data...</p>
        </div>
      </section>
    );
  }

  if (clientError) {
    return (
      <section className="section">
        <div className="container">
          <div className="notification is-danger">Error loading client</div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <Link to={`/clients/${id}`} className="button is-light mb-4">
          ← Back to Client
        </Link>

        <div className="box">
          <h1 className="title">Edit Client</h1>
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
                  updateClient.isPending ? "is-loading" : ""
                }`}
                disabled={updateClient.isPending}
              >
                Update Client
              </button>
              <Link to={`/clients/${id}`} className="button is-light">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default EditClientPage;
