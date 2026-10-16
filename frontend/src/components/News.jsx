
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config/api";
import "../styles/News.css";

function timeAgo(dateValue) {
  if (!dateValue) return "Recently";

  const seconds = Math.max(
    0,
    Math.floor((Date.now() - new Date(dateValue).getTime()) / 1000)
  );

  if (seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;

  return new Date(dateValue).toLocaleDateString();
}

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
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

    fetchNews();
  }, []);

  return (
    <section className="home-news-section">
      <div className="home-news-container">
        <div className="home-news-heading">
          <div>
            <span className="home-news-eyebrow">LATEST UPDATES</span>
            <h2>News & Insights</h2>
            <p>Stay informed with the latest updates from InsureX.</p>
          </div>

          <Link to="/news" className="home-news-view-all">
            View All News →
          </Link>
        </div>

        {loading ? (
          <p className="home-news-message">Loading latest news...</p>
        ) : error ? (
          <p className="home-news-message">{error}</p>
        ) : news.length === 0 ? (
          <p className="home-news-message">
            No news published yet. Please check back soon.
          </p>
        ) : (
          <div className="home-news-grid">
            {news.slice(0, 3).map((item) => (
              <article className="home-news-card" key={item._id}>
                {item.image ? (
                  <img
                    className="home-news-image"
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                ) : (
                  <div className="home-news-image home-news-image-placeholder">
                    InsureX News
                  </div>
                )}

                <div className="home-news-card-body">
                  <span className="home-news-time">
                    {timeAgo(item.createdAt)}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>

                  <Link
                    to={`/news/${item._id}`}
                    className="home-news-read-more"
                  >
                    Read More <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default News;
