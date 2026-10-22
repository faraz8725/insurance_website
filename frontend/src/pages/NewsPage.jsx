
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API_BASE_URL from "../config/api";
import "../styles/NewsPage.css";

function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/news`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load news.");
        }

        setNews(Array.isArray(data) ? data : data.news || []);
      } catch (err) {
        setError(err.message || "Unable to load news.");
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  return (
    <>
      <Navbar />

      <main className="news-page">
        <header className="news-page-header">
          <span>POLICY UPDATES</span>
          <h1>News & Insights</h1>
          <p>Explore the latest announcements, updates and insurance insights.</p>
        </header>

        <section className="news-page-content">
          {loading ? (
            <p className="news-page-message">Loading news...</p>
          ) : error ? (
            <p className="news-page-message">{error}</p>
          ) : news.length === 0 ? (
            <p className="news-page-message">No news articles have been published yet.</p>
          ) : (
            <div className="news-page-grid">
              {news.map((item) => (
                <article className="news-page-card" key={item._id}>
                  {item.image ? (
                    <img src={item.image} alt={item.title} loading="lazy" />
                  ) : (
                    <div className="news-page-placeholder">Policy News</div>
                  )}

                  <div className="news-page-card-content">
                    <small>
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleString()
                        : "Recently published"}
                    </small>
                    <h2>{item.title}</h2>
                    <p>{item.summary}</p>
                    <Link to={`/news/${item._id}`}>Read Full Article →</Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default NewsPage;
