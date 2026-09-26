import { Link } from "react-router-dom";
import "../styles/Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">

        <div className="hero-content">

          <div className="hero-badge">
            <span>✦</span>
            Simple protection. Better peace of mind.
          </div>

          <h1>
            Protect what
            <span> matters most.</span>
          </h1>

          <p>
            Simple, flexible insurance designed to protect you,
            your family, and the things you care about most.
          </p>

          <div className="hero-buttons">
            <Link to="/products" className="primary-btn">
              Explore Coverage
              <span>→</span>
            </Link>

            <Link to="/resources" className="secondary-btn">
              Learn More
            </Link>
          </div>

          <div className="hero-trust">
            <div className="trust-avatars">
              <span>👨</span>
              <span>👩</span>
              <span>👨‍💼</span>
            </div>

            <div>
              <strong>50K+</strong>
              <p>people protected</p>
            </div>
          </div>

        </div>

        <div className="hero-visual">

          <div className="hero-card main-card">
            <div className="card-top">
              <div className="shield-icon">✓</div>

              <span className="active-status">
                ● Active
              </span>
            </div>

            <p className="card-label">
              Your protection
            </p>

            <h3>
              Complete Peace
              <br />
              of Mind
            </h3>

            <div className="coverage-line">
              <span></span>
            </div>

            <div className="coverage-info">
              <span>Coverage</span>
              <strong>₹10,00,000</strong>
            </div>
          </div>

          <div className="floating-card">
            <span className="floating-icon">🛡️</span>

            <div>
              <strong>You're covered</strong>
              <p>24/7 protection</p>
            </div>
          </div>

          <div className="orange-circle"></div>

        </div>

      </div>
    </section>
  );
}

export default Hero;