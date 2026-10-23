


/*

             
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

  /* Upload the selected file to ImageKit through the backend. *
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
               Uploading image to ImageKit... </p>
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
*/


/*

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

      if (!response.ok) {
        throw new Error(await getErrorMessage(response));
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

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
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

      setForm((previous) => ({
        ...previous,
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

    if (
      !form.title.trim() ||
      !form.summary.trim() ||
      !form.content.trim()
    ) {
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
      const response = await fetch(
        `${API_BASE_URL}/admin/news/${id}`,
        {
          method: "DELETE",
          headers: getHeaders(),
        }
      );

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
        <div
          className="admin-news-message admin-news-error"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div
          className="admin-news-message admin-news-success"
          role="status"
        >
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
            <p className="admin-news-upload-status" role="status">
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
          <small>
            Paragraphs and line breaks will be preserved on the news page.
          </small>
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
        <div className="admin-news-list-heading">
          <h3>Existing News ({newsList.length})</h3>
        </div>

        {loading ? (
          <p className="admin-news-empty">Loading news...</p>
        ) : newsList.length === 0 ? (
          <p className="admin-news-empty">
            No news found. Add your first news above.
          </p>
        ) : (
          <div className="admin-news-list">
            {newsList.map((item) => (
              <article className="admin-news-card" key={item._id}>
                {item.image ? (
                  <div className="admin-news-card-image">
                    <img
                      src={item.image}
                      alt={item.title || "News"}
                    />
                  </div>
                ) : (
                  <div className="admin-news-card-placeholder">
                    NEWS
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

                  <p className="admin-news-card-summary">
                    {item.summary}
                  </p>

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
*/




import { useCallback, useEffect, useState } from "react";
import API_BASE_URL from "../config/api";
import "../styles/AdminNews.css";

const createEmptySection = () => ({
  heading: "",
  content: "",
  headingFontSize: 28,
  contentFontSize: 17,
  alignment: "left",
});

const emptyForm = {
  title: "",
  image: "",
  imageKitFileId: "",
  summary: "",
  content: "",
  sections: [createEmptySection()],
  active: true,
};

function buildLegacyContent(sections = []) {
  return sections
    .map((section) =>
      [section.heading?.trim(), section.content?.trim()]
        .filter(Boolean)
        .join("\n\n")
    )
    .filter(Boolean)
    .join("\n\n");
}

