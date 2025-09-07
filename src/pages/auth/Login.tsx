import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

type LoginForm = {
  username?: string;
  password?: string;
};

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState<Partial<LoginForm>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from = location.state?.from || "/dashboard";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.username || !form.password) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);

    try {
      await login({
        username: form.username,
        password: form.password,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Login failed. Please try again.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-card">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1 className="login-title">Sign in</h1>
            <div className="login-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={form.username ?? ""}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
                autoComplete="username"
                disabled={loading}
              />
            </div>
            <div className="login-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={form.password ?? ""}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                autoComplete="current-password"
                disabled={loading}
              />
            </div>

            {error && <div className="login-error">{error}</div>}

            <div className="login-actions">
              <button className="login-btn" type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
        <div className="login-footer">
          <p>
            Don't have an account? <a href="/register">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
