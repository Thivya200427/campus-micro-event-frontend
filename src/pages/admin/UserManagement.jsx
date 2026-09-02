import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/userService";
import { getApiError } from "../../services/api";

function UserManagement() {
  const [users, setUsers] = useState([]);

  const [showAddUser, setShowAddUser] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "club",
    password: "",
    status: "ACTIVE",
  });

  async function loadUsers() {
    try {
      setUsers(await getUsers());
    } catch (error) {
      alert(getApiError(error, "Unable to load users"));
    }
  }

  useEffect(() => {
    let active = true;
    getUsers()
      .then((data) => {
        if (active) {
          setUsers(data);
        }
      })
      .catch((error) => {
        if (active) {
          alert(getApiError(error, "Unable to load users"));
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      alert("Password must contain at least 6 characters");
      return;
    }

    try {
      await createUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: formData.role,
        password: formData.password,
        status: formData.status,
      });

      alert("User created successfully");
      setFormData({
        name: "",
        email: "",
        role: "club",
        password: "",
        status: "ACTIVE",
      });
      setShowAddUser(false);
      await loadUsers();
    } catch (error) {
      alert(getApiError(error, "Unable to create user"));
    }
  };

  const handleToggleStatus = async (user) => {
    const isActive = user.status?.toUpperCase() === "ACTIVE";
    try {
      await updateUser(user.id, {
        status: isActive ? "INACTIVE" : "ACTIVE",
      });
      await loadUsers();
    } catch (error) {
      alert(getApiError(error, "Unable to update user"));
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteUser(id);
      await loadUsers();
    } catch (error) {
      alert(getApiError(error, "Unable to delete user"));
    }
  };

  const getRoleName = (role) => {
    if (role === "club") {
      return "Club Representative";
    }

    if (role === "estate") {
      return "Estate Manager";
    }

    if (role === "admin") {
      return "System Admin";
    }

    return role;
  };

  return (
    <div>
      {/* Page Heading */}
      <div className="dashboard-title">
        <div>
          <h2>User Management</h2>

          <p>
            Create and manage system users.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-success"
          onClick={() =>
            setShowAddUser(!showAddUser)
          }
        >
          <i className="bi bi-person-plus me-2"></i>

          {showAddUser
            ? "Close"
            : "Add User"}
        </button>
      </div>

      {/* Add User Form */}
      {showAddUser && (
        <div className="dashboard-section mb-4">
          <div className="section-header">
            <div>
              <h4>Add New User</h4>

              <p>
                Create a new system account.
              </p>
            </div>
          </div>

          <form onSubmit={handleAddUser}>
            <div className="row">
              {/* Name */}
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Role */}
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Role
                </label>

                <select
                  name="role"
                  className="form-select"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="club">
                    Club Representative
                  </option>

                  <option value="estate">
                    Estate Manager
                  </option>

                  <option value="admin">
                    System Admin
                  </option>
                </select>
              </div>

              {/* Password */}
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  minLength="6"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Status
                </label>

                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-success"
            >
              <i className="bi bi-person-check me-2"></i>
              Create User
            </button>
          </form>
        </div>
      )}

      {/* Registered Users */}
      <div className="dashboard-section">
        <div className="section-header">
          <div>
            <h4>Registered Users</h4>

            <p>
              All user accounts in the system.
            </p>
          </div>

          <span className="badge bg-secondary">
            {users.length} Users
          </span>
        </div>

        {users.length === 0 ? (
          <div className="text-center py-5">
            <i
              className="bi bi-people"
              style={{
                fontSize: "44px",
                color: "#94a3b8",
              }}
            ></i>

            <h5 className="mt-3">
              No Registered Users
            </h5>

            <p className="text-muted">
              Create a user using the Add User button.
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table dashboard-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <strong>
                        {user.name}
                      </strong>
                    </td>

                    <td>{user.email}</td>

                    <td>
                      {getRoleName(user.role)}
                    </td>

                    <td>
                      <span
                        className={`status ${
                          user.status?.toUpperCase() === "ACTIVE"
                            ? "approved"
                            : "rejected"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td>
                      {user.createdAt
                        ? new Date(
                            user.createdAt
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() =>
                          handleToggleStatus(user)
                        }
                      >
                        {user.status?.toUpperCase() === "ACTIVE"
                          ? "Disable"
                          : "Enable"}
                      </button>

                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() =>
                          handleDelete(user.id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserManagement;
