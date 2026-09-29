/*import Navbar from "../components/Navbar";
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

export default ProductsPage; */

  

import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import API_BASE_URL from "../config/api";
import "../styles/ProductsPage.css";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getIcon = (category) => {
    const icons = {
      health: "🏥",
      life: "❤️",
      car: "🚗",
      bike: "🏍️",
      home: "🏠",
      travel: "✈️",
      business: "💼",
    };

    return icons[category] || "🛡️";
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/products`
        );

        const data = await response.json();

        if (response.ok) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p>No insurance products available.</p>
          ) : (
            products.map((product) => (
              <div
                className="simple-product-card"
                key={product._id}
              >
                <div>
                  {getIcon(product.category)}
                </div>

                <h3>{product.title}</h3>

                <p>
                  {product.description}
                </p>

                <button>
                  Learn More →
                </button>
              </div>
            ))
          )}

        </div>

      </main>

      <Footer />
    </>
  );
}

export default ProductsPage;

