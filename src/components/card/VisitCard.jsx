import { Link } from "react-router-dom";
import { useVisitServices } from "../../hooks/useVisits";

function VisitCard({ visit }) {
  const {
    data: services,
    isLoading: servicesLoading,
    isError: servicesError,
    error,
  } = useVisitServices(visit.id);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Link to={`/visits/${visit.id}/edit`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="box" style={{ height: "100%" }}>
        <h2 className="subtitle">{formatDate(visit.visit_date)}</h2>
        <hr />

        {servicesLoading ? (
          <p>Loading services...</p>
        ) : servicesError ? (
          <p>Error loading services: {error.message} </p>
        ) : services && services.length > 0 ? (
          <ul>
            {services.map((service) => (
              <li key={service.id}>{service.service_name}</li>
            ))}
          </ul>
        ) : (
          <p>No services for this visit.</p>
        )}
        <br />

        <p>{visit.note_content}</p>
      </div>
    </Link>
  );
}

export default VisitCard;
