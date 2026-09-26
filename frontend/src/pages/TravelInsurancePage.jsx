import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/TravelInsurancePage.css";

function TravelInsurancePage() {
  return (
    <>
      <Navbar />

      <main className="travel-insurance-page">
        <div className="travel-insurance-content">
          <span>TRAVEL INSURANCE</span>

          <h1>
            Travel with
            <strong> confidence.</strong>
          </h1>

          <p>
            Enjoy your journey with protection against
            unexpected travel problems and emergencies.
          </p>

          <button>Get Started →</button>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default TravelInsurancePage;