import { Link } from "react-router-dom";
import "../styles/CTA.css";

function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-container">

        <div>
          <span className="cta-small">
            READY WHEN YOU ARE
          </span>

          <h2>
            Take the first step
            <br />
            toward better protection.
          </h2>

          <p>
            Explore our coverage options and find protection
            designed around your needs.
          </p>
        </div>

        <Link to="/products" className="cta-button">
          Explore Products
          <span>→</span>
        </Link>

      </div>
    </section>
  );
}

export default CTA;