function ResourceAllocation() {
  const resources = [
    {
      id: 1,
      name: "Chairs",
      total: 300,
      allocated: 180,
      available: 120,
    },
    {
      id: 2,
      name: "Projectors",
      total: 8,
      allocated: 3,
      available: 5,
    },
    {
      id: 3,
      name: "Microphones",
      total: 12,
      allocated: 4,
      available: 8,
    },
    {
      id: 4,
      name: "Speakers",
      total: 10,
      allocated: 4,
      available: 6,
    },
    {
      id: 5,
      name: "Tables",
      total: 40,
      allocated: 15,
      available: 25,
    },
  ];

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
              {resources.map((resource) => (
                <tr key={resource.id}>
                  <td>{resource.name}</td>
                  <td>{resource.total}</td>
                  <td>{resource.allocated}</td>
                  <td>{resource.available}</td>

                  <td style={{ minWidth: "180px" }}>
                    <div className="availability-bar mb-0">
                      <div
                        className="availability-progress"
                        style={{
                          width: `${
                            (resource.available / resource.total) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ResourceAllocation;