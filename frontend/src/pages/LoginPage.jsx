import { Link } from "react-router-dom";

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

export default LoginPage;