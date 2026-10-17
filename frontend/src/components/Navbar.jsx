/*

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API_BASE_URL from "../config/api";
import "../styles/Navbar.css";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const navigate = useNavigate();

  // Get logged-in user from localStorage
  const storedUser = localStorage.getItem("hf_user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  // Fetch active products from backend
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
        console.error(
          "Failed to load navbar products:",
          error
        );
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  const handleProductClick = () => {
    setOpenMenu(null);
    setMobileMenu(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* LOGO *}
        <Link to="/" className="logo">
          Policy<span>News</span>
        </Link>


        {/* MOBILE BUTTON *}
        <button
          className="mobile-menu-btn"
          onClick={() =>
            setMobileMenu(!mobileMenu)
          }
        >
          ☰
        </button>


        <nav
          className={`nav-links ${
            mobileMenu ? "mobile-open" : ""
          }`}
        >

          {/* HOME *}
          <Link
            to="/"
            className="nav-item home-link"
            onClick={() => setMobileMenu(false)}
          >
            Home
          </Link>


          {/* PRODUCTS *}
          <div className="nav-dropdown">
            <button
              className="nav-item"
              onClick={() =>
                toggleMenu("products")
              }
            >
              Products
              <span className="arrow">⌄</span>
            </button>

            {openMenu === "products" && (
              <div className="dropdown-menu">

                {productsLoading ? (
                  <span>
                    Loading products...
                  </span>
                ) : products.length === 0 ? (
                  <span>
                    No products available
                  </span>
                ) : (
                  products.map((product) => (
                    <Link
                      key={product._id}
                      to={`/insurance/product/${product._id}`}
                      onClick={handleProductClick}
                    >
                      {product.title}
                    </Link>
                  ))
                )}

              </div>
            )}
          </div>

         {/* NEWS *}
<Link
  to="/news"
  className="nav-item"
  onClick={() => {
    setMobileMenu(false);
    setOpenMenu(null);
  }}
>
  News
</Link>


          {/* RESOURCES *}
          <div className="nav-dropdown">
            <button
              className="nav-item"
              onClick={() =>
                toggleMenu("resources")
              }
            >
              Resources
              <span className="arrow">⌄</span>
            </button>

            {openMenu === "resources" && (
              <div className="dropdown-menu">

                <Link
                  to="/resources"
                  onClick={handleProductClick}
                >
                  Insurance Guide
                </Link>

                <Link
                  to="/resources"
                  onClick={handleProductClick}
                >
                  Insurance Blog
                </Link>

                <Link
                  to="/resources"
                  onClick={handleProductClick}
                >
                  Claims Guide
                </Link>

                <Link
                  to="/resources"
                  onClick={handleProductClick}
                >
                  FAQs
                </Link>

              </div>
            )}
          </div>


          {/* SUPPORT *}
          <div className="nav-dropdown">
            <button
              className="nav-item"
              onClick={() =>
                toggleMenu("support")
              }
            >
              Support
              <span className="arrow">⌄</span>
            </button>

            {openMenu === "support" && (
              <div className="dropdown-menu">

                <Link
                  to="/support"
                  onClick={handleProductClick}
                >
                  Help Center
                </Link>

                <Link
                  to="/support"
                  onClick={handleProductClick}
                >
                  Contact Us
                </Link>

                <Link
                  to="/support"
                  onClick={handleProductClick}
                >
                  Claims Support
                </Link>

                <Link
                  to="/support"
                  onClick={handleProductClick}
                >
                  Policy Assistance
                </Link>

              </div>
            )}
          </div>


          {/* =========================
              NOT LOGGED IN
          ========================= *}

          {!user && (
            <>
              <Link
                to="/login"
                className="login-link"
                onClick={() =>
                  setMobileMenu(false)
                }
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="nav-cta"
                onClick={() =>
                  setMobileMenu(false)
                }
              >
                Get Started
              </Link>
            </>
          )}


          {/* =========================
              LOGGED IN
          ========================= *}

          {user && (
            <div className="profile-dropdown">

              <button
                className="profile-button"
                onClick={handleProfileClick}
              >
                <span className="profile-icon">
                  {user.name
                    .charAt(0)
                    .toUpperCase()}
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


                  {/* ADMIN ONLY *}
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

*/





