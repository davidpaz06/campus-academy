import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Card from "@/components/Card";
import "./Login.css";

type LoginForm = {
  email?: string;
  password?: string;
};

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<LoginForm>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      header.classList.add("color-stripe");
    }
    return () => {
      if (header) {
        header.classList.remove("color-stripe");
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      await login(form.email, form.password);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Login failed. Please try again.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }

    alert(JSON.stringify(form, null, 2));
    navigate("/academy");
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <Card className="login-card">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1 className="login-title">Sign in</h1>
            <div className="login-group">
              <label htmlFor="email">Username or mail address</label>
              <input
                id="email"
                type="email"
                value={form.email ?? ""}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                autoComplete="email"
                disabled={loading}
              />
            </div>
            <div className="login-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={form.password ?? ""}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                autoComplete="current-password"
                disabled={loading}
              />
            </div>
            {error && (
              <div className="login-error text-[1rem] text-[#ff3b30] mb-[1rem]">
                {error}
              </div>
            )}
            <div className="login-actions">
              <button className="login-btn" type="submit" disabled={loading}>
                {loading ? "Loading..." : "Confirm"}
              </button>
            </div>
          </form>
        </Card>
        <div className="login-footer">
          <p>
            Don't have an account? <a href="/register">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
