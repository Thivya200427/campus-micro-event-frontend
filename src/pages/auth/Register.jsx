import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    console.log("Register Data:", formData);

    // Temporary frontend-only registration
    alert("Registration successful");

    navigate("/login");
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <div className="register-header">
          <i className="bi bi-person-plus"></i>

          <h1>Create Account</h1>

          <p>
            Register for the Campus Micro-Event Management System
          </p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              className="form-control"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
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
          </div>

          <div className="mb-3">
            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              className={`form-control ${
                error ? "is-invalid" : ""
              }`}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            {error && (
              <div className="invalid-feedback d-block">
                {error}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn register-btn w-100"
          >
            Create Account
          </button>
        </form>

        <p className="login-link">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;