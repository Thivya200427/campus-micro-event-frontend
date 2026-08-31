import useResources from "../../hooks/useResources";

function Resources() {
  const { resources } = useResources();

  const getResourceIcon = (name, category) => {
    const resourceName = name?.toLowerCase() || "";
    const resourceCategory = category?.toLowerCase() || "";

    if (resourceName.includes("chair")) {
      return "bi bi-person-workspace";
    }

    if (resourceName.includes("projector")) {
      return "bi bi-projector";
    }

    if (resourceName.includes("microphone")) {
      return "bi bi-mic";
    }

    if (resourceName.includes("speaker")) {
      return "bi bi-speaker";
    }

    if (resourceName.includes("table")) {
      return "bi bi-layout-three-columns";
    }

    if (
      resourceName.includes("cable") ||
      resourceCategory.includes("electrical")
    ) {
      return "bi bi-plug";
    }

    return "bi bi-box-seam";
  };

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Resources</h2>
          <p>View campus resources and current availability.</p>
        </div>
      </div>

      {resources.length === 0 ? (
        <div className="dashboard-section text-center py-5">
          <i
            className="bi bi-box-seam"
            style={{ fontSize: "40px" }}
          ></i>

          <h4 className="mt-3">
            No Resources Available
          </h4>

          <p className="text-muted mb-0">
            Campus resources will appear here.
          </p>
        </div>
      ) : (
        <div className="resource-grid">
          {resources.map((resource) => {
            const total = Number(resource.total || 0);
            const available = Number(resource.available || 0);

            const availabilityPercentage =
              total > 0
                ? Math.min((available / total) * 100, 100)
                : 0;

            return (
              <div
                className="resource-card"
                key={resource.id}
              >
                <div className="resource-card-top">
                  <div className="resource-card-icon">
                    <i
                      className={getResourceIcon(
                        resource.name,
                        resource.category
                      )}
                    ></i>
                  </div>

                  <span className="resource-category">
                    {resource.category}
                  </span>
                </div>

                <h4>{resource.name}</h4>

                <div className="resource-counts">
                  <div>
                    <span>Total</span>
                    <strong>{total}</strong>
                  </div>

                  <div>
                    <span>Available</span>
                    <strong>{available}</strong>
                  </div>
                </div>

                <div className="availability-bar">
                  <div
                    className="availability-progress"
                    style={{
                      width: `${availabilityPercentage}%`,
                    }}
                  ></div>
                </div>

                <button
                  type="button"
                  className="btn resource-request-btn w-100"
                  disabled={available <= 0}
                >
                  {available > 0
                    ? "Request Resource"
                    : "Not Available"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Resources;
