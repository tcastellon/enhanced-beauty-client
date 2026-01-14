import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { useClients } from "../hooks/useClients";
import { useServices } from "../hooks/useServices";
import { useCreateVisit } from "../hooks/useVisits";
import { api } from "../utils/api";

function VisitFormPage() {
  const navigate = useNavigate();
  const { data: clients, isLoading: clientsLoading } = useClients();
  const { data: allServices, isLoading: servicesLoading } = useServices();
  const queryClient = useQueryClient();
  const createVisit = useCreateVisit();

  const [formData, setFormData] = useState({
    client_id: "",
    visit_date: "",
    note_content: "",
    selected_services: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceChange = (serviceId) => {
    setFormData((prev) => ({
      ...prev,
      selected_services: prev.selected_services.includes(serviceId)
        ? prev.selected_services.filter((id) => id !== serviceId)
        : [...prev.selected_services, serviceId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const visitData = {
        client: parseInt(formData.client_id),
        visit_date: formData.visit_date,
        note_content: formData.note_content,
      };

      const result = await createVisit.mutateAsync(visitData);
      const newVisitId = result.id;

      if (formData.selected_services.length > 0) {
        for (const serviceId of formData.selected_services) {
          await api.post("/visitservices/", {
            visit: parseInt(newVisitId),
            service: parseInt(serviceId),
          });
        }
      }
      queryClient.invalidateQueries({ queryKey: ['visits'] })

      navigate(`/visits?client=${formData.client_id}`);
    } catch (error) {
      console.error("Error creating visit:", error);
    }
  };

  if (clientsLoading || servicesLoading) {
    return (
      <section className="section">
        <div className="container">
          <p>Loading form data...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <Link to="/visits" className="button is-light mb-4">
          ← Back to Visits
        </Link>

        <div className="box">
          <h1 className="title">New Visit</h1>
          <hr />

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Client</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    name="client_id"
                    value={formData.client_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a client</option>
                    {clients?.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Visit Date & Time</label>
              <div className="control">
                <input
                  className="input"
                  type="datetime-local"
                  name="visit_date"
                  value={formData.visit_date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Notes</label>
              <div className="control">
                <textarea
                  className="textarea"
                  name="note_content"
                  value={formData.note_content}
                  onChange={handleChange}
                  placeholder="Visit notes..."
                  rows="4"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Services</label>
              <div className="control">
                {allServices?.map((service) => (
                  <label
                    key={service.id}
                    className="checkbox"
                    style={{ display: "block", marginBottom: "0.5rem" }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.selected_services.includes(service.id)}
                      onChange={() => handleServiceChange(service.id)}
                      style={{ marginRight: "1rem" }}
                    />
                    {""}
                    {service.name}
                  </label>
                ))}
              </div>
            </div>

            <div className="field is-grouped">
              <button
                type="submit"
                className={`button is-primary ${
                  createVisit.isPending ? "is-loading" : ""
                }`}
                disabled={createVisit.isPending}
              >
                Create Visit
              </button>
              <Link to="/visits" className="button is-light">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default VisitFormPage;
