import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ProductsPage.jsx
import "../styles/ProductsPage.css";

function ProductsPage() {
  const products = [
    ["🏥", "Health Insurance"],
    ["❤️", "Life Insurance"],
    ["🚗", "Car Insurance"],
    ["🏠", "Home Insurance"],
    ["✈️", "Travel Insurance"],
    ["💼", "Business Insurance"]
  ];

  return (
    <>
      <Navbar />

      <main className="inner-page">
        <div className="page-header">
          <span>OUR PRODUCTS</span>

          <h1>
            Protection for
            <strong> what matters.</strong>
          </h1>

          <p>
            Explore our range of insurance solutions designed
            around different needs and stages of life.
          </p>
        </div>

        <div className="simple-products-grid">
          {products.map(([icon, title]) => (
            <div className="simple-product-card" key={title}>
              <div>{icon}</div>
              <h3>{title}</h3>
              <p>
                Flexible protection designed to help
                you stay prepared.
              </p>

              <button>Learn More →</button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default ProductsPage;