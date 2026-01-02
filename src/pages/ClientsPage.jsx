import { Link, useNavigate } from "react-router-dom";
import { useClients } from "../hooks/useClients";

function ClientsPage() {
  const { data: clients, isLoading, isError, error } = useClients();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <section className="section">
        <div className="container">
          <p>Loading clients...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="section">
        <div className="container">
          <div className="notification is-danger">Error: {error.message}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="level">
          <div className="level-left">
            <h2 className="title">Clients</h2>
          </div>
          <div className="level-right">
            <Link to="/clients/new" className="button is-primary">
              New Client
            </Link>
          </div>
        </div>

        <div className="columns is-multiline">
          {clients.map((client) => (
            <div
              key={client.id}
              className="column is-one-third-tablet is-full-mobile"
            >
              <Link
                to={`/clients/${client.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="box" style={{ height: "100%" }}>
                  <h2 className="subtitle">{client.name}</h2>
                  <p>Email: {client.email}</p>
                  <p>Phone: {client.phone_number}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClientsPage;
