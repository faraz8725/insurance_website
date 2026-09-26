import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/BikeInsurancePage.css";

function BikeInsurancePage() {
  return (
    <>
      <Navbar />

      <main className="bike-insurance-page">
        <div className="bike-insurance-content">
          <span>BIKE INSURANCE</span>

          <h1>
            Ride with
            <strong> peace of mind.</strong>
          </h1>

          <p>
            Keep your bike protected against accidents, theft
            and unexpected repair expenses.
          </p>

          <button>Get Started →</button>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default BikeInsurancePage;