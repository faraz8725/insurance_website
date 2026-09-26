import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ResourcesPage.jsx
import "../styles/ResourcesPage.css";

function ResourcesPage() {
  return (
    <>
      <Navbar />

      <main className="inner-page">

        <div className="page-header">
          <span>RESOURCES</span>

          <h1>
            Learn about
            <strong> insurance.</strong>
          </h1>

          <p>
            Helpful guides and information to help you
            understand insurance more clearly.
          </p>
        </div>

        <div className="resource-grid">

          <article>
            <span>GUIDE</span>
            <h3>Insurance Basics</h3>
            <p>
              Understand the basic concepts of insurance
              and how coverage works.
            </p>
            <a href="#guide">Read Guide →</a>
          </article>

          <article>
            <span>BLOG</span>
            <h3>Making Sense of Coverage</h3>
            <p>
              Simple explanations for common insurance
              questions.
            </p>
            <a href="#blog">Read Article →</a>
          </article>

          <article>
            <span>CLAIMS</span>
            <h3>Claims Guide</h3>
            <p>
              Learn about the general process of making
              an insurance claim.
            </p>
            <a href="#claims">View Guide →</a>
          </article>

        </div>

      </main>

      <Footer />
    </>
  );
}

export default ResourcesPage;