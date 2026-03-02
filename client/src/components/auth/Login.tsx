import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/Auth";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.userName.trim()) newErrors.userName = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post("/user/login", formData);
      toast.success("Login successful!");
      login(response.data.user);
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--spacing-lg)",
      }}
    >
      <div
        style={{
          backgroundColor: "var(--color-surface)",
          padding: "var(--spacing-2xl)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h1
          style={{
            marginBottom: "var(--spacing-xl)",
            textAlign: "center",
            color: "var(--color-primary)",
          }}
        >
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className={`form-input ${errors.userName ? "error" : ""}`}
              value={formData.userName}
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
              disabled={isLoading}
            />
            {errors.userName && (
              <div className="error-message">{errors.userName}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-input ${errors.password ? "error" : ""}`}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              disabled={isLoading}
            />
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%" }}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ marginTop: "var(--spacing-lg)", textAlign: "center" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "var(--color-primary)" }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
