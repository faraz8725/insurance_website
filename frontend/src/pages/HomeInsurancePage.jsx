import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/HomeInsurancePage.css";

function HomeInsurancePage() {
  return (
    <>
      <Navbar />

      <main className="home-insurance-page">
        <div className="home-insurance-content">
          <span>HOME INSURANCE</span>

          <h1>
            Protect your
            <strong> home.</strong>
          </h1>

          <p>
            Protect your home and belongings from unexpected
            damage, loss and other covered risks.
          </p>

          <button>Get Started →</button>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default HomeInsurancePage;