import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createUser } from "../../services/userService";
import { getApiError } from "../../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must contain at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await createUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: "club",
        password: formData.password,
        status: "ACTIVE",
      });

      alert("Registration successful");
      navigate("/login");
    } catch (requestError) {
      alert(getApiError(requestError, "Registration failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <div className="register-header">
          <i className="bi bi-person-plus"></i>

          <h1>Create Account</h1>

          <p>
            Register to access the Campus Micro-Event System
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-3">
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
          <div className="mb-3">
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

          <div className="mb-3">
            <label className="form-label">
              Role
            </label>

            <div className="form-control bg-light" aria-readonly="true">
              Club Representative
            </div>

            <small className="text-muted">
              Public registration is available only for Club Representatives.
            </small>
          </div>

          {/* Password */}
          <div className="mb-3">
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

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="form-label">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              value={formData.confirmPassword}
              onChange={handleChange}
              minLength="6"
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="register-btn w-100"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Login Link */}
        <div className="login-link">
          Already have an account?{" "}

          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
