/*import { useState } from "react";
import "../styles/FAQ.css";

function FAQ() {
  const [active, setActive] = useState(null);

  const faqs = [
    {
      question: "What types of insurance do you offer?",
      answer:
        "We offer a range of insurance products including health, life, car, home, travel and business insurance."
    },
    {
      question: "How do I choose the right coverage?",
      answer:
        "The right coverage depends on your personal needs, financial situation and the risks you want to protect against."
    },
    {
      question: "Can I manage my policy online?",
      answer:
        "Yes. Our platform is designed to make it easy to view and manage your insurance information online."
    },
    {
      question: "How do I make a claim?",
      answer:
        "You can contact our support team to begin the claims process and receive guidance on the required documents."
    },
    {
      question: "Can I change my coverage later?",
      answer:
        "Depending on your policy, you may be able to update your coverage. Contact support to understand your available options."
    }
  ];

  const toggleFAQ = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">

        <div className="faq-heading">
          <span className="section-tag">FAQ</span>

          <h2>
            Questions?
            <span> We've got answers.</span>
          </h2>

          <p>
            Find quick answers to some of the most common
            questions about insurance and our services.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              className={`faq-item ${
                active === index ? "active" : ""
              }`}
              key={index}
            >
              <button onClick={() => toggleFAQ(index)}>
                <span>{faq.question}</span>

                <span className="faq-icon">
                  {active === index ? "−" : "+"}
                </span>
              </button>

              {active === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default FAQ;  */





import { useEffect, useState } from "react";

import API_BASE_URL from "../config/api";
import "../styles/FAQ.css";

function FAQ() {
  const [active, setActive] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleFAQ = (index) => {
    setActive(active === index ? null : index);
  };

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/faqs`
        );

        const data = await response.json();

        if (response.ok) {
          setFaqs(data);
        }
      } catch (error) {
        console.error("Failed to load FAQs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  return (
    <section className="faq-section">
      <div className="faq-container">

        <div className="faq-heading">
          <span className="section-tag">
            FAQ
          </span>

          <h2>
            Questions?
            <span> We've got answers.</span>
          </h2>

          <p>
            Find quick answers to some of the most common
            questions about insurance and our services.
          </p>
        </div>

        <div className="faq-list">

          {loading ? (
            <p>Loading FAQs...</p>
          ) : faqs.length === 0 ? (
            <p>No FAQs available.</p>
          ) : (
            faqs.map((faq, index) => (
              <div
                className={`faq-item ${
                  active === index ? "active" : ""
                }`}
                key={faq._id}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>

                  <span className="faq-icon">
                    {active === index ? "−" : "+"}
                  </span>
                </button>

                {active === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          )}

        </div>

      </div>
    </section>
  );
}

export default FAQ;

