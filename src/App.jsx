import { Routes, Route, Navigate } from "react-router-dom";

// AUTHENTICATION
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// PROTECTED ROUTE
import ProtectedRoute from "./components/ProtectedRoute";

// LAYOUTS
import DashboardLayout from "./layouts/DashboardLayout";
import EstateLayout from "./layouts/EstateLayout";
import AdminLayout from "./layouts/AdminLayout";

// ======================================================
// CLUB REPRESENTATIVE PAGES
// ======================================================

import Dashboard from "./pages/club/Dashboard";
import CreateEvent from "./pages/club/CreateEvent";
import MyEvents from "./pages/club/MyEvents";
import EventDetails from "./pages/club/EventDetails";
import Venues from "./pages/club/Venues";
import Resources from "./pages/club/Resources";
import Notifications from "./pages/club/Notifications";
import Reports from "./pages/club/Reports";
import CheckIn from "./pages/club/CheckIn";
import CrowdStatus from "./pages/club/CrowdStatus";
import Recommendation from "./pages/club/Recommendation";

// ======================================================
// ESTATE MANAGER PAGES
// ======================================================

import EstateDashboard from "./pages/estate/EstateDashboard";
import PendingRequests from "./pages/estate/PendingRequests";
import ReviewRequest from "./pages/estate/ReviewRequest";
import ApprovedEvents from "./pages/estate/ApprovedEvents";
import RejectedEvents from "./pages/estate/RejectedEvents";
import EstateVenues from "./pages/estate/EstateVenues";
import ResourceAllocation from "./pages/estate/ResourceAllocation";
import EstateReports from "./pages/estate/EstateReports";

// ======================================================
// SYSTEM ADMIN PAGES
// ======================================================

import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import AllEvents from "./pages/admin/AllEvents";
import VenueManagement from "./pages/admin/VenueManagement";
import ResourceManagement from "./pages/admin/ResourceManagement";
import AdminReports from "./pages/admin/AdminReports";

// ======================================================
// APP
// ======================================================

function App() {
  return (
    <Routes>

      {/* ==================================================
          DEFAULT ROUTE
      ================================================== */}

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* ==================================================
          AUTHENTICATION ROUTES
      ================================================== */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* ==================================================
          CLUB REPRESENTATIVE ROUTES
      ================================================== */}
      <Route
        element={
          <ProtectedRoute allowedRole="club">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/events/create"
          element={<CreateEvent />}
        />

        <Route
          path="/events"
          element={<MyEvents />}
        />

        <Route
          path="/events/:id"
          element={<EventDetails />}
        />

        <Route
          path="/check-in"
          element={<CheckIn />}
        />

        <Route
          path="/crowd-status"
          element={<CrowdStatus />}
        />

        <Route
          path="/recommendation"
          element={<Recommendation />}
        />

        <Route
          path="/venues"
          element={<Venues />}
        />

        <Route
          path="/resources"
          element={<Resources />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

      </Route>


      {/* ==================================================
          ESTATE MANAGER ROUTES
      ================================================== */}

      <Route element={<EstateLayout />}>

        <Route
          path="/estate/dashboard"
          element={<EstateDashboard />}
        />

        <Route
          path="/estate/pending"
          element={<PendingRequests />}
        />

        <Route
          path="/estate/pending/:id"
          element={<ReviewRequest />}
        />

        <Route
          path="/estate/approved"
          element={<ApprovedEvents />}
        />

        <Route
          path="/estate/rejected"
          element={<RejectedEvents />}
        />

        <Route
          path="/estate/venues"
          element={<EstateVenues />}
        />

        <Route
          path="/estate/resources"
          element={<ResourceAllocation />}
        />

        <Route
          path="/estate/reports"
          element={<EstateReports />}
        />

      </Route>

      {/* ==================================================
          SYSTEM ADMIN ROUTES
      ================================================== */}

      <Route element={<AdminLayout />}>

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/users"
          element={<UserManagement />}
        />

        <Route
          path="/admin/events"
          element={<AllEvents />}
        />

        <Route
          path="/admin/venues"
          element={<VenueManagement />}
        />

        <Route
          path="/admin/resources"
          element={<ResourceManagement />}
        />

        <Route
          path="/admin/reports"
          element={<AdminReports />}
        />

      </Route>

      {/* ==================================================
          404 PAGE
      ================================================== */}

      <Route
        path="*"
        element={
          <div className="container py-5 text-center">
            <h1>404</h1>

            <h4>Page Not Found</h4>

            <p className="text-muted">
              The page you are looking for does not exist.
            </p>
          </div>
        }
      />

    </Routes>
  );
}

export default App;