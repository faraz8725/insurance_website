/*import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import "../styles/AdminDashboard.css";

import API_BASE_URL from "../config/api";

function AdminDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");

  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    faqs: 0,
    partners: 0,
    claims: 0,
    enquiries: 0,
  });

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [partners, setPartners] = useState([]);
  const [claims, setClaims] = useState([]);
  const [enquiries, setEnquiries] = useState([]);

  const [loading, setLoading] = useState(false);

  const [productForm, setProductForm] = useState({
    title: "",
    category: "health",
    description: "",
    coverage: "",
    startingPrice: "",
  });

  const [faqForm, setFaqForm] = useState({
    question: "",
    answer: "",
  });

  const [partnerForm, setPartnerForm] = useState({
    companyName: "",
    logo: "",
    description: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("hf_user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);

      if (parsedUser.role !== "admin") {
        navigate("/");
        return;
      }

      setUser(parsedUser);
      loadDashboard();
    } catch (error) {
      localStorage.removeItem("hf_user");
      localStorage.removeItem("hf_token");
      navigate("/login");
    }
  }, [navigate]);

  const getHeaders = () => {
    const token = localStorage.getItem("hf_token");

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/admin/dashboard`,
        {
          headers: getHeaders(),
        }
      );

      if (response.status === 401 || response.status === 403) {
        handleLogout();
        return;
      }

      const data = await response.json();

      if (response.ok) {
        setStats(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/users`,
        {
          headers: getHeaders(),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUsers(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/products`,
        {
          headers: getHeaders(),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setProducts(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadFaqs = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/faqs`,
        {
          headers: getHeaders(),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setFaqs(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadPartners = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/partners`,
        {
          headers: getHeaders(),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setPartners(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadClaims = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/claims`,
        {
          headers: getHeaders(),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setClaims(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadEnquiries = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/enquiries`,
        {
          headers: getHeaders(),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setEnquiries(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);

    if (section === "users") loadUsers();
    if (section === "products") loadProducts();
    if (section === "faqs") loadFaqs();
    if (section === "partners") loadPartners();
    if (section === "claims") loadClaims();
    if (section === "enquiries") loadEnquiries();
  };

  const handleLogout = () => {
    localStorage.removeItem("hf_token");
    localStorage.removeItem("hf_user");

    navigate("/login");
  };

  // =========================
  // PRODUCT
  // =========================

  const handleProductChange = (e) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/products`,
        {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(productForm),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to add product");
        return;
      }

      alert("Product added successfully");

      setProductForm({
        title: "",
        category: "health",
        description: "",
        coverage: "",
        startingPrice: "",
      });

      loadProducts();
      loadDashboard();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/products/${id}`,
        {
          method: "DELETE",
          headers: getHeaders(),
        }
      );

      if (response.ok) {
        loadProducts();
        loadDashboard();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // FAQ
  // =========================

  const handleFaqChange = (e) => {
    setFaqForm({
      ...faqForm,
      [e.target.name]: e.target.value,
    });
  };

  const addFaq = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/faqs`,
        {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(faqForm),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to add FAQ");
        return;
      }

      alert("FAQ added successfully");

      setFaqForm({
        question: "",
        answer: "",
      });

      loadFaqs();
      loadDashboard();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFaq = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this FAQ?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/faqs/${id}`,
        {
          method: "DELETE",
          headers: getHeaders(),
        }
      );

      if (response.ok) {
        loadFaqs();
        loadDashboard();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // PARTNER
  // =========================

  const handlePartnerChange = (e) => {
    setPartnerForm({
      ...partnerForm,
      [e.target.name]: e.target.value,
    });
  };

  const addPartner = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/partners`,
        {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(partnerForm),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to add partner");
        return;
      }

      alert("Partner added successfully");

      setPartnerForm({
        companyName: "",
        logo: "",
        description: "",
      });

      loadPartners();
      loadDashboard();
    } catch (error) {
      console.error(error);
    }
  };

  const deletePartner = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this partner?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/partners/${id}`,
        {
          method: "DELETE",
          headers: getHeaders(),
        }
      );

      if (response.ok) {
        loadPartners();
        loadDashboard();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // CLAIM
  // =========================

  const updateClaimStatus = async (id, status) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/claims/${id}`,
        {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        loadClaims();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // ENQUIRY
  // =========================

  const updateEnquiryStatus = async (id, status) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/enquiries/${id}`,
        {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        loadEnquiries();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar />

      <div className="admin-page">

        {/* SIDEBAR *}

        <aside className="admin-sidebar">

          <div className="admin-sidebar-title">
            <span>Insure</span>X
            <small>Admin Panel</small>
          </div>

          <nav className="admin-nav">

            <button
              className={
                activeSection === "dashboard"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleSectionChange("dashboard")
              }
            >
              <span>▦</span>
              Dashboard
            </button>

            <button
              className={
                activeSection === "users"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleSectionChange("users")
              }
            >
              <span>👥</span>
              Users
            </button>

            <button
              className={
                activeSection === "products"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleSectionChange("products")
              }
            >
              <span>🛡</span>
              Products
            </button>

            <button
              className={
                activeSection === "faqs"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleSectionChange("faqs")
              }
            >
              <span>?</span>
              FAQs
            </button>

            <button
              className={
                activeSection === "partners"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleSectionChange("partners")
              }
            >
              <span>🏢</span>
              Partners
            </button>

            <button
              className={
                activeSection === "claims"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleSectionChange("claims")
              }
            >
              <span>📄</span>
              Claims
            </button>

            <button
              className={
                activeSection === "enquiries"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleSectionChange("enquiries")
              }
            >
              <span>✉</span>
              Enquiries
            </button>

          </nav>

          <button
            className="admin-logout"
            onClick={handleLogout}
          >
            ↪ Logout
          </button>

        </aside>


        {/* MAIN CONTENT *}

        <main className="admin-content">

          <div className="admin-topbar">
            <div>
              <span className="admin-tag">
                ADMIN PANEL
              </span>

              <h1>
                Welcome, {user.name}
              </h1>
            </div>

            <div className="admin-user">
              <span>
                {user.name.charAt(0).toUpperCase()}
              </span>

              <div>
                <strong>{user.name}</strong>
                <small>{user.email}</small>
              </div>
            </div>
          </div>


          {/* DASHBOARD *}

          {activeSection === "dashboard" && (
            <section>

              <div className="admin-section-heading">
                <div>
                  <h2>Dashboard Overview</h2>
                  <p>
                    Manage your InsureX platform from here.
                  </p>
                </div>

                <button
                  className="refresh-button"
                  onClick={loadDashboard}
                >
                  ↻ Refresh
                </button>
              </div>

              <div className="stats-grid">

                <div className="stat-card">
                  <span>👥</span>
                  <div>
                    <small>Total Users</small>
                    <strong>{stats.users}</strong>
                  </div>
                </div>

                <div className="stat-card">
                  <span>🛡</span>
                  <div>
                    <small>Products</small>
                    <strong>{stats.products}</strong>
                  </div>
                </div>

                <div className="stat-card">
                  <span>?</span>
                  <div>
                    <small>FAQs</small>
                    <strong>{stats.faqs}</strong>
                  </div>
                </div>

                <div className="stat-card">
                  <span>🏢</span>
                  <div>
                    <small>Partners</small>
                    <strong>{stats.partners}</strong>
                  </div>
                </div>

                <div className="stat-card">
                  <span>📄</span>
                  <div>
                    <small>Claims</small>
                    <strong>{stats.claims}</strong>
                  </div>
                </div>

                <div className="stat-card">
                  <span>✉</span>
                  <div>
                    <small>Enquiries</small>
                    <strong>{stats.enquiries}</strong>
                  </div>
                </div>

              </div>

            </section>
          )}


          {/* USERS *}

          {activeSection === "users" && (
            <section className="admin-section">

              <div className="admin-section-heading">
                <div>
                  <h2>Users</h2>
                  <p>
                    Registered InsureX users.
                  </p>
                </div>

                <button
                  className="refresh-button"
                  onClick={loadUsers}
                >
                  ↻ Refresh
                </button>
              </div>

              <div className="admin-table-wrapper">

                <table className="admin-table">

                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Joined</th>
                    </tr>
                  </thead>

                  <tbody>

                    {users.map((item) => (
                      <tr key={item._id}>

                        <td>
                          <strong>{item.name}</strong>
                        </td>

                        <td>{item.email}</td>

                        <td>{item.phone}</td>

                        <td>
                          <span className="status-badge">
                            {item.role}
                          </span>
                        </td>

                        <td>
                          {new Date(
                            item.createdAt
                          ).toLocaleDateString()}
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

                {users.length === 0 && (
                  <p className="empty-message">
                    No users found.
                  </p>
                )}

              </div>

            </section>
          )}


          {/* PRODUCTS *}

          {activeSection === "products" && (
            <section className="admin-section">

              <div className="admin-section-heading">
                <div>
                  <h2>Insurance Products</h2>
                  <p>
                    Add and manage insurance products.
                  </p>
                </div>
              </div>


              <form
                className="admin-form"
                onSubmit={addProduct}
              >

                <div className="form-row">

                  <div>
                    <label>Product Name</label>

                    <input
                      type="text"
                      name="title"
                      value={productForm.title}
                      onChange={handleProductChange}
                      placeholder="Health Insurance"
                      required
                    />
                  </div>

                  <div>
                    <label>Category</label>

                    <select
                      name="category"
                      value={productForm.category}
                      onChange={handleProductChange}
                    >
                      <option value="health">
                        Health
                      </option>

                      <option value="life">
                        Life
                      </option>

                      <option value="car">
                        Car
                      </option>

                      <option value="bike">
                        Bike
                      </option>

                      <option value="home">
                        Home
                      </option>

                      <option value="travel">
                        Travel
                      </option>

                      <option value="business">
                        Business
                      </option>
                    </select>
                  </div>

                </div>


                <label>Description</label>

                <textarea
                  name="description"
                  value={productForm.description}
                  onChange={handleProductChange}
                  placeholder="Product description"
                  required
                />


                <label>Coverage</label>

                <textarea
                  name="coverage"
                  value={productForm.coverage}
                  onChange={handleProductChange}
                  placeholder="What does this insurance cover?"
                  required
                />


                <label>Starting Price</label>

                <input
                  type="number"
                  name="startingPrice"
                  value={productForm.startingPrice}
                  onChange={handleProductChange}
                  placeholder="5000"
                />


                <button
                  type="submit"
                  className="primary-button"
                >
                  + Add Product
                </button>

              </form>


              <div className="admin-list">

                {products.map((product) => (
                  <div
                    className="admin-list-card"
                    key={product._id}
                  >

                    <div>
                      <span className="category-badge">
                        {product.category}
                      </span>

                      <h3>{product.title}</h3>

                      <p>
                        {product.description}
                      </p>

                      <small>
                        Starting from ₹
                        {product.startingPrice}
                      </small>
                    </div>

                    <button
                      className="delete-button"
                      onClick={() =>
                        deleteProduct(product._id)
                      }
                    >
                      Delete
                    </button>

                  </div>
                ))}

              </div>

            </section>
          )}


          {/* FAQ *}

          {activeSection === "faqs" && (
            <section className="admin-section">

              <div className="admin-section-heading">
                <div>
                  <h2>FAQs</h2>
                  <p>
                    Manage frequently asked questions.
                  </p>
                </div>
              </div>


              <form
                className="admin-form"
                onSubmit={addFaq}
              >

                <label>Question</label>

                <input
                  type="text"
                  name="question"
                  value={faqForm.question}
                  onChange={handleFaqChange}
                  placeholder="What is health insurance?"
                  required
                />


                <label>Answer</label>

                <textarea
                  name="answer"
                  value={faqForm.answer}
                  onChange={handleFaqChange}
                  placeholder="Write the answer..."
                  required
                />


                <button
                  type="submit"
                  className="primary-button"
                >
                  + Add FAQ
                </button>

              </form>


              <div className="admin-list">

                {faqs.map((faq) => (
                  <div
                    className="admin-list-card"
                    key={faq._id}
                  >

                    <div>
                      <h3>{faq.question}</h3>

                      <p>{faq.answer}</p>
                    </div>

                    <button
                      className="delete-button"
                      onClick={() =>
                        deleteFaq(faq._id)
                      }
                    >
                      Delete
                    </button>

                  </div>
                ))}

              </div>

            </section>
          )}


          {/* PARTNERS *}

          {activeSection === "partners" && (
            <section className="admin-section">

              <div className="admin-section-heading">
                <div>
                  <h2>Insurance Partners</h2>
                  <p>
                    Add and manage partner companies.
                  </p>
                </div>
              </div>


              <form
                className="admin-form"
                onSubmit={addPartner}
              >

                <label>Company Name</label>

                <input
                  type="text"
                  name="companyName"
                  value={partnerForm.companyName}
                  onChange={handlePartnerChange}
                  placeholder="ABC Insurance"
                  required
                />


                <label>Logo URL</label>

                <input
                  type="text"
                  name="logo"
                  value={partnerForm.logo}
                  onChange={handlePartnerChange}
                  placeholder="https://..."
                />


                <label>Description</label>

                <textarea
                  name="description"
                  value={partnerForm.description}
                  onChange={handlePartnerChange}
                  placeholder="Company description"
                />


                <button
                  type="submit"
                  className="primary-button"
                >
                  + Add Partner
                </button>

              </form>


              <div className="admin-list">

                {partners.map((partner) => (
                  <div
                    className="admin-list-card"
                    key={partner._id}
                  >

                    <div className="partner-info">

                      {partner.logo ? (
                        <img
                          src={partner.logo}
                          alt={partner.companyName}
                        />
                      ) : (
                        <div className="partner-placeholder">
                          {partner.companyName
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                      )}

                      <div>
                        <h3>
                          {partner.companyName}
                        </h3>

                        <p>
                          {partner.description}
                        </p>
                      </div>

                    </div>

                    <button
                      className="delete-button"
                      onClick={() =>
                        deletePartner(partner._id)
                      }
                    >
                      Delete
                    </button>

                  </div>
                ))}

              </div>

            </section>
          )}


          {/* CLAIMS *}

          {activeSection === "claims" && (
            <section className="admin-section">

              <div className="admin-section-heading">
                <div>
                  <h2>Claims</h2>
                  <p>
                    Review and update customer claims.
                  </p>
                </div>

                <button
                  className="refresh-button"
                  onClick={loadClaims}
                >
                  ↻ Refresh
                </button>
              </div>


              <div className="admin-table-wrapper">

                <table className="admin-table">

                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Policy</th>
                      <th>Claim Type</th>
                      <th>Description</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>

                    {claims.map((claim) => (
                      <tr key={claim._id}>

                        <td>
                          {claim.user?.name}
                          <small className="table-subtext">
                            {claim.user?.email}
                          </small>
                        </td>

                        <td>
                          {claim.policyNumber}
                        </td>

                        <td>
                          {claim.claimType}
                        </td>

                        <td>
                          {claim.description}
                        </td>

                        <td>

                          <select
                            value={claim.status}
                            onChange={(e) =>
                              updateClaimStatus(
                                claim._id,
                                e.target.value
                              )
                            }
                            className="status-select"
                          >

                            <option value="pending">
                              Pending
                            </option>

                            <option value="under_review">
                              Under Review
                            </option>

                            <option value="approved">
                              Approved
                            </option>

                            <option value="rejected">
                              Rejected
                            </option>

                          </select>

                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

                {claims.length === 0 && (
                  <p className="empty-message">
                    No claims found.
                  </p>
                )}

              </div>

            </section>
          )}


          {/* ENQUIRIES *}

          {activeSection === "enquiries" && (
            <section className="admin-section">

              <div className="admin-section-heading">
                <div>
                  <h2>Support Enquiries</h2>
                  <p>
                    Manage customer support requests.
                  </p>
                </div>

                <button
                  className="refresh-button"
                  onClick={loadEnquiries}
                >
                  ↻ Refresh
                </button>
              </div>


              <div className="admin-table-wrapper">

                <table className="admin-table">

                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>

                    {enquiries.map((enquiry) => (
                      <tr key={enquiry._id}>

                        <td>
                          {enquiry.name}
                        </td>

                        <td>
                          {enquiry.email}
                        </td>

                        <td>
                          {enquiry.subject}
                        </td>

                        <td>
                          {enquiry.message}
                        </td>

                        <td>

                          <select
                            value={enquiry.status}
                            onChange={(e) =>
                              updateEnquiryStatus(
                                enquiry._id,
                                e.target.value
                              )
                            }
                            className="status-select"
                          >

                            <option value="new">
                              New
                            </option>

                            <option value="in_progress">
                              In Progress
                            </option>

                            <option value="resolved">
                              Resolved
                            </option>

                          </select>

                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

                {enquiries.length === 0 && (
                  <p className="empty-message">
                    No enquiries found.
                  </p>
                )}

              </div>

            </section>
          )}

        </main>

      </div>
    </>
  );
}

export default AdminDashboard;  */








