import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/HealthInsurancePage.css";

function HealthInsurancePage() {
  return (
    <>
      <Navbar />

      <main className="insurance-page">
        <div className="insurance-content">
          <span>HEALTH INSURANCE</span>

          <h1>
            Protect your
            <strong> health.</strong>
          </h1>

          <p>
            Get financial protection for medical expenses,
            hospitalisation and unexpected healthcare needs.
          </p>

          <button>Get Started →</button>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default HealthInsurancePage;