import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// SupportPage.jsx
import "../styles/SupportPage.css";

function SupportPage() {
  return (
    <>
      <Navbar />

      <main className="inner-page">

        <div className="page-header">
          <span>SUPPORT</span>

          <h1>
            How can we
            <strong> help?</strong>
          </h1>

          <p>
            Find assistance with your policy, claims or
            general insurance questions.
          </p>
        </div>

        <div className="support-grid">

          <div>
            <span>01</span>
            <h3>Help Center</h3>
            <p>
              Find answers to common questions about
              insurance and policies.
            </p>
            <button>Visit Help Center →</button>
          </div>

          <div>
            <span>02</span>
            <h3>Claims Support</h3>
            <p>
              Get guidance about the claims process and
              required documentation.
            </p>
            <button>Get Support →</button>
          </div>

          <div>
            <span>03</span>
            <h3>Contact Us</h3>
            <p>
              Need more help? Our support team is here
              to assist you.
            </p>
            <button>Contact Support →</button>
          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}

export default SupportPage;