import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import "../styles/AdminDashboard.css";

import API_BASE_URL from "../config/api";

function AdminDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");

  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    faqs: 0,
    partners: 0,
    claims: 0,
    enquiries: 0,
  });

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [partners, setPartners] = useState([]);
  const [claims, setClaims] = useState([]);
  const [enquiries, setEnquiries] = useState([]);

  const [loading, setLoading] = useState(false);

  const [productForm, setProductForm] = useState({
    title: "",
    category: "health",
    description: "",
    coverage: "",
    startingPrice: "",
    featured: false,
  });

  const [faqForm, setFaqForm] = useState({
    question: "",
    answer: "",
  });

  const [partnerForm, setPartnerForm] = useState({
    companyName: "",
    logo: "",
    description: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("hf_user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);

      if (parsedUser.role !== "admin") {
        navigate("/");
        return;
      }

      setUser(parsedUser);
      loadDashboard();
    } catch (error) {
      localStorage.removeItem("hf_user");
      localStorage.removeItem("hf_token");
      navigate("/login");
    }
  }, [navigate]);

  const getHeaders = () => {
    const token = localStorage.getItem("hf_token");

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/admin/dashboard`,
        {
          headers: getHeaders(),
        }
      );

      if (response.status === 401 || response.status === 403) {
        handleLogout();
        return;
      }

      const data = await response.json();

      if (response.ok) {
        setStats(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/users`,
        {
          headers: getHeaders(),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUsers(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/products`,
        {
          headers: getHeaders(),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setProducts(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadFaqs = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/faqs`,
        {
          headers: getHeaders(),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setFaqs(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadPartners = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/partners`,
        {
          headers: getHeaders(),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setPartners(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadClaims = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/claims`,
        {
          headers: getHeaders(),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setClaims(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadEnquiries = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/enquiries`,
        {
          headers: getHeaders(),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setEnquiries(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);

    if (section === "users") loadUsers();
    if (section === "products") loadProducts();
    if (section === "faqs") loadFaqs();
    if (section === "partners") loadPartners();
    if (section === "claims") loadClaims();
    if (section === "enquiries") loadEnquiries();
  };

  const handleLogout = () => {
    localStorage.removeItem("hf_token");
    localStorage.removeItem("hf_user");

    navigate("/login");
  };

  // =========================
  // PRODUCT
  // =========================

  const handleProductChange = (e) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/products`,
        {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(productForm),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to add product");
        return;
      }

      alert("Product added successfully");

      setProductForm({
        title: "",
        category: "health",
        description: "",
        coverage: "",
        startingPrice: "",
        featured: false,
      });

      loadProducts();
      loadDashboard();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFeatured = async (id, currentFeatured) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/products/${id}`,
        {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify({
            featured: !currentFeatured,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to update featured status"
        );
        return;
      }

      loadProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/products/${id}`,
        {
          method: "DELETE",
          headers: getHeaders(),
        }
      );

      if (response.ok) {
        loadProducts();
        loadDashboard();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // FAQ
  // =========================

  const handleFaqChange = (e) => {
    setFaqForm({
      ...faqForm,
      [e.target.name]: e.target.value,
    });
  };

  const addFaq = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/faqs`,
        {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(faqForm),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to add FAQ");
        return;
      }

      alert("FAQ added successfully");

      setFaqForm({
        question: "",
        answer: "",
      });

      loadFaqs();
      loadDashboard();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFaq = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this FAQ?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/faqs/${id}`,
        {
          method: "DELETE",
          headers: getHeaders(),
        }
      );

      if (response.ok) {
        loadFaqs();
        loadDashboard();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // PARTNER
  // =========================

  const handlePartnerChange = (e) => {
    setPartnerForm({
      ...partnerForm,
      [e.target.name]: e.target.value,
    });
  };

  const addPartner = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/partners`,
        {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(partnerForm),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to add partner");
        return;
      }

      alert("Partner added successfully");

      setPartnerForm({
        companyName: "",
        logo: "",
        description: "",
      });

      loadPartners();
      loadDashboard();
    } catch (error) {
      console.error(error);
    }
  };

  const deletePartner = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this partner?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/partners/${id}`,
        {
          method: "DELETE",
          headers: getHeaders(),
        }
      );

      if (response.ok) {
        loadPartners();
        loadDashboard();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // CLAIM
  // =========================

  const updateClaimStatus = async (id, status) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/claims/${id}`,
        {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        loadClaims();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // ENQUIRY
  // =========================

  const updateEnquiryStatus = async (id, status) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/enquiries/${id}`,
        {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        loadEnquiries();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar />

      <div className="admin-page">

        {/* SIDEBAR */}

        <aside className="admin-sidebar">

          <div className="admin-sidebar-title">
            <span>Insure</span>X
            <small>Admin Panel</small>
          </div>

          <nav className="admin-nav">

            <button
              className={
                activeSection === "dashboard"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleSectionChange("dashboard")
              }
            >
              <span>▦</span>
              Dashboard
            </button>

            <button
              className={
                activeSection === "users"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleSectionChange("users")
              }
            >
              <span>👥</span>
              Users
            </button>

            <button
              className={
                activeSection === "products"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleSectionChange("products")
              }
            >
              <span>🛡</span>
              Products
            </button>

            <button
              className={
                activeSection === "faqs"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleSectionChange("faqs")
              }
            >
              <span>?</span>
              FAQs
            </button>

            <button
              className={
                activeSection === "partners"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleSectionChange("partners")
              }
            >
              <span>🏢</span>
              Partners
            </button>

            <button
              className={
                activeSection === "claims"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleSectionChange("claims")
              }
            >
              <span>📄</span>
              Claims
            </button>

            <button
              className={
                activeSection === "enquiries"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleSectionChange("enquiries")
              }
            >
              <span>✉</span>
              Enquiries
            </button>

          </nav>

          <button
            className="admin-logout"
            onClick={handleLogout}
          >
            ↪ Logout
          </button>

        </aside>


        {/* MAIN CONTENT */}

        <main className="admin-content">

          <div className="admin-topbar">

            <div>
              <span className="admin-tag">
                ADMIN PANEL
              </span>

              <h1>
                Welcome, {user.name}
              </h1>
            </div>

            <div className="admin-user">

              <span>
                {user.name.charAt(0).toUpperCase()}
              </span>

              <div>
                <strong>{user.name}</strong>
                <small>{user.email}</small>
              </div>

            </div>

          </div>


          {/* DASHBOARD */}

          {activeSection === "dashboard" && (
            <section>

              <div className="admin-section-heading">

                <div>
                  <h2>Dashboard Overview</h2>

                  <p>
                    Manage your InsureX platform from here.
                  </p>
                </div>

                <button
                  className="refresh-button"
                  onClick={loadDashboard}
                >
                  ↻ Refresh
                </button>

              </div>

              <div className="stats-grid">

                <div className="stat-card">
                  <span>👥</span>

                  <div>
                    <small>Total Users</small>
                    <strong>{stats.users}</strong>
                  </div>
                </div>

                <div className="stat-card">
                  <span>🛡</span>

                  <div>
                    <small>Products</small>
                    <strong>{stats.products}</strong>
                  </div>
                </div>

                <div className="stat-card">
                  <span>?</span>

                  <div>
                    <small>FAQs</small>
                    <strong>{stats.faqs}</strong>
                  </div>
                </div>

                <div className="stat-card">
                  <span>🏢</span>

                  <div>
                    <small>Partners</small>
                    <strong>{stats.partners}</strong>
                  </div>
                </div>

                <div className="stat-card">
                  <span>📄</span>

                  <div>
                    <small>Claims</small>
                    <strong>{stats.claims}</strong>
                  </div>
                </div>

                <div className="stat-card">
                  <span>✉</span>

                  <div>
                    <small>Enquiries</small>
                    <strong>{stats.enquiries}</strong>
                  </div>
                </div>

              </div>

            </section>
          )}


          {/* USERS */}

          {activeSection === "users" && (
            <section className="admin-section">

              <div className="admin-section-heading">

                <div>
                  <h2>Users</h2>

                  <p>
                    Registered InsureX users.
                  </p>
                </div>

                <button
                  className="refresh-button"
                  onClick={loadUsers}
                >
                  ↻ Refresh
                </button>

              </div>

              <div className="admin-table-wrapper">

                <table className="admin-table">

                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Joined</th>
                    </tr>
                  </thead>

                  <tbody>

                    {users.map((item) => (
                      <tr key={item._id}>

                        <td>
                          <strong>{item.name}</strong>
                        </td>

                        <td>{item.email}</td>

                        <td>{item.phone}</td>

                        <td>
                          <span className="status-badge">
                            {item.role}
                          </span>
                        </td>

                        <td>
                          {new Date(
                            item.createdAt
                          ).toLocaleDateString()}
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

                {users.length === 0 && (
                  <p className="empty-message">
                    No users found.
                  </p>
                )}

              </div>

            </section>
          )}


          {/* PRODUCTS */}

          {activeSection === "products" && (
            <section className="admin-section">

              <div className="admin-section-heading">

                <div>
                  <h2>Insurance Products</h2>

                  <p>
                    Add and manage insurance products.
                  </p>
                </div>

              </div>


              <form
                className="admin-form"
                onSubmit={addProduct}
              >

                <div className="form-row">

                  <div>

                    <label>Product Name</label>

                    <input
                      type="text"
                      name="title"
                      value={productForm.title}
                      onChange={handleProductChange}
                      placeholder="Health Insurance"
                      required
                    />

                  </div>

                  <div>

                    <label>Category</label>

                    <select
                      name="category"
                      value={productForm.category}
                      onChange={handleProductChange}
                    >

                      <option value="health">
                        Health
                      </option>

                      <option value="life">
                        Life
                      </option>

                      <option value="car">
                        Car
                      </option>

                      <option value="bike">
                        Bike
                      </option>

                      <option value="home">
                        Home
                      </option>

                      <option value="travel">
                        Travel
                      </option>

                      <option value="business">
                        Business
                      </option>

                    </select>

                  </div>

                </div>


                <label>Description</label>

                <textarea
                  name="description"
                  value={productForm.description}
                  onChange={handleProductChange}
                  placeholder="Product description"
                  required
                />


                <label>Coverage</label>

                <textarea
                  name="coverage"
                  value={productForm.coverage}
                  onChange={handleProductChange}
                  placeholder="What does this insurance cover?"
                  required
                />


                <label>Starting Price</label>

                <input
                  type="number"
                  name="startingPrice"
                  value={productForm.startingPrice}
                  onChange={handleProductChange}
                  placeholder="5000"
                />


                <label className="featured-checkbox">

                  <input
                    type="checkbox"
                    name="featured"
                    checked={productForm.featured}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        featured: e.target.checked,
                      })
                    }
                  />

                  <span>
                    Show this product on Home & Footer
                  </span>

                </label>


                <button
                  type="submit"
                  className="primary-button"
                >
                  + Add Product
                </button>

              </form>


              <div className="admin-list">

                {products.map((product) => (

                  <div
                    className="admin-list-card"
                    key={product._id}
                  >

                    <div>

                      <div className="product-admin-badges">

                        <span className="category-badge">
                          {product.category}
                        </span>

                        <span
                          className={
                            product.featured
                              ? "featured-badge"
                              : "not-featured-badge"
                          }
                        >
                          {product.featured
                            ? "Featured"
                            : "Not Featured"}
                        </span>

                      </div>

                      <h3>{product.title}</h3>

                      <p>
                        {product.description}
                      </p>

                      <small>
                        Starting from ₹
                        {product.startingPrice}
                      </small>

                    </div>


                    <div className="product-admin-actions">

                      <button
                        className={
                          product.featured
                            ? "unfeature-button"
                            : "feature-button"
                        }
                        onClick={() =>
                          toggleFeatured(
                            product._id,
                            product.featured
                          )
                        }
                      >
                        {product.featured
                          ? "Remove Featured"
                          : "Make Featured"}
                      </button>


                      <button
                        className="delete-button"
                        onClick={() =>
                          deleteProduct(product._id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            </section>
          )}


          {/* FAQ */}

          {activeSection === "faqs" && (
            <section className="admin-section">

              <div className="admin-section-heading">

                <div>
                  <h2>FAQs</h2>

                  <p>
                    Manage frequently asked questions.
                  </p>
                </div>

              </div>


              <form
                className="admin-form"
                onSubmit={addFaq}
              >

                <label>Question</label>

                <input
                  type="text"
                  name="question"
                  value={faqForm.question}
                  onChange={handleFaqChange}
                  placeholder="What is health insurance?"
                  required
                />


                <label>Answer</label>

                <textarea
                  name="answer"
                  value={faqForm.answer}
                  onChange={handleFaqChange}
                  placeholder="Write the answer..."
                  required
                />


                <button
                  type="submit"
                  className="primary-button"
                >
                  + Add FAQ
                </button>

              </form>


              <div className="admin-list">

                {faqs.map((faq) => (

                  <div
                    className="admin-list-card"
                    key={faq._id}
                  >

                    <div>

                      <h3>{faq.question}</h3>

                      <p>{faq.answer}</p>

                    </div>

                    <button
                      className="delete-button"
                      onClick={() =>
                        deleteFaq(faq._id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                ))}

              </div>

            </section>
          )}


          {/* PARTNERS */}

          {activeSection === "partners" && (
            <section className="admin-section">

              <div className="admin-section-heading">

                <div>
                  <h2>Insurance Partners</h2>

                  <p>
                    Add and manage partner companies.
                  </p>
                </div>

              </div>


              <form
                className="admin-form"
                onSubmit={addPartner}
              >

                <label>Company Name</label>

                <input
                  type="text"
                  name="companyName"
                  value={partnerForm.companyName}
                  onChange={handlePartnerChange}
                  placeholder="ABC Insurance"
                  required
                />


                <label>Logo URL</label>

                <input
                  type="text"
                  name="logo"
                  value={partnerForm.logo}
                  onChange={handlePartnerChange}
                  placeholder="https://..."
                />


                <label>Description</label>

                <textarea
                  name="description"
                  value={partnerForm.description}
                  onChange={handlePartnerChange}
                  placeholder="Company description"
                />


                <button
                  type="submit"
                  className="primary-button"
                >
                  + Add Partner
                </button>

              </form>


              <div className="admin-list">

                {partners.map((partner) => (

                  <div
                    className="admin-list-card"
                    key={partner._id}
                  >

                    <div className="partner-info">

                      {partner.logo ? (

                        <img
                          src={partner.logo}
                          alt={partner.companyName}
                        />

                      ) : (

                        <div className="partner-placeholder">

                          {partner.companyName
                            .charAt(0)
                            .toUpperCase()}

                        </div>

                      )}

                      <div>

                        <h3>
                          {partner.companyName}
                        </h3>

                        <p>
                          {partner.description}
                        </p>

                      </div>

                    </div>


                    <button
                      className="delete-button"
                      onClick={() =>
                        deletePartner(partner._id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                ))}

              </div>

            </section>
          )}


          {/* CLAIMS */}

          {activeSection === "claims" && (
            <section className="admin-section">

              <div className="admin-section-heading">

                <div>
                  <h2>Claims</h2>

                  <p>
                    Review and update customer claims.
                  </p>
                </div>

                <button
                  className="refresh-button"
                  onClick={loadClaims}
                >
                  ↻ Refresh
                </button>

              </div>


              <div className="admin-table-wrapper">

                <table className="admin-table">

                  <thead>

                    <tr>
                      <th>User</th>
                      <th>Policy</th>
                      <th>Claim Type</th>
                      <th>Description</th>
                      <th>Status</th>
                    </tr>

                  </thead>

                  <tbody>

                    {claims.map((claim) => (

                      <tr key={claim._id}>

                        <td>

                          {claim.user?.name}

                          <small className="table-subtext">
                            {claim.user?.email}
                          </small>

                        </td>

                        <td>
                          {claim.policyNumber}
                        </td>

                        <td>
                          {claim.claimType}
                        </td>

                        <td>
                          {claim.description}
                        </td>

                        <td>

                          <select
                            value={claim.status}
                            onChange={(e) =>
                              updateClaimStatus(
                                claim._id,
                                e.target.value
                              )
                            }
                            className="status-select"
                          >

                            <option value="pending">
                              Pending
                            </option>

                            <option value="under_review">
                              Under Review
                            </option>

                            <option value="approved">
                              Approved
                            </option>

                            <option value="rejected">
                              Rejected
                            </option>

                          </select>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

                {claims.length === 0 && (
                  <p className="empty-message">
                    No claims found.
                  </p>
                )}

              </div>

            </section>
          )}


          {/* ENQUIRIES */}

          {activeSection === "enquiries" && (
            <section className="admin-section">

              <div className="admin-section-heading">

                <div>
                  <h2>Support Enquiries</h2>

                  <p>
                    Manage customer support requests.
                  </p>
                </div>

                <button
                  className="refresh-button"
                  onClick={loadEnquiries}
                >
                  ↻ Refresh
                </button>

              </div>


              <div className="admin-table-wrapper">

                <table className="admin-table">

                  <thead>

                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Status</th>
                    </tr>

                  </thead>

                  <tbody>

                    {enquiries.map((enquiry) => (

                      <tr key={enquiry._id}>

                        <td>
                          {enquiry.name}
                        </td>

                        <td>
                          {enquiry.email}
                        </td>

                        <td>
                          {enquiry.subject}
                        </td>

                        <td>
                          {enquiry.message}
                        </td>

                        <td>

                          <select
                            value={enquiry.status}
                            onChange={(e) =>
                              updateEnquiryStatus(
                                enquiry._id,
                                e.target.value
                              )
                            }
                            className="status-select"
                          >

                            <option value="new">
                              New
                            </option>

                            <option value="in_progress">
                              In Progress
                            </option>

                            <option value="resolved">
                              Resolved
                            </option>

                          </select>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

                {enquiries.length === 0 && (
                  <p className="empty-message">
                    No enquiries found.
                  </p>
                )}

              </div>

            </section>
          )}

        </main>

      </div>
    </>
  );
}

export default AdminDashboard;

