import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Card from "../components/Card";
import "./Login.css";

import { useEffect } from "react";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [remember, setRemember] = useState(false);

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
    await login(email, password);
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="login-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* <div className="login-options">
          <label className="remember-label">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember me
          </label>
        </div> */}
            <div className="login-actions">
              <button className="login-btn" type="submit">
                Confirm
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
};

export default Login;
