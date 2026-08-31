import useResources from "../../hooks/useResources";

function ResourceAllocation() {
  const { resources } = useResources();

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Resource Allocation</h2>
          <p>Monitor campus resources and current allocations.</p>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <div>
            <h4>Resource Availability</h4>
            <p>Track allocated and available quantities.</p>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table dashboard-table">
            <thead>
              <tr>
                <th>Resource</th>
                <th>Total</th>
                <th>Allocated</th>
                <th>Available</th>
                <th>Availability</th>
              </tr>
            </thead>

            <tbody>
              {resources.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-muted py-4"
                  >
                    No resources available.
                  </td>
                </tr>
              ) : (
                resources.map((resource) => {
                  const total = Number(resource.total || 0);
                  const available = Number(resource.available || 0);

                  const allocated = Math.max(
                    total - available,
                    0
                  );

                  const availabilityPercentage =
                    total > 0
                      ? (available / total) * 100
                      : 0;

                  return (
                    <tr key={resource.id}>
                      <td>{resource.name}</td>

                      <td>{total}</td>

                      <td>{allocated}</td>

                      <td>{available}</td>

                      <td style={{ minWidth: "180px" }}>
                        <div className="availability-bar mb-0">
                          <div
                            className="availability-progress"
                            style={{
                              width: `${availabilityPercentage}%`,
                            }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ResourceAllocation;
