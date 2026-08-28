import { useState } from "react";

import {
  getResources,
  addResource,
  updateResource,
  deleteResource,
} from "../../utils/resourceStore";

function ResourceManagement() {
  const [resources, setResources] = useState(getResources());

  const [showForm, setShowForm] = useState(false);

  const [editingResource, setEditingResource] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    total: "",
    available: "",
  });

  const refreshResources = () => {
    setResources(getResources());
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      total: "",
      available: "",
    });

    setEditingResource(null);
    setShowForm(false);
  };

  const handleAddClick = () => {
    setEditingResource(null);

    setFormData({
      name: "",
      category: "",
      total: "",
      available: "",
    });

    setShowForm(true);
  };

  const handleEdit = (resource) => {
    setEditingResource(resource);

    setFormData({
      name: resource.name,
      category: resource.category,
      total: resource.total,
      available: resource.available,
    });

    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.category.trim() ||
      formData.total === "" ||
      formData.available === ""
    ) {
      alert("Please fill all resource details.");
      return;
    }

    const total = Number(formData.total);
    const available = Number(formData.available);

    if (total < 0 || available < 0) {
      alert("Resource quantities cannot be negative.");
      return;
    }

    if (available > total) {
      alert("Available quantity cannot be greater than total quantity.");
      return;
    }

    const resourceData = {
      name: formData.name.trim(),
      category: formData.category.trim(),
      total,
      available,
    };

    if (editingResource) {
      updateResource(editingResource.id, resourceData);

      alert("Resource updated successfully.");
    } else {
      addResource(resourceData);

      alert("Resource added successfully.");
    }

    refreshResources();
    resetForm();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resource?"
    );

    if (!confirmed) {
      return;
    }

    deleteResource(id);

    refreshResources();

    alert("Resource deleted successfully.");
  };

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Resource Management</h2>
          <p>Manage campus resources and quantities.</p>
        </div>

        <button
          type="button"
          className="btn primary-action"
          onClick={handleAddClick}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add Resource
        </button>
      </div>

      {showForm && (
        <div className="dashboard-section mb-4">
          <h4>
            {editingResource
              ? "Edit Resource"
              : "Add New Resource"}
          </h4>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">
                  Resource Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter resource name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  className="form-control"
                  placeholder="Example: Furniture, Audio, Equipment"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Total Quantity
                </label>

                <input
                  type="number"
                  name="total"
                  className="form-control"
                  min="0"
                  placeholder="Enter total quantity"
                  value={formData.total}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Available Quantity
                </label>

                <input
                  type="number"
                  name="available"
                  className="form-control"
                  min="0"
                  placeholder="Enter available quantity"
                  value={formData.available}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="mt-4 d-flex gap-2">

              <button
                type="submit"
                className="btn btn-success"
              >
                {editingResource
                  ? "Update Resource"
                  : "Save Resource"}
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>

            </div>
          </form>
        </div>
      )}

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
                resources.map((resource) => (
                  <tr key={resource.id}>
                    <td>{resource.name}</td>
                    <td>{resource.category}</td>
                    <td>{resource.total}</td>
                    <td>{resource.available}</td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() =>
                          handleEdit(resource)
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() =>
                          handleDelete(resource.id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ResourceManagement;