/*import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

// LoginPage.jsx
import "../styles/LoginPage.css";

function LoginPage() {
  return (
    <>
      <Navbar />

      <main className="login-page">

        <div className="login-card">

          <div className="login-logo">
            Insure<span>X</span>
          </div>

          <h1>Welcome back</h1>

          <p>
            Login to manage your insurance and account.
          </p>

          <form>

            <label>Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
            />

            <button type="submit">
              Login
            </button>

          </form>

          <div className="login-divider">
            <span>or</span>
          </div>

          <p className="signup-text">
            Don't have an account?
            <Link to="/signup"> Get Started</Link>
          </p>

        </div>

      </main>
    </>
  );
}

export default LoginPage; */






import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import "../styles/LoginPage.css";

import API_BASE_URL from "../config/api";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Save login information
      localStorage.setItem(
        "hf_token",
        data.token
      );

      localStorage.setItem(
        "hf_user",
        JSON.stringify(data.user)
      );

      // Go to home after login
      navigate("/");
    } catch (error) {
      console.error(error);

      setError(
        "Unable to connect to server. Please try again."
      );
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <main className="login-page">

        <div className="login-card">

          <div className="login-logo">
            Insure<span>X</span>
          </div>

          <h1>Welcome back</h1>

          <p>
            Login to manage your insurance and account.
          </p>


          <form onSubmit={handleSubmit}>

            <label htmlFor="email">
              Email address
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />


            <label htmlFor="password">
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />


            {error && (
              <p className="form-error">
                {error}
              </p>
            )}


            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </form>


          <div className="login-divider">
            <span>or</span>
          </div>


          <p className="signup-text">
            Don't have an account?
            <Link to="/signup"> Get Started</Link>
          </p>

        </div>

      </main>
    </>
  );
}

export default LoginPage;