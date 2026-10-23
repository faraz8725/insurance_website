/*
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API_BASE_URL from "../config/api";
import "../styles/NewsDetailPage.css";

function NewsDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true);
      setError("");
      setArticle(null);

      try {
        const response = await fetch(`${API_BASE_URL}/news/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to find this article.");
        }

        setArticle(data.article || data);
      } catch (err) {
        setError(err.message || "Unable to load this article.");
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  return (
    <>
      <Navbar />

      <main className="news-detail-page">
        <div className="news-detail-container">
          <Link to="/news" className="news-detail-back">
            ← Back to News
          </Link>

          {loading ? (
            <p className="news-detail-message">Loading article...</p>
          ) : error || !article ? (
            <div className="news-detail-message">
              <h2>Article not available</h2>
              <p>{error || "This news article could not be found."}</p>
              <Link to="/news">Browse all news</Link>
            </div>
          ) : (
            <article className="news-detail-article">
              <span className="news-detail-label">POLICY NEWS</span>

              <h1>{article.title}</h1>

              <p className="news-detail-date">
                Published{" "}
                {article.createdAt
                  ? new Date(article.createdAt).toLocaleString()
                  : "recently"}
              </p>

              {article.image && (
                <img
                  className="news-detail-image"
                  src={article.image}
                  alt={article.title}
                />
              )}

              <p className="news-detail-summary">{article.summary}</p>

              <div className="news-detail-content">
                {article.content}
              </div>

              <Link to="/news" className="news-detail-bottom-link">
                ← Explore More News
              </Link>
            </article>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default NewsDetailPage;
*/

/*
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API_BASE_URL from "../config/api";
import "../styles/NewsDetailPage.css";

function NewsDetailPage() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadArticle = async () => {
      setLoading(true);
      setError("");
      setArticle(null);

      try {
        const response = await fetch(
          `${API_BASE_URL}/news/${id}`,
          { signal: controller.signal }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to find this article."
          );
        }

        setArticle(data.article || data);
      } catch (err) {
        if (err.name === "AbortError") return;

        setError(
          err.message || "Unable to load this article."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadArticle();

    return () => controller.abort();
  }, [id]);

  return (
    <>
      <Navbar />

      <main className="news-detail-page">
        <div className="news-detail-container">
          <Link to="/news" className="news-detail-back">
            ← Back to News
          </Link>

          {loading ? (
            <p
              className="news-detail-message"
              role="status"
            >
              Loading article...
            </p>
          ) : error || !article ? (
            <div className="news-detail-message" role="alert">
              <h2>Article not available</h2>

              <p>
                {error ||
                  "This news article could not be found."}
              </p>

              <Link to="/news">Browse all news</Link>
            </div>
          ) : (
            <article className="news-detail-article">
              <span className="news-detail-label">
                POLICY NEWS
              </span>

              <h1>{article.title}</h1>

              <p className="news-detail-date">
                Published{" "}
                {article.createdAt
                  ? new Date(
                      article.createdAt
                    ).toLocaleString("en-IN")
                  : "recently"}
              </p>

              {article.image && (
                <img
                  className="news-detail-image"
                  src={article.image}
                  alt={article.title || "News image"}
                />
              )}

              {article.summary && (
                <p className="news-detail-summary">
                  {article.summary}
                </p>
              )}

              <div className="news-detail-content">
                {article.content}
              </div>

              <Link
                to="/news"
                className="news-detail-bottom-link"
              >
                ← Explore More News
              </Link>
            </article>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default NewsDetailPage;
*/
/*


import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API_BASE_URL from "../config/api";
import "../styles/NewsDetailPage.css";

function NewsDetailPage() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadArticle = async () => {
      setLoading(true);
      setError("");
      setArticle(null);

      try {
        const response = await fetch(
          `${API_BASE_URL}/news/${id}`,
          { signal: controller.signal }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to find this article."
          );
        }

        setArticle(data.article || data);
      } catch (err) {
        if (err.name === "AbortError") return;

        setError(
          err.message || "Unable to load this article."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadArticle();

    return () => controller.abort();
  }, [id]);

  // Use the new sections when available.
  // Older articles continue to display their existing content.
  const sections = Array.isArray(article?.sections)
    ? article.sections
    : [];

  const hasSections = sections.some(
    (section) =>
      section?.heading?.trim() || section?.content?.trim()
  );

  return (
    <>
      <Navbar />

      <main className="news-detail-page">
        <div className="news-detail-container">
          <Link to="/news" className="news-detail-back">
            ← Back to News
          </Link>

          {loading ? (
            <p className="news-detail-message" role="status">
              Loading article...
            </p>
          ) : error || !article ? (
            <div className="news-detail-message" role="alert">
              <h2>Article not available</h2>
              <p>
                {error ||
                  "This news article could not be found."}
              </p>
              <Link to="/news">Browse all news</Link>
            </div>
          ) : (
            <article className="news-detail-article">
              <span className="news-detail-label">
                POLICY NEWS
              </span>

              <h1>{article.title}</h1>

              <p className="news-detail-date">
                Published{" "}
                {article.createdAt
                  ? new Date(
                      article.createdAt
                    ).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "recently"}
              </p>

              {article.image && (
                <img
                  className="news-detail-image"
                  src={article.image}
                  alt={article.title || "News image"}
                />
              )}

              {article.summary && (
                <p className="news-detail-summary">
                  {article.summary}
                </p>
              )}

              {hasSections ? (
                <div className="news-detail-sections">
                  {sections.map((section, index) => {
                    const headingSize = Math.min(
                      60,
                      Math.max(
                        12,
                        Number(section.headingFontSize) || 28
                      )
                    );

                    const contentSize = Math.min(
                      32,
                      Math.max(
                        12,
                        Number(section.contentFontSize) || 17
                      )
                    );

                    const allowedAlignments = [
                      "left",
                      "center",
                      "right",
                      "justify",
                    ];

                    const alignment =
                      allowedAlignments.includes(section.alignment)
                        ? section.alignment
                        : "left";

                    return (
                      <section
                        className="news-detail-section"
                        key={section._id || index}
                      >
                        {section.heading?.trim() && (
                          <h2
                            className="news-detail-section-heading"
                            style={{
                              fontSize: `${headingSize}px`,
                              textAlign: alignment,
                            }}
                          >
                            {section.heading}
                          </h2>
                        )}

                        {section.content?.trim() && (
                          <div
                            className="news-detail-section-content"
                            style={{
                              fontSize: `${contentSize}px`,
                              textAlign: alignment,
                            }}
                          >
                            {section.content}
                          </div>
                        )}
                      </section>
                    );
                  })}
                </div>
              ) : (
                <div className="news-detail-content">
                  {article.content || ""}
                </div>
              )}

              <Link
                to="/news"
                className="news-detail-bottom-link"
              >
                ← Explore More News
              </Link>
            </article>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default NewsDetailPage;
*/



