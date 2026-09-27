/*



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

          {/* HOME *}
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

          {/* SUPPORT /}
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

          {/* LOGIN *}
          <Link
            to="/login"
            className="login-link"
            onClick={() => setMobileMenu(false)}
          >
            Login
          </Link>

          {/* GET STARTED *}
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

export default Navbar; */


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const navigate = useNavigate();

  // Get logged-in user from localStorage
  const storedUser = localStorage.getItem("hf_user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
    setProfileMenu(false);
  };

  const handleProfileClick = () => {
    setProfileMenu(!profileMenu);
    setOpenMenu(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("hf_token");
    localStorage.removeItem("hf_user");

    setProfileMenu(false);
    setMobileMenu(false);

    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <Link to="/" className="logo">
          Insure<span>X</span>
        </Link>


        {/* MOBILE BUTTON */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          ☰
        </button>


        <nav
          className={`nav-links ${
            mobileMenu ? "mobile-open" : ""
          }`}
        >

          {/* HOME */}
          <Link
            to="/"
            className="nav-item home-link"
            onClick={() => setMobileMenu(false)}
          >
            Home
          </Link>


          {/* PRODUCTS */}
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

                <Link to="/insurance/health">
                  Health Insurance
                </Link>

                <Link to="/insurance/life">
                  Life Insurance
                </Link>

                <Link to="/insurance/car">
                  Car Insurance
                </Link>

                <Link to="/insurance/bike">
                  Bike Insurance
                </Link>

                <Link to="/insurance/home">
                  Home Insurance
                </Link>

                <Link to="/insurance/travel">
                  Travel Insurance
                </Link>

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

                <Link to="/resources">
                  Insurance Guide
                </Link>

                <Link to="/resources">
                  Insurance Blog
                </Link>

                <Link to="/resources">
                  Claims Guide
                </Link>

                <Link to="/resources">
                  FAQs
                </Link>

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
            )}
          </div>


          {/* =========================
              NOT LOGGED IN
          ========================= */}

          {!user && (
            <>
              <Link
                to="/login"
                className="login-link"
                onClick={() => setMobileMenu(false)}
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="nav-cta"
                onClick={() => setMobileMenu(false)}
              >
                Get Started
              </Link>
            </>
          )}


          {/* =========================
              LOGGED IN
          ========================= */}

          {user && (
            <div className="profile-dropdown">

              <button
                className="profile-button"
                onClick={handleProfileClick}
              >
                <span className="profile-icon">
  {user.name.charAt(0).toUpperCase()}
</span>
              </button>


              {profileMenu && (
                <div className="profile-menu">

                  <div className="profile-info">

                    <strong>
                      {user.name}
                    </strong>

                    <span>
                      {user.email}
                    </span>

                  </div>


                  <div className="profile-divider"></div>


                  <Link
                    to="/profile"
                    onClick={() => {
                      setProfileMenu(false);
                      setMobileMenu(false);
                    }}
                  >
                    Profile
                  </Link>


                  {/* ADMIN ONLY */}
                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={() => {
                        setProfileMenu(false);
                        setMobileMenu(false);
                      }}
                    >
                      Admin Dashboard
                    </Link>
                  )}


                  <button
                    className="logout-button"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>
          )}

        </nav>
      </div>
    </header>
  );
}

export default Navbar;


