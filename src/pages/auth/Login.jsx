import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../utils/authStore";
import { login } from "../../services/authService";
import { getApiError } from "../../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = await login({
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
      });

      const normalizedUser = {
        ...user,
        role: user.role.toLowerCase(),
      };
      loginUser(normalizedUser);

      if (normalizedUser.role === "club") {
        navigate("/dashboard");
      } else if (normalizedUser.role === "estate") {
        navigate("/estate/dashboard");
      } else if (normalizedUser.role === "admin") {
        navigate("/admin/dashboard");
      }
    } catch (requestError) {
      setError(getApiError(
        requestError,
        "Unable to sign in. Please try again."
      ));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-left">
          <div>
            <div className="brand-icon">
              <i className="bi bi-calendar2-check"></i>
            </div>

            <h1>Campus Micro-Event</h1>

            <p>
              Crowd Management & Dynamic Resource Allocation System
            </p>
          </div>

          <div className="login-features">
            <div>
              <i className="bi bi-check-circle-fill"></i>
              Manage campus events
            </div>

            <div>
              <i className="bi bi-check-circle-fill"></i>
              Book venues
            </div>

            <div>
              <i className="bi bi-check-circle-fill"></i>
              Request resources
            </div>

            <div>
              <i className="bi bi-check-circle-fill"></i>
              Monitor event attendance
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="login-form-wrapper">
            <h2>Welcome Back</h2>

            <p className="login-subtitle">
              Sign in to continue to your account
            </p>

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">
                  Email Address
                </label>

                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-envelope"></i>
                  </span>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Password
                </label>

                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock"></i>
                  </span>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
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
                  <option value="">
                    Select your role
                  </option>

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

                {error && (
                  <div className="text-danger mt-2 small">
                    {error}
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="remember"
                  />

                  <label
                    className="form-check-label"
                    htmlFor="remember"
                  >
                    Remember me
                  </label>
                </div>

                <button
                  type="button"
                  className="forgot-link"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="btn login-button w-100"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <p className="register-text">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
