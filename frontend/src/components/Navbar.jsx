/*import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        <Link to="/" className="logo">
          Insure<span>X</span>
        </Link>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          ☰
        </button>

        <nav className={`nav-links ${mobileMenu ? "mobile-open" : ""}`}>

          {/* PRODUCTS *
          <div className="nav-dropdown">
            <button
              className="nav-item"
              onClick={() => toggleMenu("products")}
            >
              Products
              <span className="arrow">⌄</span>
            </button>

            {openMenu === "products" && (
              <div className="dropdown-menu">
                <Link to="/products">Health Insurance</Link>
                <Link to="/products">Life Insurance</Link>
                <Link to="/products">Car Insurance</Link>
                <Link to="/products">Home Insurance</Link>
                <Link to="/products">Travel Insurance</Link>
              </div>
            )}
          </div>

          {/* RESOURCES *}
          <div className="nav-dropdown">
            <button
              className="nav-item"
              onClick={() => toggleMenu("resources")}
            >
              Resources
              <span className="arrow">⌄</span>
            </button>

            {openMenu === "resources" && (
              <div className="dropdown-menu">
                <Link to="/resources">Insurance Guide</Link>
                <Link to="/resources">Insurance Blog</Link>
                <Link to="/resources">Claims Guide</Link>
                <Link to="/resources">FAQs</Link>
              </div>
            )}
          </div>

          {/* SUPPORT *}
          <div className="nav-dropdown">
            <button
              className="nav-item"
              onClick={() => toggleMenu("support")}
            >
              Support
              <span className="arrow">⌄</span>
            </button>

            {openMenu === "support" && (
              <div className="dropdown-menu">
                <Link to="/support">Help Center</Link>
                <Link to="/support">Contact Us</Link>
                <Link to="/support">Claims Support</Link>
                <Link to="/support">Policy Assistance</Link>
              </div>
            )}
          </div>

          <Link
            to="/login"
            className="login-link"
            onClick={() => setMobileMenu(false)}
          >
            Login
          </Link>

          <Link
            to="/products"
            className="nav-cta"
            onClick={() => setMobileMenu(false)}
          >
            Get Started
          </Link>

        </nav>
      </div>
    </header>
  );
}

export default Navbar; */



import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        <Link to="/" className="logo">
          Insure<span>X</span>
        </Link>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          ☰
        </button>

        <nav className={`nav-links ${mobileMenu ? "mobile-open" : ""}`}>

          {/* HOME */}
          <Link
            to="/"
            className="nav-item home-link"
            onClick={() => setMobileMenu(false)}
          >
            Home
          </Link>
<div className="nav-dropdown">
  <button
    className="nav-item"
    onClick={() => toggleMenu("products")}
  >
    Products <span className="arrow">⌄</span>
  </button>

  {openMenu === "products" && (
    <div className="dropdown-menu">
      <Link to="/insurance/health">Health Insurance</Link>
      <Link to="/insurance/life">Life Insurance</Link>
      <Link to="/insurance/car">Car Insurance</Link>
      <Link to="/insurance/bike">Bike Insurance</Link>
      <Link to="/insurance/home">Home Insurance</Link>
      <Link to="/insurance/travel">Travel Insurance</Link>
    </div>
  )}
</div>


          {/* RESOURCES */}
          <div className="nav-dropdown">
            <button
              className="nav-item"
              onClick={() => toggleMenu("resources")}
            >
              Resources
              <span className="arrow">⌄</span>
            </button>

            {openMenu === "resources" && (
              <div className="dropdown-menu">
                <Link to="/resources">Insurance Guide</Link>
                <Link to="/resources">Insurance Blog</Link>
                <Link to="/resources">Claims Guide</Link>
                <Link to="/resources">FAQs</Link>
              </div>
            )}
          </div>

          {/* SUPPORT */}
          <div className="nav-dropdown">
            <button
              className="nav-item"
              onClick={() => toggleMenu("support")}
            >
              Support
              <span className="arrow">⌄</span>
            </button>

            {openMenu === "support" && (
              <div className="dropdown-menu">
                <Link to="/support">Help Center</Link>
                <Link to="/support">Contact Us</Link>
                <Link to="/support">Claims Support</Link>
                <Link to="/support">Policy Assistance</Link>
              </div>
            )}
          </div>

          {/* LOGIN */}
          <Link
            to="/login"
            className="login-link"
            onClick={() => setMobileMenu(false)}
          >
            Login
          </Link>

          {/* GET STARTED */}
          <Link
            to="/signup"
            className="nav-cta"
            onClick={() => setMobileMenu(false)}
          >
            Get Started
          </Link>

        </nav>
      </div>
    </header>
  );
}

export default Navbar;


