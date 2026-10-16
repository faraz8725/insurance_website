
import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";
import "../styles/AdminNews.css";

const emptyForm = {
  title: "",
  image: "",
  summary: "",
  content: "",
};

function timeAgo(dateValue) {
  if (!dateValue) return "Recently";

  const seconds = Math.floor(
    (Date.now() - new Date(dateValue).getTime()) / 1000
  );

  if (Number.isNaN(seconds) || seconds < 0) return "Recently";
  if (seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;

  const years = Math.floor(days / 365);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

function AdminNews() {
  const [news, setNews] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const getHeaders = () => {
    const token = localStorage.getItem("hf_token");

    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  const loadNews = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/admin/news`, {
        headers: getHeaders(),
      });

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

  useEffect(() => {
    loadNews();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const isEditing = Boolean(editingId);
      const endpoint = isEditing
        ? `${API_BASE_URL}/admin/news/${editingId}`
        : `${API_BASE_URL}/admin/news`;

      const response = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: getHeaders(),
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to save news.");
      }

      setMessage(isEditing ? "News updated successfully." : "News published successfully.");
      setForm(emptyForm);
      setEditingId(null);
      await loadNews();
    } catch (err) {
      setError(err.message || "Unable to save news.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title || "",
      image: item.image || "",
      summary: item.summary || "",
      content: item.content || "",
    });
    setMessage("");
    setError("");

    document.querySelector(".admin-news-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this news article?"
    );

    if (!confirmed) return;

    setMessage("");
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/admin/news/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete news.");
      }

      if (editingId === id) resetForm();

      setMessage("News deleted successfully.");
      await loadNews();
    } catch (err) {
      setError(err.message || "Unable to delete news.");
    }
  };

  return (
    <section className="admin-news-section">
      <div className="admin-news-heading">
        <div>
          <span className="admin-news-eyebrow">CONTENT MANAGEMENT</span>
          <h2>News Management</h2>
          <p>Create and manage news articles displayed on InsureX.</p>
        </div>

        <button
          type="button"
          className="admin-news-refresh"
          onClick={loadNews}
          disabled={loading}
        >
          ↻ Refresh
        </button>
      </div>

      <form className="admin-news-form" onSubmit={handleSubmit}>
        <h3>{editingId ? "Edit News Article" : "Publish New Article"}</h3>

        <label htmlFor="news-title">News title</label>
        <input
          id="news-title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter a clear news headline"
          required
          maxLength={180}
        />

        <label htmlFor="news-image">Image URL (optional)</label>
        <input
          id="news-image"
          name="image"
          type="url"
          value={form.image}
          onChange={handleChange}
          placeholder="https://example.com/news-image.jpg"
        />

        {form.image && (
          <div className="admin-news-image-preview">
            <img
              src={form.image}
              alt="News preview"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}

        <label htmlFor="news-summary">Short summary</label>
        <textarea
          id="news-summary"
          name="summary"
          value={form.summary}
          onChange={handleChange}
          placeholder="A short description for the news card"
          rows={3}
          required
          maxLength={500}
        />

        <label htmlFor="news-content">Full article</label>
        <textarea
          id="news-content"
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Write the complete news article here..."
          rows={9}
          required
        />

        {message && <p className="admin-news-success">{message}</p>}
        {error && <p className="admin-news-error">{error}</p>}

        <div className="admin-news-form-actions">
          <button type="submit" disabled={saving}>
            {saving
              ? "Saving..."
              : editingId
                ? "Save Changes"
                : "Publish News"}
          </button>

          {editingId && (
            <button
              type="button"
              className="admin-news-cancel"
              onClick={resetForm}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="admin-news-list-heading">
        <h3>Published & Draft Articles</h3>
        <span>{news.length} article{news.length === 1 ? "" : "s"}</span>
      </div>

      {loading ? (
        <p className="admin-news-empty">Loading news...</p>
      ) : news.length === 0 ? (
        <p className="admin-news-empty">No news articles yet. Publish your first article above.</p>
      ) : (
        <div className="admin-news-list">
          {news.map((item) => (
            <article className="admin-news-item" key={item._id}>
              {item.image ? (
                <img
                  className="admin-news-item-image"
                  src={item.image}
                  alt={item.title}
                />
              ) : (
                <div className="admin-news-item-placeholder">NEWS</div>
              )}

              <div className="admin-news-item-info">
                <h4>{item.title}</h4>
                <p>{item.summary}</p>
                <small>
                  Added {timeAgo(item.createdAt)}
                  {item.updatedAt &&
                    item.createdAt !== item.updatedAt &&
                    ` · Updated ${timeAgo(item.updatedAt)}`}
                </small>
                <span className={`admin-news-status ${item.active === false ? "inactive" : ""}`}>
                  {item.active === false ? "Hidden" : "Public"}
                </span>
              </div>

              <div className="admin-news-item-actions">
                <button type="button" onClick={() => handleEdit(item)}>
                  Edit
                </button>
                <button
                  type="button"
                  className="admin-news-delete"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default AdminNews;
