import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/CarInsurancePage.css";

function CarInsurancePage() {
  return (
    <>
      <Navbar />

      <main className="car-insurance-page">
        <div className="car-insurance-content">
          <span>CAR INSURANCE</span>

          <h1>
            Drive with
            <strong> confidence.</strong>
          </h1>

          <p>
            Protect your car against accidents, damages and
            unexpected road expenses.
          </p>

          <button>Get Started →</button>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default CarInsurancePage;