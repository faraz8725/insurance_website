import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import API_BASE_URL from "../config/api";
import "../styles/ProductDetailPage.css";

function ProductDetailPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/products/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          setError(
            data.message || "Product not found"
          );
          return;
        }

        setProduct(data);
      } catch (error) {
        console.error(
          "Failed to load product:",
          error
        );

        setError(
          "Unable to load product details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="product-detail-page">
          <div className="product-detail-loading">
            Loading product details...
          </div>
        </main>

        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />

        <main className="product-detail-page">
          <div className="product-detail-error">
            <h1>Product Not Found</h1>

            <p>
              {error ||
                "The insurance product you are looking for does not exist."}
            </p>

            <Link to="/products">
              ← Back to Products
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="product-detail-page">

        {/* HEADER */}
        <section className="product-detail-hero">
          <div className="product-detail-container">

            <span className="product-detail-category">
              {product.category.toUpperCase()} INSURANCE
            </span>

            <h1>
              {product.title}
            </h1>

            <p className="product-detail-description">
              {product.description}
            </p>

          </div>
        </section>


        {/* DETAILS */}
        <section className="product-detail-content">
          <div className="product-detail-container">

            <div className="product-detail-grid">

              {/* MAIN CONTENT */}
              <div className="product-detail-main">

                <div className="detail-card">
                  <h2>
                    About {product.title}
                  </h2>

                  <p>
                    {product.description}
                  </p>
                </div>


                <div className="detail-card">
                  <h2>
                    Coverage
                  </h2>

                  <p>
                    {product.coverage}
                  </p>
                </div>

              </div>


              {/* SIDE CARD */}
              <aside className="product-price-card">

                <span>
                  Starting from
                </span>

                <h2>
                  ₹{product.startingPrice}
                </h2>

                <p>
                  Premium may vary based on
                  your individual requirements.
                </p>

                <Link
                  to="/support"
                  className="product-detail-button"
                >
                  Get Assistance
                </Link>

              </aside>

            </div>

          </div>
        </section>


        {/* BACK */}
        <section className="product-detail-bottom">
          <Link to="/products">
            ← View All Insurance Products
          </Link>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default ProductDetailPage;