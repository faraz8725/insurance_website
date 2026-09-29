/*import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// SupportPage.jsx
import "../styles/SupportPage.css";

function SupportPage() {
  return (
    <>
      <Navbar />

      <main className="inner-page">

        <div className="page-header">
          <span>SUPPORT</span>

          <h1>
            How can we
            <strong> help?</strong>
          </h1>

          <p>
            Find assistance with your policy, claims or
            general insurance questions.
          </p>
        </div>

        <div className="support-grid">

          <div>
            <span>01</span>
            <h3>Help Center</h3>
            <p>
              Find answers to common questions about
              insurance and policies.
            </p>
            <button>Visit Help Center →</button>
          </div>

          <div>
            <span>02</span>
            <h3>Claims Support</h3>
            <p>
              Get guidance about the claims process and
              required documentation.
            </p>
            <button>Get Support →</button>
          </div>

          <div>
            <span>03</span>
            <h3>Contact Us</h3>
            <p>
              Need more help? Our support team is here
              to assist you.
            </p>
            <button>Contact Support →</button>
          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}

export default SupportPage; */


import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API_BASE_URL from "../config/api";

import "../styles/SupportPage.css";

function SupportPage() {
  const [activeForm, setActiveForm] = useState(null);

  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [claimForm, setClaimForm] = useState({
    policyNumber: "",
    claimType: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleEnquiryChange = (e) => {
    setEnquiryForm({
      ...enquiryForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleClaimChange = (e) => {
    setClaimForm({
      ...claimForm,
      [e.target.name]: e.target.value,
    });
  };

  const submitEnquiry = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enquiryForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit enquiry");
      }

      setMessage("Your enquiry has been submitted successfully.");

      setEnquiryForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setMessage(error.message);
    }
  };

  const submitClaim = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("hf_token");

    if (!token) {
      setMessage("Please login before submitting a claim.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/claims`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(claimForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit claim");
      }

      setMessage("Your claim has been submitted successfully.");

      setClaimForm({
        policyNumber: "",
        claimType: "",
        description: "",
      });
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <>
      <Navbar />

      <main className="inner-page">
        <div className="page-header">
          <span>SUPPORT</span>

          <h1>
            How can we
            <strong> help?</strong>
          </h1>

          <p>
            Find assistance with your policy, claims or
            general insurance questions.
          </p>
        </div>

        <div className="support-grid">

          <div className="support-card">
            <span>01</span>

            <h3>Help Center</h3>

            <p>
              Find answers to common questions about
              insurance and policies.
            </p>

            <button onClick={() => setActiveForm("help")}>
              Visit Help Center →
            </button>
          </div>

          <div className="support-card">
            <span>02</span>

            <h3>Claims Support</h3>

            <p>
              Submit your insurance claim and provide the
              required information.
            </p>

            <button onClick={() => setActiveForm("claim")}>
              File a Claim →
            </button>
          </div>

          <div className="support-card">
            <span>03</span>

            <h3>Contact Us</h3>

            <p>
              Have a question or need assistance? Send an
              enquiry to our support team.
            </p>

            <button onClick={() => setActiveForm("enquiry")}>
              Contact Support →
            </button>
          </div>

        </div>

        {message && (
          <div className="support-message">
            {message}
          </div>
        )}

        {activeForm === "help" && (
          <section className="support-form-section">
            <h2>Help Center</h2>

            <p>
              For common insurance questions, please check
              our FAQ section.
            </p>

            <button
              onClick={() => setActiveForm(null)}
              className="close-form"
            >
              Close
            </button>
          </section>
        )}

        {activeForm === "enquiry" && (
          <section className="support-form-section">
            <h2>Ask a Question</h2>

            <p>
              Send your question to our support team.
            </p>

            <form onSubmit={submitEnquiry} className="support-form">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={enquiryForm.name}
                onChange={handleEnquiryChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={enquiryForm.email}
                onChange={handleEnquiryChange}
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={enquiryForm.phone}
                onChange={handleEnquiryChange}
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={enquiryForm.subject}
                onChange={handleEnquiryChange}
                required
              />

              <textarea
                name="message"
                placeholder="Write your question..."
                value={enquiryForm.message}
                onChange={handleEnquiryChange}
                rows="6"
                required
              />

              <button type="submit">
                Submit Enquiry →
              </button>

              <button
                type="button"
                onClick={() => setActiveForm(null)}
                className="close-form"
              >
                Close
              </button>
            </form>
          </section>
        )}

        {activeForm === "claim" && (
          <section className="support-form-section">
            <h2>File a Claim</h2>

            <p>
              Enter your policy details and describe your claim.
            </p>

            <form onSubmit={submitClaim} className="support-form">
              <input
                type="text"
                name="policyNumber"
                placeholder="Policy Number"
                value={claimForm.policyNumber}
                onChange={handleClaimChange}
                required
              />

              <input
                type="text"
                name="claimType"
                placeholder="Claim Type"
                value={claimForm.claimType}
                onChange={handleClaimChange}
                required
              />

              <textarea
                name="description"
                placeholder="Describe your claim..."
                value={claimForm.description}
                onChange={handleClaimChange}
                rows="7"
                required
              />

              <button type="submit">
                Submit Claim →
              </button>

              <button
                type="button"
                onClick={() => setActiveForm(null)}
                className="close-form"
              >
                Close
              </button>
            </form>
          </section>
        )}

      </main>

      <Footer />
    </>
  );
}

export default SupportPage;
