
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
