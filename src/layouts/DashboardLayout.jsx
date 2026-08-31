import {
  Outlet,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  logoutUser,
  getLoggedInUser,
} from "../utils/authStore";

function DashboardLayout() {
  const navigate = useNavigate();
  const loggedInUser = getLoggedInUser();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const getRoleLabel = (role) => {
    if (role === "club") {
      return "Club Representative";
    }

    if (role === "estate") {
      return "Estate Manager";
    }

    if (role === "admin") {
      return "System Admin";
    }

    return role || "Club Representative";
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <i className="bi bi-calendar2-check"></i>

          <div>
            <h3>Campus Event</h3>
            <span>Management System</span>
          </div>
        </div>

        <nav className="sidebar-menu">
          <NavLink to="/dashboard">
            <i className="bi bi-grid"></i>
            Dashboard
          </NavLink>

          <NavLink to="/events/create">
            <i className="bi bi-plus-circle"></i>
            Create Event
          </NavLink>

          <NavLink to="/events">
            <i className="bi bi-calendar-event"></i>
            My Events
          </NavLink>

          <NavLink to="/check-in">
            <i className="bi bi-person-check"></i>
            <span>Check-In</span>
          </NavLink>

          <NavLink to="/crowd-status">
            <i className="bi bi-activity"></i>
            <span>Crowd Status</span>
          </NavLink>

          <NavLink to="/recommendation">
            <i className="bi bi-stars"></i>
            <span>Recommendations</span>
          </NavLink>

          <NavLink to="/venues">
            <i className="bi bi-building"></i>
            Venues
          </NavLink>

          <NavLink to="/resources">
            <i className="bi bi-box-seam"></i>
            Resources
          </NavLink>

          <NavLink to="/notifications">
            <i className="bi bi-bell"></i>
            Notifications
          </NavLink>

          <NavLink to="/reports">
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
            <span>Welcome back</span>
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
                {loggedInUser?.name ||
                  "Club Representative"}
              </strong>

              <small>
                {getRoleLabel(
                  loggedInUser?.role
                )}
              </small>
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

export default DashboardLayout;
