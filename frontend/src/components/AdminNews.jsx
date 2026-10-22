/*
import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";
import "../styles/AdminNews.css";

const emptyForm = {
  title: "",
  image: "",
  imageKitFileId: "",
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
  const [selectedImage, setSelectedImage] = useState(null);
const [uploadingImage, setUploadingImage] = useState(false);
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



const handleImageUpload = async (event) => {
  const file = event.target.files?.[0];

  if (!file) return;

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  if (!allowedTypes.includes(file.type)) {
    alert("Only JPG, PNG, WEBP and GIF images are allowed.");
    event.target.value = "";
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("Image size must be 5 MB or less.");
    event.target.value = "";
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    setUploadingImage(true);
    setSelectedImage(file);

    const response = await fetch(
      `${API_BASE_URL}/admin/news/upload-image`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("hf_token")}`,
        },
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Image upload failed.");
    }

    setForm((previousForm) => ({
      ...previousForm,
      image: data.image,
      imageKitFileId: data.imageKitFileId || "",
    }));

    alert("Image uploaded successfully to ImageKit!");
  } catch (error) {
    console.error("Image upload error:", error);
    alert(error.message || "Unable to upload image.");

    setSelectedImage(null);
    event.target.value = "";
  } finally {
    setUploadingImage(false);
  }
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
          <p>Create and manage news articles displayed on PolicyNews.</p>
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

        <div className="admin-news-upload">
  <label htmlFor="news-image">
    Upload News Image
  </label>

  <input
    id="news-image"
    type="file"
    accept="image/jpeg,image/png,image/webp,image/gif"
    onChange={handleImageUpload}
    disabled={uploadingImage}
  />

  <small>
    JPG, PNG, WEBP or GIF. Maximum size: 5 MB.
  </small>

  {uploadingImage && (
    <p>Uploading image to ImageKit...</p>
  )}

  {form.image && (
    <div className="admin-news-image-preview">
      <img
        src={form.image}
        alt="News preview"
      />

      <p>
        {selectedImage
          ? selectedImage.name
          : "Uploaded image"}
      </p>
    </div>
  )}
</div>

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
*/




import { useCallback, useEffect, useState } from "react";
import API_BASE_URL from "../config/api";
import "../styles/AdminNews.css";

const emptyForm = {
  title: "",
  image: "",
  imageKitFileId: "",
  summary: "",
  content: "",
  active: true,
};

