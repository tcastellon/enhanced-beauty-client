import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  useClient,
  useCreateClient,
  useUpdateClient,
} from "../hooks/useClients";

function ClientFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const { data: client } = useClient(id, { enabled: !!id });
  const createClient = useCreateClient();
  const updateClient = useUpdateClient();

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

  useEffect(() => {
    if (isEditMode && client) {
      setFormData({
        name: client.name,
        email: client.email,
        phone_number: client.phone_number,
        street_address: client.street_address,
        city: client.city,
        state: client.state,
        zip_code: client.zip_code,
        date_of_birth: client.date_of_birth,
      });
    }
  }, [isEditMode, client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      updateClient.mutate(
        { id, data: formData },
        {
          onSuccess: () => navigate(`/clients/${id}`),
        }
      );
    } else {
      createClient.mutate(formData, {
        onSuccess: () => navigate("/clients"),
      });
    }
  };

  return (
    <section className="section">
      <div className="container">
        <Link
          to={isEditMode ? `/clients/${id}` : "/clients"}
          className="button is-light mb-4"
        >
          ← Back to {isEditMode ? "Client" : "Clients"}
        </Link>

        <div className="box">
          <h1 className="title">{isEditMode ? "Edit Client" : "New Client"}</h1>
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
                  isEditMode
                    ? updateClient.isPending
                      ? "is-loading"
                      : ""
                    : createClient.isPending
                    ? "is-loading"
                    : ""
                }`}
                disabled={isEditMode ? updateClient.isPending : createClient.isPending}
              >
                {isEditMode ? "Update Client" : "Create Client"}
              </button>
              <Link
                to={isEditMode ? `/clients/${id}` : "/clients"}
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