import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API_BASE_URL from "../config/api";
import "../styles/Navbar.css";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [openCategory, setOpenCategory] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const storedUser = localStorage.getItem("hf_user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const [categoryResponse, productResponse] =
          await Promise.all([
            fetch(`${API_BASE_URL}/categories`),
            fetch(`${API_BASE_URL}/products`),
          ]);

        if (categoryResponse.ok) {
          setCategories(await categoryResponse.json());
        }

        if (productResponse.ok) {
          setProducts(await productResponse.json());
        }
      } catch (error) {
        console.error("Failed to load navbar data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
    setOpenCategory(null);
    setProfileMenu(false);
  };

  const closeNavigation = () => {
    setOpenMenu(null);
    setOpenCategory(null);
    setMobileMenu(false);
    setProfileMenu(false);
  };

  const handleProfileClick = () => {
    setProfileMenu(!profileMenu);
    setOpenMenu(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("hf_token");
    localStorage.removeItem("hf_user");
    closeNavigation();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          Policy<span>News</span>
        </Link>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle navigation"
          aria-expanded={mobileMenu}
        >
          ☰
        </button>

        <nav className={`nav-links ${mobileMenu ? "mobile-open" : ""}`}>
          <Link
            to="/"
            className="nav-item home-link"
            onClick={closeNavigation}
          >
            Home
          </Link>

          {/* PRODUCTS */}
          <div className="nav-dropdown">
            <button
              className="nav-item"
              onClick={() => toggleMenu("products")}
              aria-expanded={openMenu === "products"}
            >
              Products <span className="arrow">⌄</span>
            </button>

            {openMenu === "products" && (
              <div className="dropdown-menu products-dropdown">
                {loading ? (
                  <span className="dropdown-message">
                    Loading categories...
                  </span>
                ) : categories.length === 0 ? (
                  <span className="dropdown-message">
                    No categories available
                  </span>
                ) : (
                  categories.map((category) => {
                    const categoryProducts = products.filter(
                      (product) =>
                        product.category === category.slug
                    );

                    return (
                      <div
                        className={`product-category-item ${
                          openCategory === category.slug
                            ? "submenu-open"
                            : ""
                        }`}
                        key={category._id || category.slug}
                      >
                        <button
                          className="category-menu-button"
                          onClick={() =>
                            setOpenCategory(
                              openCategory === category.slug
                                ? null
                                : category.slug
                            )
                          }
                          aria-expanded={
                            openCategory === category.slug
                          }
                        >
                          <span>{category.name}</span>
                          <span className="submenu-arrow">›</span>
                        </button>

                        <div className="product-submenu">
                          {categoryProducts.length === 0 ? (
                            <span className="dropdown-message">
                              No products yet
                            </span>
                          ) : (
                            categoryProducts.map((product) => (
                              <Link
                                key={product._id}
                                to={`/insurance/product/${product._id}`}
                                onClick={closeNavigation}
                              >
                                {product.title}
                              </Link>
                            ))
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>

          <Link
            to="/news"
            className="nav-item"
            onClick={closeNavigation}
          >
            News
          </Link>

          {/* RESOURCES */}
          <div className="nav-dropdown">
            <button
              className="nav-item"
              onClick={() => toggleMenu("resources")}
              aria-expanded={openMenu === "resources"}
            >
              Resources <span className="arrow">⌄</span>
            </button>

            {openMenu === "resources" && (
              <div className="dropdown-menu">
                <Link to="/resources" onClick={closeNavigation}>
                  Insurance Guide
                </Link>
                <Link to="/resources" onClick={closeNavigation}>
                  Insurance Blog
                </Link>
                <Link to="/resources" onClick={closeNavigation}>
                  Claims Guide
                </Link>
                <Link to="/resources" onClick={closeNavigation}>
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
              aria-expanded={openMenu === "support"}
            >
              Support <span className="arrow">⌄</span>
            </button>

            {openMenu === "support" && (
              <div className="dropdown-menu">
                <Link to="/support" onClick={closeNavigation}>
                  Help Center
                </Link>
                <Link to="/support" onClick={closeNavigation}>
                  Contact Us
                </Link>
                <Link to="/support" onClick={closeNavigation}>
                  Claims Support
                </Link>
                <Link to="/support" onClick={closeNavigation}>
                  Policy Assistance
                </Link>
              </div>
            )}
          </div>

          {!user && (
            <>
              <Link
                to="/login"
                className="login-link"
                onClick={closeNavigation}
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="nav-cta"
                onClick={closeNavigation}
              >
                Get Started
              </Link>
            </>
          )}

          {user && (
            <div className="profile-dropdown">
              <button
                className="profile-button"
                onClick={handleProfileClick}
                aria-label="Open profile menu"
              >
                <span className="profile-icon">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </button>

              {profileMenu && (
                <div className="profile-menu">
                  <div className="profile-info">
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                  </div>

                  <div className="profile-divider" />

                  <Link to="/profile" onClick={closeNavigation}>
                    Profile
                  </Link>

                  {user.role === "admin" && (
                    <Link to="/admin" onClick={closeNavigation}>
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