function AdminNews() {
  const [form, setForm] = useState({ ...emptyForm });
  const [newsList, setNewsList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const getHeaders = () => {
    const token = localStorage.getItem("hf_token");

    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  const getErrorMessage = async (response) => {
    try {
      const data = await response.json();
      return data.message || "Something went wrong.";
    } catch {
      return "Something went wrong. Please try again.";
    }
  };

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/admin/news`, {
        method: "GET",
        headers: getHeaders(),
      });
/*
      if (!response.ok) {
        throw new Error(await getErrorMessage(response));
      } */
     
if (!response.ok) {
  const responseText = await response.text();

  console.error("Upload API error:", {
    status: response.status,
    url: response.url,
    response: responseText,
  });

  throw new Error(
    `Upload failed (${response.status}): ${
      responseText || response.statusText
    }`
  );
}


      const data = await response.json();
      setNewsList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch news error:", error);
      setErrorMessage(error.message || "Unable to load news.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* Upload the selected file to ImageKit through the backend. */
  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!allowedTypes.includes(file.type)) {
      setErrorMessage("Only JPG, PNG, WEBP and GIF images are allowed.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Image size must be 5 MB or less.");
      event.target.value = "";
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");
    setUploadingImage(true);
    setSelectedImage(file);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const token = localStorage.getItem("hf_token");

      const response = await fetch(
        `${API_BASE_URL}/admin/news/upload-image`,
        {
          method: "POST",
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(await getErrorMessage(response));
      }

      const data = await response.json();

      if (!data.image) {
        throw new Error("ImageKit did not return an image URL.");
      }

      setForm((previousForm) => ({
        ...previousForm,
        image: data.image,
        imageKitFileId: data.imageKitFileId || "",
      }));

      setSuccessMessage("Image uploaded successfully to ImageKit.");
    } catch (error) {
      console.error("ImageKit upload error:", error);
      setErrorMessage(error.message || "Image upload failed.");
      setSelectedImage(null);
      event.target.value = "";
    } finally {
      setUploadingImage(false);
    }
  };

  const resetForm = () => {
    setForm({ ...emptyForm });
    setEditingId(null);
    setSelectedImage(null);
    setErrorMessage("");
    setSuccessMessage("");

    const fileInput = document.getElementById("news-image");
    if (fileInput) fileInput.value = "";
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title || "",
      image: item.image || "",
      imageKitFileId: item.imageKitFileId || "",
      summary: item.summary || "",
      content: item.content || "",
      active: item.active !== false,
    });

    setEditingId(item._id);
    setSelectedImage(null);
    setErrorMessage("");
    setSuccessMessage("");

    const fileInput = document.getElementById("news-image");
    if (fileInput) fileInput.value = "";

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (uploadingImage) {
      setErrorMessage("Please wait until the image upload finishes.");
      return;
    }

    if (!form.title.trim() || !form.summary.trim() || !form.content.trim()) {
      setErrorMessage("Title, summary and content are required.");
      return;
    }

    setSaving(true);

    try {
      const url = editingId
        ? `${API_BASE_URL}/admin/news/${editingId}`
        : `${API_BASE_URL}/admin/news`;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          ...form,
          title: form.title.trim(),
          summary: form.summary.trim(),
          content: form.content.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(await getErrorMessage(response));
      }

      const data = await response.json();

      setSuccessMessage(
        data.message ||
          (editingId
            ? "News updated successfully."
            : "News added successfully.")
      );

      resetForm();
      await fetchNews();
    } catch (error) {
      console.error("Save news error:", error);
      setErrorMessage(error.message || "Unable to save news.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this news?"
    );

    if (!confirmed) return;

    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/admin/news/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      if (!response.ok) {
        throw new Error(await getErrorMessage(response));
      }

      setSuccessMessage("News deleted successfully.");

      if (editingId === id) {
        resetForm();
      }

      await fetchNews();
    } catch (error) {
      console.error("Delete news error:", error);
      setErrorMessage(error.message || "Unable to delete news.");
    }
  };

  const formatDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "";

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="admin-news">
      <div className="admin-news-header">
        <div>
          <h2>News Management</h2>
          <p>Add, edit and manage your website news.</p>
        </div>

        <button
          type="button"
          className="admin-news-refresh-btn"
          onClick={fetchNews}
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh News"}
        </button>
      </div>

      {errorMessage && (
        <div className="admin-news-message admin-news-error" role="alert">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="admin-news-message admin-news-success" role="status">
          {successMessage}
        </div>
      )}

      <form className="admin-news-form" onSubmit={handleSubmit}>
        <h3>{editingId ? "Edit News" : "Add New News"}</h3>

        <div className="admin-news-field">
          <label htmlFor="news-title">News Title *</label>
          <input
            id="news-title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter news title"
            required
          />
        </div>

        <div className="admin-news-field">
          <label htmlFor="news-image">Upload News Image</label>
          <input
            id="news-image"
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleImageUpload}
            disabled={uploadingImage || saving}
          />

          <small>JPG, PNG, WEBP or GIF. Maximum size: 5 MB.</small>

          {uploadingImage && (
            <p className="admin-news-upload-status">
              Uploading image to ImageKit...
            </p>
          )}

          {form.image && (
            <div className="admin-news-image-preview">
              <img src={form.image} alt="News preview" />

              <p>
                {selectedImage
                  ? selectedImage.name
                  : "Current uploaded image"}
              </p>
            </div>
          )}
        </div>

        <div className="admin-news-field">
          <label htmlFor="news-summary">Summary *</label>
          <textarea
            id="news-summary"
            name="summary"
            value={form.summary}
            onChange={handleChange}
            placeholder="Enter a short news summary"
            rows={3}
            required
          />
        </div>

        <div className="admin-news-field">
          <label htmlFor="news-content">Full Content *</label>
          <textarea
            id="news-content"
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Enter full news content"
            rows={8}
            required
          />
        </div>

        {editingId && (
          <label className="admin-news-active-toggle">
            <input
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={handleChange}
            />
            Publish this news
          </label>
        )}

        <div className="admin-news-form-actions">
          <button
            type="submit"
            className="admin-news-submit-btn"
            disabled={saving || uploadingImage}
          >
            {uploadingImage
              ? "Uploading Image..."
              : saving
                ? "Saving..."
                : editingId
                  ? "Update News"
                  : "Add News"}
          </button>

          {editingId && (
            <button
              type="button"
              className="admin-news-cancel-btn"
              onClick={resetForm}
              disabled={saving || uploadingImage}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="admin-news-list-section">
        <h3>Existing News ({newsList.length})</h3>

        {loading ? (
          <p>Loading news...</p>
        ) : newsList.length === 0 ? (
          <p>No news found. Add your first news above.</p>
        ) : (
          <div className="admin-news-list">
            {newsList.map((item) => (
              <article className="admin-news-card" key={item._id}>
                {item.image && (
                  <div className="admin-news-card-image">
                    <img src={item.image} alt={item.title || "News"} />
                  </div>
                )}

                <div className="admin-news-card-content">
                  <div className="admin-news-card-top">
                    <span
                      className={
                        item.active
                          ? "admin-news-status is-published"
                          : "admin-news-status is-draft"
                      }
                    >
                      {item.active ? "Published" : "Draft"}
                    </span>

                    <span className="admin-news-date">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>

                  <h4>{item.title}</h4>
                  <p className="admin-news-card-summary">{item.summary}</p>

                  <div className="admin-news-card-actions">
                    <button
                      type="button"
                      className="admin-news-edit-btn"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="admin-news-delete-btn"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminNews;