function normalizeSections(sections, legacyContent = "") {
  if (Array.isArray(sections) && sections.length > 0) {
    return sections.map((section) => ({
      heading: section.heading || "",
      content: section.content || "",
      headingFontSize: Number(section.headingFontSize) || 28,
      contentFontSize: Number(section.contentFontSize) || 17,
      alignment: section.alignment || "left",
    }));
  }

  // Existing articles ko edit karte waqt unka purana content bachaye rakho.
  if (legacyContent) {
    return [
      {
        ...createEmptySection(),
        content: legacyContent,
      },
    ];
  }

  return [createEmptySection()];
}

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

      if (!response.ok) {
        throw new Error(await getErrorMessage(response));
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

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const updateSection = (index, field, value) => {
    setForm((previous) => ({
      ...previous,
      sections: previous.sections.map((section, i) =>
        i === index ? { ...section, [field]: value } : section
      ),
    }));
  };

  const addSection = () => {
    setForm((previous) => ({
      ...previous,
      sections: [...previous.sections, createEmptySection()],
    }));
  };

  const removeSection = (index) => {
    setForm((previous) => ({
      ...previous,
      sections:
        previous.sections.length === 1
          ? [createEmptySection()]
          : previous.sections.filter((_, i) => i !== index),
    }));
  };

  const moveSection = (index, direction) => {
    setForm((previous) => {
      const sections = [...previous.sections];
      const target = index + direction;

      if (target < 0 || target >= sections.length) {
        return previous;
      }

      [sections[index], sections[target]] = [
        sections[target],
        sections[index],
      ];

      return { ...previous, sections };
    });
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

      setForm((previous) => ({
        ...previous,
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
    setForm({
      ...emptyForm,
      sections: [createEmptySection()],
    });
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
      sections: normalizeSections(item.sections, item.content || ""),
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

    if (!form.title.trim() || !form.summary.trim()) {
      setErrorMessage("Title and summary are required.");
      return;
    }

    const hasContent = form.sections.some(
      (section) => section.content.trim()
    );

    if (!hasContent) {
      setErrorMessage("Please add content to at least one section.");
      return;
    }

    for (const section of form.sections) {
      if (
        section.headingFontSize < 12 ||
        section.headingFontSize > 60 ||
        section.contentFontSize < 12 ||
        section.contentFontSize > 32
      ) {
        setErrorMessage("Please check the font sizes in your sections.");
        return;
      }
    }

    const sections = form.sections.map((section) => ({
      heading: section.heading.trim(),
      content: section.content.trim(),
      headingFontSize: Number(section.headingFontSize),
      contentFontSize: Number(section.contentFontSize),
      alignment: section.alignment,
    }));

    // Keep the legacy content field populated for schema compatibility.
    const content = buildLegacyContent(sections);

    setSaving(true);

    try {
      const url = editingId
        ? `${API_BASE_URL}/admin/news/${editingId}`
        : `${API_BASE_URL}/admin/news`;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          title: form.title.trim(),
          image: form.image,
          imageKitFileId: form.imageKitFileId,
          summary: form.summary.trim(),
          content,
          sections,
          active: form.active,
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
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleImageUpload}
            disabled={uploadingImage || saving}
          />
          <small>JPG, PNG, WEBP or GIF. Maximum size: 5 MB.</small>

          {uploadingImage && (
            <p className="admin-news-upload-status" role="status">
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

        <div className="admin-news-sections">
          <div className="admin-news-sections-header">
            <div>
              <h3>Article Sections</h3>
              <p>Add as many headings and content blocks as needed.</p>
            </div>

            <button
              type="button"
              className="admin-news-add-section-btn"
              onClick={addSection}
              disabled={saving}
            >
              + Add Section
            </button>
          </div>

          {form.sections.map((section, index) => (
            <div className="admin-news-section-editor" key={index}>
              <div className="admin-news-section-top">
                <h4>Section {index + 1}</h4>

                <div className="admin-news-section-actions">
                  <button
                    type="button"
                    onClick={() => moveSection(index, -1)}
                    disabled={index === 0 || saving}
                    aria-label={`Move section ${index + 1} up`}
                  >
                    ↑
                  </button>

                  <button
                    type="button"
                    onClick={() => moveSection(index, 1)}
                    disabled={index === form.sections.length - 1 || saving}
                    aria-label={`Move section ${index + 1} down`}
                  >
                    ↓
                  </button>

                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    disabled={saving}
                    className="admin-news-remove-section-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="admin-news-field">
                <label htmlFor={`section-heading-${index}`}>
                  Section Heading
                </label>
                <input
                  id={`section-heading-${index}`}
                  value={section.heading}
                  onChange={(event) =>
                    updateSection(index, "heading", event.target.value)
                  }
                  placeholder="e.g. Conclusion"
                />
              </div>

              <div className="admin-news-field">
                <label htmlFor={`section-content-${index}`}>
                  Paragraph / Content *
                </label>
                <textarea
                  id={`section-content-${index}`}
                  value={section.content}
                  onChange={(event) =>
                    updateSection(index, "content", event.target.value)
                  }
                  placeholder="Write this section's content..."
                  rows={6}
                />
              </div>

              <div className="admin-news-style-controls">
                <div className="admin-news-field">
                  <label htmlFor={`heading-size-${index}`}>
                    Heading Size: {section.headingFontSize}px
                  </label>
                  <input
                    id={`heading-size-${index}`}
                    type="range"
                    min="12"
                    max="60"
                    value={section.headingFontSize}
                    onChange={(event) =>
                      updateSection(
                        index,
                        "headingFontSize",
                        Number(event.target.value)
                      )
                    }
                  />
                </div>

                <div className="admin-news-field">
                  <label htmlFor={`content-size-${index}`}>
                    Content Size: {section.contentFontSize}px
                  </label>
                  <input
                    id={`content-size-${index}`}
                    type="range"
                    min="12"
                    max="32"
                    value={section.contentFontSize}
                    onChange={(event) =>
                      updateSection(
                        index,
                        "contentFontSize",
                        Number(event.target.value)
                      )
                    }
                  />
                </div>

                <div className="admin-news-field">
                  <label htmlFor={`alignment-${index}`}>
                    Text Alignment
                  </label>
                  <select
                    id={`alignment-${index}`}
                    value={section.alignment}
                    onChange={(event) =>
                      updateSection(index, "alignment", event.target.value)
                    }
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                    <option value="justify">Justify</option>
                  </select>
                </div>
              </div>

              <div className="admin-news-section-preview">
                <p className="admin-news-preview-label">Preview</p>

                {section.heading && (
                  <h3
                    style={{
                      fontSize: `${section.headingFontSize}px`,
                      textAlign: section.alignment,
                    }}
                  >
                    {section.heading}
                  </h3>
                )}

                <p
                  style={{
                    fontSize: `${section.contentFontSize}px`,
                    textAlign: section.alignment,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {section.content || "Your paragraph preview will appear here."}
                </p>
              </div>
            </div>
          ))}
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
                {item.image ? (
                  <div className="admin-news-card-image">
                    <img src={item.image} alt={item.title || "News"} />
                  </div>
                ) : (
                  <div className="admin-news-card-placeholder">NEWS</div>
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

                  <small>
                    {item.sections?.length || 0} article section(s)
                  </small>

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
