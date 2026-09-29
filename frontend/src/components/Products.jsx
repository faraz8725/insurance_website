
/*

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API_BASE_URL from "../config/api";
import "../styles/Products.css";

function Products() {
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

  const getLink = (category) => {
    return `/insurance/${category}`;
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
    <section className="products-section">
      <div className="section-container">

        <div className="section-heading">
          <div>
            <span className="section-tag">
              OUR PRODUCTS
            </span>

            <h2>
              Coverage for every
              <span> chapter of life.</span>
            </h2>
          </div>

          <p>
            Choose the protection that fits your life today
            and helps prepare you for tomorrow.
          </p>
        </div>

        <div className="products-grid">

          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p>No insurance products available.</p>
          ) : (
            products.map((product) => (
              <Link
                to={getLink(product.category)}
                className="product-card"
                key={product._id}
              >
                <div className="product-icon">
                  {getIcon(product.category)}
                </div>

                <h3>{product.title}</h3>

                <p>{product.description}</p>

                <span className="product-link">
                  Explore coverage →
                </span>
              </Link>
            ))
          )}

        </div>

      </div>
    </section>
  );
}

export default Products;
 */


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API_BASE_URL from "../config/api";
import "../styles/Products.css";

function Products() {
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
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/products?featured=true`
        );

        const data = await response.json();

        if (response.ok) {
          setProducts(data);
        }
      } catch (error) {
        console.error(
          "Failed to load featured products:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <section className="products-section">
      <div className="section-container">

        <div className="section-heading">
          <div>
            <span className="section-tag">
              OUR PRODUCTS
            </span>

            <h2>
              Coverage for every
              <span> chapter of life.</span>
            </h2>
          </div>

          <p>
            Choose the protection that fits your life today
            and helps prepare you for tomorrow.
          </p>
        </div>

        <div className="products-grid">

          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p>
              No featured insurance products available.
            </p>
          ) : (
            products.map((product) => (
              <Link
                to={`/insurance/product/${product._id}`}
                className="product-card"
                key={product._id}
              >
                <div className="product-icon">
                  {getIcon(product.category)}
                </div>

                <h3>{product.title}</h3>

                <p>{product.description}</p>

                <span className="product-link">
                  Explore More →
                </span>
              </Link>
            ))
          )}

        </div>

      </div>
    </section>
  );
}

export default Products;
