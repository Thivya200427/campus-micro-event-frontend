import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  logoutUser,
  getLoggedInUser,
} from "../utils/authStore";

function AdminLayout() {
  const navigate = useNavigate();
  const loggedInUser = getLoggedInUser();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <i className="bi bi-shield-check"></i>

          <div>
            <h3>System Admin</h3>
            <span>Management Portal</span>
          </div>
        </div>

        <nav className="sidebar-menu">
          <NavLink to="/admin/dashboard">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/admin/users">
            <i className="bi bi-people"></i>
            <span>User Management</span>
          </NavLink>

          <NavLink to="/admin/events">
            <i className="bi bi-calendar-event"></i>
            <span>All Events</span>
          </NavLink>

          <NavLink to="/admin/venues">
            <i className="bi bi-building"></i>
            <span>Venue Management</span>
          </NavLink>

          <NavLink to="/admin/resources">
            <i className="bi bi-box-seam"></i>
            <span>Resource Management</span>
          </NavLink>

          <NavLink to="/admin/reports">
            <i className="bi bi-bar-chart"></i>
            <span>Reports</span>
          </NavLink>
        </nav>

        <button
          type="button"
          className="logout-btn"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-left"></i>
          <span>Logout</span>
        </button>
      </aside>

      <div className="dashboard-main">
        <header className="topbar">
          <div>
            <h4>Campus Micro-Event System</h4>
            <span>System Admin Portal</span>
          </div>

          <div className="topbar-user">
            <div className="notification-icon">
              <i className="bi bi-bell"></i>
            </div>

            <div className="user-avatar">
              <i className="bi bi-person"></i>
            </div>

            <div>
              <strong>
                {loggedInUser?.name || "System Admin"}
              </strong>

              <small>Administrator</small>
            </div>
          </div>
        </header>

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;