import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API_BASE_URL from "../config/api";
import "../styles/NewsDetailPage.css";

function NewsDetailPage() {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadArticle = async () => {
      setLoading(true);
      setError("");
      setArticle(null);

      try {
        const response = await fetch(
          `${API_BASE_URL}/news/${encodeURIComponent(slug)}`,
          { signal: controller.signal }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to find this article."
          );
        }

        setArticle(data.article || data);
      } catch (err) {
        if (err.name === "AbortError") return;

        setError(
          err.message || "Unable to load this article."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    if (slug) {
      loadArticle();
    } else {
      setError("News slug is missing.");
      setLoading(false);
    }

    return () => controller.abort();
  }, [slug]);

  const sections = Array.isArray(article?.sections)
    ? article.sections
    : [];

  const hasSections = sections.some(
    (section) =>
      section?.heading?.trim() ||
      section?.content?.trim()
  );

  return (
    <>
      <Navbar />

      <main className="news-detail-page">
        <div className="news-detail-container">
          <Link to="/news" className="news-detail-back">
            ← Back to News
          </Link>

          {loading ? (
            <p className="news-detail-message" role="status">
              Loading article...
            </p>
          ) : error || !article ? (
            <div className="news-detail-message" role="alert">
              <h2>Article not available</h2>
              <p>
                {error || "This news article could not be found."}
              </p>
              <Link to="/news">Browse all news</Link>
            </div>
          ) : (
            <article className="news-detail-article">
              <span className="news-detail-label">
                POLICY NEWS
              </span>

              <h1>{article.title}</h1>

              <p className="news-detail-date">
                Published{" "}
                {article.createdAt
                  ? new Date(article.createdAt).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : "recently"}
              </p>

              {article.image && (
                <img
                  className="news-detail-image"
                  src={article.image}
                  alt={article.title || "News image"}
                />
              )}

              {article.summary && (
                <p className="news-detail-summary">
                  {article.summary}
                </p>
              )}

              {hasSections ? (
                <div className="news-detail-sections">
                  {sections.map((section, index) => {
                    const headingSize = Math.min(
                      60,
                      Math.max(
                        12,
                        Number(section.headingFontSize) || 28
                      )
                    );

                    const contentSize = Math.min(
                      32,
                      Math.max(
                        12,
                        Number(section.contentFontSize) || 17
                      )
                    );

                    const allowedAlignments = [
                      "left",
                      "center",
                      "right",
                      "justify",
                    ];

                    const alignment = allowedAlignments.includes(
                      section.alignment
                    )
                      ? section.alignment
                      : "left";

                    return (
                      <section
                        className="news-detail-section"
                        key={section._id || index}
                      >
                        {section.heading?.trim() && (
                          <h2
                            className="news-detail-section-heading"
                            style={{
                              fontSize: `${headingSize}px`,
                              textAlign: alignment,
                            }}
                          >
                            {section.heading}
                          </h2>
                        )}

                        {section.content?.trim() && (
                          <div
                            className="news-detail-section-content"
                            style={{
                              fontSize: `${contentSize}px`,
                              textAlign: alignment,
                            }}
                          >
                            {section.content}
                          </div>
                        )}
                      </section>
                    );
                  })}
                </div>
              ) : (
                <div className="news-detail-content">
                  {article.content || ""}
                </div>
              )}

              <Link
                to="/news"
                className="news-detail-bottom-link"
              >
                ← Explore More News
              </Link>
            </article>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default NewsDetailPage;
