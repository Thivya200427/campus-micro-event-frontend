function Resources() {
  const resources = [
    {
      id: 1,
      name: "Chairs",
      category: "Furniture",
      total: 300,
      available: 220,
      icon: "bi bi-person-workspace",
    },
    {
      id: 2,
      name: "Projectors",
      category: "Equipment",
      total: 8,
      available: 5,
      icon: "bi bi-projector",
    },
    {
      id: 3,
      name: "Microphones",
      category: "Audio",
      total: 12,
      available: 8,
      icon: "bi bi-mic",
    },
    {
      id: 4,
      name: "Speakers",
      category: "Audio",
      total: 10,
      available: 6,
      icon: "bi bi-speaker",
    },
    {
      id: 5,
      name: "Tables",
      category: "Furniture",
      total: 40,
      available: 25,
      icon: "bi bi-layout-three-columns",
    },
    {
      id: 6,
      name: "Extension Cables",
      category: "Electrical",
      total: 20,
      available: 15,
      icon: "bi bi-plug",
    },
  ];

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Resources</h2>
          <p>View campus resources and current availability.</p>
        </div>
      </div>

      <div className="resource-grid">
        {resources.map((resource) => (
          <div className="resource-card" key={resource.id}>
            <div className="resource-card-top">
              <div className="resource-card-icon">
                <i className={resource.icon}></i>
              </div>

              <span className="resource-category">
                {resource.category}
              </span>
            </div>

            <h4>{resource.name}</h4>

            <div className="resource-counts">
              <div>
                <span>Total</span>
                <strong>{resource.total}</strong>
              </div>

              <div>
                <span>Available</span>
                <strong>{resource.available}</strong>
              </div>
            </div>

            <div className="availability-bar">
              <div
                className="availability-progress"
                style={{
                  width: `${(resource.available / resource.total) * 100}%`,
                }}
              ></div>
            </div>

            <button className="btn resource-request-btn w-100">
              Request Resource
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Resources;