import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  useVisit,
  useUpdateVisit,
  useVisitServices,
  useDeleteVisit,
} from "../hooks/useVisits";
import { useClients } from "../hooks/useClients";
import { api } from "../utils/api";

const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  return dateString.replace("Z", "").split(".")[0].slice(0, 16);
};

function EditVisitPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: visit,
    isLoading: visitLoading,
    isError: visitError,
  } = useVisit(id);
  const { data: clients, isLoading: clientsLoading } = useClients();
  const { data: visitServices, isLoading: visitServicesLoading } =
    useVisitServices(id);
  const updateVisit = useUpdateVisit();
  const deleteVisit = useDeleteVisit();

  const [formData, setFormData] = useState(() => {
    if (visit) {
      return {
        visit_date: formatDateForInput(visit.visit_date),
        note_content: visit.note_content,
      };
    }
    return {
      visit_date: "",
      note_content: "",
    };
  });

  useEffect(() => {
    if (visit) {
      setFormData((prev) => ({
        ...prev,
        visit_date: formatDateForInput(visit.visit_date),
        note_content: visit.note_content,
      }));
    }
  }, [visit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const visitData = {
        client: visit.client,
        visit_date: formData.visit_date,
        note_content: formData.note_content,
      };

      await updateVisit.mutateAsync({ id, data: visitData });
      navigate(`/dashboard/visits?client=${visit.client}`);
    } catch (error) {
      console.error("Error updating visit:", error);
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this visit? This action cannot be undone."
      )
    ) {
      try {
        await deleteVisit.mutateAsync(id);
        navigate(`/dashboard/visits?client=${visit.client}`);
      } catch (error) {
        console.error("Error deleting visit:", error);
      }
    }
  };

  if (visitLoading || clientsLoading || visitServicesLoading) {
    return (
      <section className="section">
        <div className="container">
          <p>Loading visit data...</p>
        </div>
      </section>
    );
  }

  if (visitError) {
    return (
      <section className="section">
        <div className="container">
          <div className="notification is-danger">Error loading visit</div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="level mb-4">
          <div className="level-left">
            <div className="level-item">
              <Link
                to={`/dashboard/visits?client=${visit?.client}`}
                className="button is-light"
              >
                ← Back to Visits
              </Link>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <button
                type="button"
                className={`button is-danger ${
                  deleteVisit.isPending ? "is-loading" : ""
                }`}
                onClick={handleDelete}
                disabled={deleteVisit.isPending}
              >
                Delete Visit
              </button>
            </div>
          </div>
        </div>
        
        <div className="box">
          <h1 className="title">Edit Visit</h1>
          <hr />

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Client</label>
              <p className="subtitle is-5">
                {clients?.find((c) => c.id === visit?.client)?.name ||
                  "Loading..."}
              </p>
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
                  placeholder="Visit notes..."
                  name="note_content"
                  value={formData.note_content}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>

            <div className="field">
              <label className="label">Services Performed</label>
              <div className="content">
                {visitServices && visitServices.length > 0 ? (
                  <ul>
                    {visitServices.map((visitService) => (
                      <li key={visitService.id}>{visitService.service_name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No services recorded for this visit</p>
                )}
              </div>
            </div>

            <div className="field is-grouped">
              <button
                type="submit"
                className={`button is-primary ${
                  updateVisit.isPending ? "is-loading" : ""
                }`}
                disabled={updateVisit.isPending}
              >
                Update Visit
              </button>
              <Link
                to={`/dashboard/visits?client=${visit?.client}`}
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

export default EditVisitPage;
