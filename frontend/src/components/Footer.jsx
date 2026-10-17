


/*


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API_BASE_URL from "../config/api";
import "../styles/Footer.css";

function Footer() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/products?featured=true`
        );

        const data = await response.json();

        if (response.ok) {
          setFeaturedProducts(data);
        }
      } catch (error) {
        console.error(
          "Failed to load footer products:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            Insure<span>X</span>
          </Link>

          <p>
            Simple insurance. Clear protection.
            Peace of mind for what matters most.
          </p>

          <div className="social-links">
            <a href="#instagram">ig</a>
            <a href="#linkedin">in</a>
            <a href="#twitter">𝕏</a>
          </div>
        </div>


        {/* FEATURED PRODUCTS *}
        <div className="footer-column">
          <h4>Products</h4>

          {loading ? (
            <span>Loading...</span>
          ) : featuredProducts.length === 0 ? (
            <span>No featured products</span>
          ) : (
            featuredProducts.map((product) => (
              <Link
                key={product._id}
                to={`/insurance/product/${product._id}`}
              >
                {product.title}
              </Link>
            ))
          )}
        </div>


        <div className="footer-column">
          <h4>Resources</h4>

          <Link to="/resources">
            Insurance Guide
          </Link>

          <Link to="/resources">
            Blog
          </Link>

          <Link to="/resources">
            Claims Guide
          </Link>

          <Link to="/resources">
            FAQs
          </Link>
        </div>


        <div className="footer-column">
          <h4>Support</h4>

          <Link to="/support">
            Help Center
          </Link>

          <Link to="/support">
            Contact Us
          </Link>

          <Link to="/support">
            Claims Support
          </Link>

          <Link to="/support">
            Policy Assistance
          </Link>
        </div>


        <div className="footer-column">
          <h4>Company</h4>

          <Link to="/resources">
            About Us
          </Link>

          <Link to="/resources">
            Careers
          </Link>

          <Link to="/resources">
            Privacy Policy
          </Link>

          <Link to="/resources">
            Terms
          </Link>
        </div>

      </div>


      <div className="footer-bottom">
        <p>
          © 2026 InsureX. All rights reserved.
        </p>

        <p>
          Built for a simpler insurance experience.
        </p>
      </div>

    </footer>
  );
}

export default Footer; */





import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API_BASE_URL from "../config/api";
import "../styles/Footer.css";

function Footer() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/categories`
        );

        const data = await response.json();

        if (response.ok) {
          setCategories(data.filter((category) => category.active));
        }
      } catch (error) {
        console.error("Failed to load footer categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            Policy<span>News</span>
          </Link>

          <p>
            Simple insurance. Clear protection.
            Peace of mind for what matters most.
          </p>

          <div className="social-links">
            <a href="#instagram">ig</a>
            <a href="#linkedin">in</a>
            <a href="#twitter">𝕏</a>
          </div>
        </div>

        {/* DYNAMIC CATEGORIES */}
        <div className="footer-column">
          <h4>Products</h4>

          {loading ? (
            <span>Loading categories...</span>
          ) : categories.length === 0 ? (
            <span>No categories available</span>
          ) : (
            categories.map((category) => (
              <Link
                key={category._id || category.slug}
                to={`/products?category=${encodeURIComponent(category.slug)}`}
              >
                {category.name}
              </Link>
            ))
          )}
        </div>

        <div className="footer-column">
          <h4>Resources</h4>
          <Link to="/resources">Insurance Guide</Link>
          <Link to="/resources">Blog</Link>
          <Link to="/resources">Claims Guide</Link>
          <Link to="/resources">FAQs</Link>
        </div>

        <div className="footer-column">
          <h4>Support</h4>
          <Link to="/support">Help Center</Link>
          <Link to="/support">Contact Us</Link>
          <Link to="/support">Claims Support</Link>
          <Link to="/support">Policy Assistance</Link>
        </div>

        <div className="footer-column">
          <h4>Company</h4>
          <Link to="/resources">About Us</Link>
          <Link to="/resources">Careers</Link>
          <Link to="/resources">Privacy Policy</Link>
          <Link to="/resources">Terms</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 PolicyNews. All rights reserved.</p>
        <p>Built for a simpler insurance experience.</p>
      </div>
    </footer>
  );
}

export default Footer;
