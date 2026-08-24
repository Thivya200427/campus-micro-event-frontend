function UserManagement() {
  const users = [
    {
      id: 1,
      name: "Thivya Selvarasa",
      email: "thivya@example.com",
      role: "Club Representative",
      status: "Active",
    },
    {
      id: 2,
      name: "Estate Manager",
      email: "estate@example.com",
      role: "Estate Manager",
      status: "Active",
    },
    {
      id: 3,
      name: "System Admin",
      email: "admin@example.com",
      role: "System Admin",
      status: "Active",
    },
    {
      id: 4,
      name: "John Student",
      email: "john@example.com",
      role: "Club Representative",
      status: "Inactive",
    },
  ];

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>User Management</h2>
          <p>View and manage system users.</p>
        </div>

        <button className="btn primary-action">
          <i className="bi bi-person-plus me-2"></i>
          Add User
        </button>
      </div>

      <div className="dashboard-section">
        <div className="table-responsive">
          <table className="table dashboard-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>

                  <td>
                    <span
                      className={`status ${
                        user.status === "Active"
                          ? "approved"
                          : "draft"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

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

export default UserManagement;