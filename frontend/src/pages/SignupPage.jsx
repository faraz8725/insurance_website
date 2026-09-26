import { Link } from "react-router-dom";
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

export default SignupPage;