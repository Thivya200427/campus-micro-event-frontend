function ResourceManagement() {
  const resources = [
    {
      id: 1,
      name: "Chairs",
      category: "Furniture",
      total: 300,
      available: 220,
    },
    {
      id: 2,
      name: "Projectors",
      category: "Equipment",
      total: 8,
      available: 5,
    },
    {
      id: 3,
      name: "Microphones",
      category: "Audio",
      total: 12,
      available: 8,
    },
    {
      id: 4,
      name: "Speakers",
      category: "Audio",
      total: 10,
      available: 6,
    },
  ];

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Resource Management</h2>
          <p>Manage campus resources and quantities.</p>
        </div>

        <button className="btn primary-action">
          <i className="bi bi-plus-circle me-2"></i>
          Add Resource
        </button>
      </div>

      <div className="dashboard-section">
        <div className="table-responsive">
          <table className="table dashboard-table">
            <thead>
              <tr>
                <th>Resource</th>
                <th>Category</th>
                <th>Total</th>
                <th>Available</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {resources.map((resource) => (
                <tr key={resource.id}>
                  <td>{resource.name}</td>
                  <td>{resource.category}</td>
                  <td>{resource.total}</td>
                  <td>{resource.available}</td>

                  <td>
                    <button className="btn btn-sm btn-outline-secondary me-2">
                      Edit
                    </button>

                    <button className="btn btn-sm btn-outline-danger">
                      Delete
                    </button>
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

export default ResourceManagement;