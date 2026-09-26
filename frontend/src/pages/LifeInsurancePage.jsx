import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/LifeInsurancePage.css";

function LifeInsurancePage() {
  return (
    <>
      <Navbar />

      <main className="life-insurance-page">
        <div className="life-insurance-content">
          <span>LIFE INSURANCE</span>

          <h1>
            Secure your
            <strong> family's future.</strong>
          </h1>

          <p>
            Build financial security for the people who matter
            most with flexible life insurance protection.
          </p>

          <button>Get Started →</button>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default LifeInsurancePage;