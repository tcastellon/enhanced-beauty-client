import { useParams, Link, useNavigate } from "react-router-dom";
import { useClient, useDeleteClient } from "../hooks/useClients";

function ClientDetailsPage() {
  const { id } = useParams();
  const { data: client, isLoading, isError, error } = useClient(id);
  const navigate = useNavigate();
  const deleteClient = useDeleteClient();

  if (isLoading) {
    return (
      <section className="section">
        <div className="container">
          <p>Loading client...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="section">
        <div className="container">
          <p>Error: {error.message}</p>
        </div>
      </section>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${client.name}?`)) {
      deleteClient.mutate(id, {
        onSuccess: () =>
          navigate("/clients"),
      });
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="level">
          <div>
            <Link to="/clients" className="button is-light mb-4">
              ← Back to Clients
            </Link>
          </div>
          <div className="buttons">
            <Link to={`/clients/${id}/edit`} className="button is-primary">
              Edit Client
            </Link>

            <button
              className="button is-danger"
              onClick={handleDelete}
              disabled={deleteClient.isPending}
            >
              Delete Client
            </button>
          </div>
        </div>

        <div className="box">
          <h1 className="title">{client.name}</h1>
          <hr />

          <div className="mb-5">
            <h2 className="subtitle is-5">Contact Information</h2>
            <div className="columns">
              <div className="column">
                <p>
                  <strong>Email:</strong> {client.email}
                </p>
                <p>
                  <strong>Phone:</strong> {client.phone_number}
                </p>
              </div>
              <div className="column">
                <p>
                  <strong>Date of Birth:</strong> {client.date_of_birth}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <h2 className="subtitle is-5">Address</h2>
            <p>{client.street_address}</p>
            <p>
              {client.city}, {client.state} {client.zip_code}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientDetailsPage;
