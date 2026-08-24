import { Outlet, NavLink, useNavigate } from "react-router-dom";

function EstateLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <i className="bi bi-buildings"></i>

          <div>
            <h3>Campus Estate</h3>
            <span>Manager Portal</span>
          </div>
        </div>

        <nav className="sidebar-menu">
          <NavLink to="/estate/dashboard">
            <i className="bi bi-grid"></i>
            Dashboard
          </NavLink>

          <NavLink to="/estate/pending">
            <i className="bi bi-hourglass-split"></i>
            Pending Requests
          </NavLink>

          <NavLink to="/estate/approved">
            <i className="bi bi-check-circle"></i>
            Approved Events
          </NavLink>

          <NavLink to="/estate/rejected">
            <i className="bi bi-x-circle"></i>
            Rejected Events
          </NavLink>

          <NavLink to="/estate/venues">
            <i className="bi bi-building"></i>
            Venue Availability
          </NavLink>

          <NavLink to="/estate/resources">
            <i className="bi bi-box-seam"></i>
            Resource Allocation
          </NavLink>

          <NavLink to="/estate/reports">
            <i className="bi bi-bar-chart"></i>
            Reports
          </NavLink>
        </nav>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-left"></i>
          Logout
        </button>
      </aside>

      <div className="dashboard-main">
        <header className="topbar">
          <div>
            <h4>Campus Micro-Event System</h4>
            <span>Estate Manager Portal</span>
          </div>

          <div className="topbar-user">
            <div className="notification-icon">
              <i className="bi bi-bell"></i>
            </div>

            <div className="user-avatar">
              <i className="bi bi-person"></i>
            </div>

            <div>
              <strong>Estate Manager</strong>
              <small>Campus Estate Manager</small>
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

export default EstateLayout;