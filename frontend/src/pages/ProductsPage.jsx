
  /*

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

*/

/*

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import API_BASE_URL from "../config/api";
import "../styles/ProductsPage.css";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category");

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

    return icons[category?.toLowerCase()] || "🛡️";
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${API_BASE_URL}/products`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(
        (product) =>
          product.category?.toLowerCase() ===
          selectedCategory.toLowerCase()
      )
    : products;

  const formatCategory = (category) => {
    if (!category) return "Insurance";

    return category
      .replace(/-/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  return (
    <>
      <Navbar />

      <main className="inner-page">
        <div className="page-header">
          <span>
            {selectedCategory
              ? `${formatCategory(selectedCategory)} INSURANCE`
              : "OUR PRODUCTS"}
          </span>

          <h1>
            Protection for
            <strong> what matters.</strong>
          </h1>

          <p>
            {selectedCategory
              ? `Explore our ${formatCategory(
                  selectedCategory
                ).toLowerCase()} insurance products.`
              : "Explore our range of insurance solutions designed around different needs and stages of life."}
          </p>
        </div>

        <div className="simple-products-grid">
          {loading ? (
            <p>Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <p>
              {selectedCategory
                ? `No products available in ${formatCategory(
                    selectedCategory
                  )} Insurance yet.`
                : "No insurance products available."}
            </p>
          ) : (
            filteredProducts.map((product) => (
              <div
                className="simple-product-card"
                key={product._id}
              >
                <div>{getIcon(product.category)}</div>

                <h3>{product.title}</h3>

                <p>{product.description}</p>

                <button
                  type="button"
                  onClick={() =>
                    (window.location.href = `/products/${product._id}`)
                  }
                >
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

export default ProductsPage; */





import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import API_BASE_URL from "../config/api";
import "../styles/ProductsPage.css";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedCategory = searchParams.get("category");

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

    return icons[category?.toLowerCase()] || "🛡️";
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${API_BASE_URL}/products`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(
        (product) =>
          product.category?.toLowerCase() ===
          selectedCategory.toLowerCase()
      )
    : products;

  const formatCategory = (category) => {
    if (!category) return "Insurance";

    return category
      .replace(/-/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  return (
    <>
      <Navbar />

      <main className="inner-page">
        <div className="page-header">
          <span>
            {selectedCategory
              ? `${formatCategory(selectedCategory)} INSURANCE`
              : "OUR PRODUCTS"}
          </span>

          <h1>
            Protection for
            <strong> what matters.</strong>
          </h1>

          <p>
            {selectedCategory
              ? `Explore our ${formatCategory(
                  selectedCategory
                ).toLowerCase()} insurance products.`
              : "Explore our range of insurance solutions designed around different needs and stages of life."}
          </p>
        </div>

        <div className="simple-products-grid">
          {loading ? (
            <p>Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <p>
              {selectedCategory
                ? `No products available in ${formatCategory(
                    selectedCategory
                  )} Insurance yet.`
                : "No insurance products available."}
            </p>
          ) : (
            filteredProducts.map((product) => (
              <div
                className="simple-product-card"
                key={product._id}
              >
                <div>{getIcon(product.category)}</div>

                <h3>{product.title}</h3>

                <p>{product.description}</p>

                <button
                  type="button"
                  onClick={() =>
                    navigate(`/insurance/product/${product._id}`)
                  }
                >
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
