import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useClients } from "../hooks/useClients";
import { useVisits } from "../hooks/useVisits";
import VisitCard from "../components/card/VisitCard";

function VisitsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const clientFromUrl = searchParams.get("client");
  const [selectedClient, setSelectedClient] = useState(
    clientFromUrl ? parseInt(clientFromUrl) : null
  );
  const {
    data: clients,
    isLoading: clientsLoading,
    isError: clientsError,
    error,
  } = useClients();
  const {
    data: clientVisits,
    isLoading: visitsLoading,
    isError: visitsError,
    error: visitsErrorMessage,
  } = useVisits(selectedClient);

  if (clientsLoading) {
    return (
      <section className="section">
        <div className="container">
          <p>Loading clients...</p>
        </div>
      </section>
    );
  }

  if (clientsError) {
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
        <div className="level mb-5">
          <div className="level-left">
            <div className="level-item">
              <h1 className="title">Visits</h1>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <button
                className="button is-primary"
                onClick={() => navigate("/visits/new")}
              >
                + New Visit
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="block">
          <div className="field">
            <label className="label">Select Client:</label>
            <div className="control">
              <div className="select is-quarterwidth">
                <select
                  value={selectedClient || ""}
                  onChange={(e) => {
                    const selectedClientId = e.target.value;
                    setSelectedClient(parseInt(selectedClientId));
                  }}
                >
                  <option value="">Please select a client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        {selectedClient === null ? (
          <p>Please select a client to view visits</p>
        ) : visitsLoading ? (
          <p>Loading visits...</p>
        ) : visitsError ? (
          <div className="notification is-danger">
            {" "}
            Error loading visits: {visitsErrorMessage.message}
          </div>
        ) : (
          <div className="columns is-multiline">
            {clientVisits.map((visit) => (
              <div
                key={visit.id}
                className="column is-one-third-tablet is-full-mobile"
              >
                <VisitCard visit={visit} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default VisitsPage;
