/*import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/SignupPage.css";

function SignupPage() {
  return (
    <>
      <Navbar />

      <main className="signup-page">
        <div className="signup-card">
          <div className="signup-header">
            <span>CREATE ACCOUNT</span>

            <h1>
              Join <strong>InsureX.</strong>
            </h1>

            <p>
              Create your account and start managing
              your insurance with ease.
            </p>
          </div>

          <form className="signup-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Create a password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
              />
            </div>

            <button type="submit" className="signup-button">
              Create Account
            </button>
          </form>

          <div className="signup-footer">
            <p>
              Already have an account?
              <Link to="/login"> Login</Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default SignupPage; */


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import "../styles/SignupPage.css";

import API_BASE_URL from "../config/api";

function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
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

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/signup`,
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
        setError(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      setMessage("Account created successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1200);
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

      <main className="signup-page">
        <div className="signup-card">

          <div className="signup-header">
            <span>CREATE ACCOUNT</span>

            <h1>
              Join <strong>InsureX.</strong>
            </h1>

            <p>
              Create your account and start managing
              your insurance with ease.
            </p>
          </div>

          <form
            className="signup-form"
            onSubmit={handleSubmit}
          >

            <div className="form-group">
              <label htmlFor="name">
                Full Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-group">
              <label htmlFor="email">
                Email Address
              </label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-group">
              <label htmlFor="phone">
                Phone Number
              </label>

              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-group">
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>


            {error && (
              <p className="form-error">
                {error}
              </p>
            )}


            {message && (
              <p className="form-success">
                {message}
              </p>
            )}


            <button
              type="submit"
              className="signup-button"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>


          <div className="signup-footer">
            <p>
              Already have an account?
              <Link to="/login"> Login</Link>
            </p>
          </div>

        </div>
      </main>
    </>
  );
}

export default SignupPage;