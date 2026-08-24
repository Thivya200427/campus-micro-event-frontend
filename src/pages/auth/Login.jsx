import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login Data:", formData);

    // Temporary frontend login
    navigate("/dashboard");
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

            <form onSubmit={handleSubmit}>

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
                    className="form-control"
                    name="email"
                    placeholder="Enter your email"
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
                    className="form-control"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
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
              >
                Sign In
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