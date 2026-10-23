/*
const express = require("express");
const mongoose = require("mongoose");
const imagekit = require("../config/imagekit");
const upload = require("../middleware/upload");
const News = require("../models/News");
const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

// ======================================
// PUBLIC: GET ALL ACTIVE NEWS
// GET /api/news
// ======================================

router.get("/news", async (req, res) => {
  try {
    const news = await News.find({
      active: true,
    }).sort({ createdAt: -1 });

    return res.status(200).json(news);
  } catch (error) {
    console.error("Fetch news error:", error);

    return res.status(500).json({
      message: "Unable to load news.",
    });
  }
});

// ======================================
// PUBLIC: GET ONE ACTIVE NEWS ARTICLE
// GET /api/news/:id
// ======================================

router.get("/news/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid news ID.",
      });
    }

    const news = await News.findOne({
      _id: id,
      active: true,
    });

    if (!news) {
      return res.status(404).json({
        message: "News article not found.",
      });
    }

    return res.status(200).json(news);
  } catch (error) {
    console.error("News detail error:", error);

    return res.status(500).json({
      message: "Unable to load news article.",
    });
  }
});

// ======================================
// ADMIN: UPLOAD IMAGE TO IMAGEKIT
// POST /api/admin/news/upload-image
// FormData field name: image
// ======================================
/*
router.post(
  "/admin/news/upload-image",
  protect,
  adminOnly,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "Please select an image to upload.",
        });
      }
     
      const safeFileName = req.file.originalname
        .replace(/[^a-zA-Z0-9._-]/g, "_")
        .slice(-100);

      const uploadedImage = await imagekit.upload({
        file: req.file.buffer.toString("base64"),
        fileName: `policynews-${Date.now()}-${safeFileName}`,
        folder: "/policynews/news",
        useUniqueFileName: true,
      });

      return res.status(201).json({
        message: "Image uploaded successfully.",
        image: uploadedImage.url,
        imageKitFileId: uploadedImage.fileId,
      });
    } catch (error) {
      console.error("ImageKit upload error:", error);

      return res.status(500).json({
        message: "Unable to upload image. Please try again.",
      });
    }
  }
);
*


router.post(
  "/admin/news/upload-image",
  protect,
  adminOnly,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "Please select an image to upload.",
        });
      }

      console.log("Image received:", {
        name: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
      });

      const safeFileName = req.file.originalname
        .replace(/[^a-zA-Z0-9._-]/g, "_")
        .slice(-100);

      // ImageKit upload - simplified for testing
      const uploadedImage = await imagekit.upload({
        file: req.file.buffer.toString("base64"),
        fileName: `policynews-${Date.now()}-${safeFileName}`,
      });

      console.log("ImageKit upload successful:", uploadedImage.url);

      return res.status(201).json({
        message: "Image uploaded successfully.",
        image: uploadedImage.url,
        imageKitFileId: uploadedImage.fileId,
      });
    } catch (error) {
      console.error("========== IMAGEKIT ERROR ==========");
      console.dir(error, { depth: 10 });
      console.error("Error message:", error?.message);
      console.error("Error response:", error?.response?.data);
      console.error("====================================");

      return res.status(500).json({
        message: "Unable to upload image. Please try again.",
      });
    }
  }
);


// ======================================
// ADMIN: GET ALL NEWS
// GET /api/admin/news
// ======================================

router.get(
  "/admin/news",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const news = await News.find({})
        .sort({ createdAt: -1 });

      return res.status(200).json(news);
    } catch (error) {
      console.error("Admin news error:", error);

      return res.status(500).json({
        message: "Unable to load admin news.",
      });
    }
  }
);

// ======================================
// ADMIN: CREATE NEWS
// POST /api/admin/news
// ======================================

router.post(
  "/admin/news",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const {
        title,
        image,
        imageKitFileId,
        summary,
        content,
        active,
      } = req.body;

      if (
        !title?.trim() ||
        !summary?.trim() ||
        !content?.trim()
      ) {
        return res.status(400).json({
          message: "Title, summary and content are required.",
        });
      }

      const news = await News.create({
        title: title.trim(),
        image: image?.trim() || "",
        imageKitFileId: imageKitFileId || "",
        summary: summary.trim(),
        content: content.trim(),
        active: active === undefined ? true : active,
      });

      return res.status(201).json({
        message: "News published successfully.",
        news,
      });
    } catch (error) {
      console.error("Create news error:", error);

      return res.status(500).json({
        message: "Unable to publish news.",
      });
    }
  }
);

// ======================================
// ADMIN: UPDATE NEWS
// PUT /api/admin/news/:id
// ======================================

router.put(
  "/admin/news/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          message: "Invalid news ID.",
        });
      }

      const {
        title,
        image,
        imageKitFileId,
        summary,
        content,
        active,
      } = req.body;

      const news = await News.findById(id);

      if (!news) {
        return res.status(404).json({
          message: "News article not found.",
        });
      }

      if (title !== undefined) {
        if (typeof title !== "string" || !title.trim()) {
          return res.status(400).json({
            message: "Title cannot be empty.",
          });
        }

        news.title = title.trim();
      }

      if (image !== undefined) {
        if (typeof image !== "string") {
          return res.status(400).json({
            message: "Invalid image URL.",
          });
        }

        news.image = image.trim();
      }

      // Preserve the existing ImageKit file ID if not supplied.
      if (imageKitFileId !== undefined) {
        news.imageKitFileId = imageKitFileId;
      }

      if (summary !== undefined) {
        if (typeof summary !== "string" || !summary.trim()) {
          return res.status(400).json({
            message: "Summary cannot be empty.",
          });
        }

        news.summary = summary.trim();
      }

      if (content !== undefined) {
        if (typeof content !== "string" || !content.trim()) {
          return res.status(400).json({
            message: "Content cannot be empty.",
          });
        }

        news.content = content.trim();
      }

      if (active !== undefined) {
        if (typeof active !== "boolean") {
          return res.status(400).json({
            message: "Active must be true or false.",
          });
        }

        news.active = active;
      }

      await news.save();

      return res.status(200).json({
        message: "News updated successfully.",
        news,
      });
    } catch (error) {
      console.error("Update news error:", error);

      return res.status(500).json({
        message: "Unable to update news.",
      });
    }
  }
);

// ======================================
// ADMIN: DELETE NEWS
// DELETE /api/admin/news/:id
// ======================================

router.delete(
  "/admin/news/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          message: "Invalid news ID.",
        });
      }

      const news = await News.findByIdAndDelete(id);

      if (!news) {
        return res.status(404).json({
          message: "News article not found.",
        });
      }

      return res.status(200).json({
        message: "News deleted successfully.",
      });
    } catch (error) {
      console.error("Delete news error:", error);

      return res.status(500).json({
        message: "Unable to delete news.",
      });
    }
  }
);

module.exports = router;

*/


/*

const express = require("express");
const mongoose = require("mongoose");
const imagekit = require("../config/imagekit");
const upload = require("../middleware/upload");
const News = require("../models/News");
const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const createSlug = (title) => {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const getUniqueSlug = async (title, excludeId = null) => {
  const baseSlug = createSlug(title) || "news";
  let slug = baseSlug;
  let count = 2;

  while (
    await News.exists({
      slug,
      ...(excludeId ? { _id: { $ne: excludeId } } : {}),
    })
  ) {
    slug = `${baseSlug}-${count++}`;
  }

  return slug;
};
const router = express.Router();

// ======================================
// HELPER: VALIDATE ARTICLE SECTIONS
// ======================================

const validateSections = (sections) => {
  if (!Array.isArray(sections)) {
    return "Sections must be an array.";
  }

  for (const section of sections) {
    if (
      !section ||
      typeof section.heading !== "string" ||
      typeof section.content !== "string"
    ) {
      return "Each section must have a heading and content.";
    }

    if (
      section.headingFontSize !== undefined &&
      (!Number.isFinite(section.headingFontSize) ||
        section.headingFontSize < 12 ||
        section.headingFontSize > 60)
    ) {
      return "Heading font size must be between 12 and 60.";
    }

    if (
      section.contentFontSize !== undefined &&
      (!Number.isFinite(section.contentFontSize) ||
        section.contentFontSize < 12 ||
        section.contentFontSize > 32)
    ) {
      return "Content font size must be between 12 and 32.";
    }

    if (
      section.alignment !== undefined &&
      !["left", "center", "right", "justify"].includes(
        section.alignment
      )
    ) {
      return "Alignment must be left, center, right or justify.";
    }
  }

  return null;
};

// ======================================
// PUBLIC: GET ALL ACTIVE NEWS
// GET /api/news
// ======================================

router.get("/news", async (req, res) => {
  try {
    const news = await News.find({
      active: true,
    }).sort({ createdAt: -1 });

    return res.status(200).json(news);
  } catch (error) {
    console.error("Fetch news error:", error);

    return res.status(500).json({
      message: "Unable to load news.",
    });
  }
});

// ======================================
// PUBLIC: GET ONE ACTIVE NEWS ARTICLE
// GET /api/news/:id
// ======================================

router.get("/news/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid news ID.",
      });
    }

    const news = await News.findOne({
      _id: id,
      active: true,
    });

    if (!news) {
      return res.status(404).json({
        message: "News article not found.",
      });
    }

    return res.status(200).json(news);
  } catch (error) {
    console.error("News detail error:", error);

    return res.status(500).json({
      message: "Unable to load news article.",
    });
  }
});

// ======================================
// ADMIN: UPLOAD IMAGE TO IMAGEKIT
// POST /api/admin/news/upload-image
// FormData field: image
// ======================================

router.post(
  "/admin/news/upload-image",
  protect,
  adminOnly,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "Please select an image to upload.",
        });
      }

      console.log("Image received:", {
        name: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
      });

      const safeFileName = req.file.originalname
        .replace(/[^a-zA-Z0-9._-]/g, "_")
        .slice(-100);

      const uploadedImage = await imagekit.upload({
        file: req.file.buffer.toString("base64"),
        fileName: `policynews-${Date.now()}-${safeFileName}`,
      });

      console.log(
        "ImageKit upload successful:",
        uploadedImage.url
      );

      return res.status(201).json({
        message: "Image uploaded successfully.",
        image: uploadedImage.url,
        imageKitFileId: uploadedImage.fileId,
      });
    } catch (error) {
      console.error("========== IMAGEKIT ERROR ==========");
      console.dir(error, { depth: 10 });
      console.error("Error message:", error?.message);
      console.error("Error response:", error?.response?.data);
      console.error("====================================");

      return res.status(500).json({
        message: "Unable to upload image. Please try again.",
      });
    }
  }
);

// ======================================
// ADMIN: GET ALL NEWS
// GET /api/admin/news
// ======================================

router.get(
  "/admin/news",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const news = await News.find({}).sort({ createdAt: -1 });

      return res.status(200).json(news);
    } catch (error) {
      console.error("Admin news error:", error);

      return res.status(500).json({
        message: "Unable to load admin news.",
      });
    }
  }
);

// ======================================
// ADMIN: CREATE NEWS
// POST /api/admin/news
// ======================================

router.post(
  "/admin/news",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const {
        title,
        image,
        imageKitFileId,
        summary,
        content,
        sections,
        active,
      } = req.body;

      const hasSections =
        Array.isArray(sections) &&
        sections.some(
          (section) =>
            section &&
            typeof section.content === "string" &&
            section.content.trim()
        );

      if (
        typeof title !== "string" ||
        !title.trim() ||
        typeof summary !== "string" ||
        !summary.trim() ||
        (!content?.trim() && !hasSections)
      ) {
        return res.status(400).json({
          message:
            "Title, summary and article content or sections are required.",
        });
      }

      if (
        sections !== undefined &&
        sections !== null
      ) {
        const sectionsError = validateSections(sections);

        if (sectionsError) {
          return res.status(400).json({
            message: sectionsError,
          });
        }
      }

      if (
        active !== undefined &&
        typeof active !== "boolean"
      ) {
        return res.status(400).json({
          message: "Active must be true or false.",
        });
      }

      const news = await News.create({
        title: title.trim(),
        image:
          typeof image === "string" ? image.trim() : "",
        imageKitFileId:
          typeof imageKitFileId === "string"
            ? imageKitFileId
            : "",
        summary: summary.trim(),
        content:
          typeof content === "string"
            ? content.trim()
            : "",
        sections: sections || [],
        active: active === undefined ? true : active,
      });

      return res.status(201).json({
        message: "News published successfully.",
        news,
      });
    } catch (error) {
      console.error("Create news error:", error);

      return res.status(500).json({
        message: "Unable to publish news.",
      });
    }
  }
);

// ======================================
// ADMIN: UPDATE NEWS
// PUT /api/admin/news/:id
// ======================================

router.put(
  "/admin/news/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          message: "Invalid news ID.",
        });
      }

      const {
        title,
        image,
        imageKitFileId,
        summary,
        content,
        sections,
        active,
      } = req.body;

      const news = await News.findById(id);

      if (!news) {
        return res.status(404).json({
          message: "News article not found.",
        });
      }

      if (title !== undefined) {
        if (
          typeof title !== "string" ||
          !title.trim()
        ) {
          return res.status(400).json({
            message: "Title cannot be empty.",
          });
        }

        news.title = title.trim();
      }

      if (image !== undefined) {
        if (typeof image !== "string") {
          return res.status(400).json({
            message: "Invalid image URL.",
          });
        }

        news.image = image.trim();
      }

      // Preserve ImageKit file ID if not supplied.
      if (imageKitFileId !== undefined) {
        if (typeof imageKitFileId !== "string") {
          return res.status(400).json({
            message: "Invalid ImageKit file ID.",
          });
        }

        news.imageKitFileId = imageKitFileId;
      }

      if (summary !== undefined) {
        if (
          typeof summary !== "string" ||
          !summary.trim()
        ) {
          return res.status(400).json({
            message: "Summary cannot be empty.",
          });
        }

        news.summary = summary.trim();
      }

      if (content !== undefined) {
        if (
          typeof content !== "string" ||
          !content.trim()
        ) {
          return res.status(400).json({
            message: "Content cannot be empty.",
          });
        }

        news.content = content.trim();
      }

      if (sections !== undefined) {
        const sectionsError = validateSections(sections);

        if (sectionsError) {
          return res.status(400).json({
            message: sectionsError,
          });
        }

        const hasContent =
          sections.some(
            (section) => section.content.trim()
          );

        // A legacy content field may be used instead.
        const hasLegacyContent =
          typeof content === "string"
            ? content.trim()
            : news.content.trim();

        if (!hasContent && !hasLegacyContent) {
          return res.status(400).json({
            message:
              "At least one section or article content is required.",
          });
        }

        news.sections = sections;
      }

      if (active !== undefined) {
        if (typeof active !== "boolean") {
          return res.status(400).json({
            message: "Active must be true or false.",
          });
        }

        news.active = active;
      }

      await news.save();

      return res.status(200).json({
        message: "News updated successfully.",
        news,
      });
    } catch (error) {
      console.error("Update news error:", error);

      return res.status(500).json({
        message: "Unable to update news.",
      });
    }
  }
);

// ======================================
// ADMIN: DELETE NEWS
// DELETE /api/admin/news/:id
// ======================================

router.delete(
  "/admin/news/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          message: "Invalid news ID.",
        });
      }

      const news = await News.findByIdAndDelete(id);

      if (!news) {
        return res.status(404).json({
          message: "News article not found.",
        });
      }

      return res.status(200).json({
        message: "News deleted successfully.",
      });
    } catch (error) {
      console.error("Delete news error:", error);

      return res.status(500).json({
        message: "Unable to delete news.",
      });
    }
  }
);

module.exports = router;
*/



const express = require("express");
const mongoose = require("mongoose");
const imagekit = require("../config/imagekit");
const upload = require("../middleware/upload");
const News = require("../models/News");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

// ==============================================
// HELPER: GENERATE SEO-FRIENDLY SLUG
// ==============================================

const createSlug = (title = "") => {
  return String(title)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// ==============================================
// HELPER: GENERATE UNIQUE SLUG
// ==============================================

const getUniqueSlug = async (title, excludeId = null) => {
  const baseSlug = createSlug(title) || "news";
  let slug = baseSlug;
  let count = 2;

  const exclusion = excludeId
    ? { _id: { $ne: excludeId } }
    : {};

  while (
    await News.exists({
      slug,
      ...exclusion,
    })
  ) {
    slug = `${baseSlug}-${count}`;
    count += 1;
  }

  return slug;
};


const ensureMissingSlugs = async (filter = {}) => {
  const articles = await News.find({
    ...filter,
    $or: [
      { slug: { $exists: false } },
      { slug: null },
      { slug: "" },
    ],
  })
    .select("_id title slug")
    .lean();

  for (const article of articles) {
    const slug = await getUniqueSlug(
      article.title,
      article._id
    );

    await News.updateOne(
      {
        _id: article._id,
        $or: [
          { slug: { $exists: false } },
          { slug: null },
          { slug: "" },
        ],
      },
      { $set: { slug } }
    );
  }
};


// ==============================================
// HELPER: COPY ONLY FIELDS DEFINED IN NEWS MODEL
// This preserves existing sections and heading fields
// when those fields are defined in the Mongoose schema.
// ==============================================

const getAllowedNewsFields = (body = {}) => {
  const fields = {};

  const protectedFields = [
    "_id",
    "__v",
    "createdAt",
    "updatedAt",
    "slug",
  ];

  for (const [key, value] of Object.entries(body)) {
    if (
      protectedFields.includes(key) ||
      !News.schema.path(key)
    ) {
      continue;
    }

    fields[key] = value;
  }

  return fields;
};

// ==============================================
// HELPER: IMAGE UPLOAD ERROR HANDLER
// ==============================================

const handleImageUpload = (req, res, next) => {
  upload.single("image")(req, res, (error) => {
    if (!error) {
      return next();
    }

    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "Image size must be 5 MB or less.",
      });
    }

    return res.status(400).json({
      message:
        error.message ||
        "Unable to process the selected image.",
    });
  });
};

// ==============================================
// PUBLIC: GET ALL ACTIVE NEWS
// GET /api/news
// ==============================================
/*
router.get("/news", async (req, res) => {
  try {
    const news = await News.find({
      active: true,
    })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json(news);
  } catch (error) {
    console.error("Fetch public news error:", error);

    return res.status(500).json({
      message: "Unable to load news.",
    });
  }
});
*/

router.get("/news", async (req, res) => {
  try {
    // Purani published news ke missing slugs generate karo.
    await ensureMissingSlugs({ active: true });

    const news = await News.find({
      active: true,
    })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json(news);
  } catch (error) {
    console.error("Fetch public news error:", error);

    return res.status(500).json({
      message: "Unable to load news.",
    });
  }
});

// ==============================================
// PUBLIC: GET SINGLE NEWS BY SLUG OR OLD MONGODB ID
// GET /api/news/:slug
// ==============================================

router.get("/news/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    let news = await News.findOne({
      slug,
      active: true,
    }).lean();

    // Backward compatibility for existing ID-based URLs.
    if (!news && mongoose.isValidObjectId(slug)) {
      news = await News.findOne({
        _id: slug,
        active: true,
      }).lean();
    }

    // Older articles may not have a slug yet.
    // Their ID URLs will continue to work.
    if (!news) {
      return res.status(404).json({
        message: "News article not found.",
      });
    }

    return res.status(200).json(news);
  } catch (error) {
    console.error("Fetch single news error:", error);

    return res.status(500).json({
      message: "Unable to load news article.",
    });
  }
});

// ==============================================
// ADMIN: UPLOAD IMAGE TO IMAGEKIT
// POST /api/admin/news/upload-image
// FormData field: image
// ==============================================

router.post(
  "/admin/news/upload-image",
  protect,
  adminOnly,
  handleImageUpload,
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "Please select an image to upload.",
        });
      }

      const safeFileName = req.file.originalname
        .replace(/[^a-zA-Z0-9._-]/g, "_")
        .slice(-100);

      const uploadedImage = await imagekit.upload({
        file: req.file.buffer.toString("base64"),
        fileName: `policynews-${Date.now()}-${safeFileName}`,
      });

      return res.status(201).json({
        message: "Image uploaded successfully.",
        image: uploadedImage.url,
        imageKitFileId: uploadedImage.fileId,
      });
    } catch (error) {
      console.error("ImageKit upload error:", error);

      return res.status(500).json({
        message: "Unable to upload image. Please try again.",
      });
    }
  }
);

// ==============================================
// ADMIN: GET ALL NEWS
// GET /api/admin/news
// ==============================================

router.get(
  "/admin/news",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const news = await News.find({})
        .sort({ createdAt: -1 })
        .lean();

      return res.status(200).json(news);
    } catch (error) {
      console.error("Fetch admin news error:", error);

      return res.status(500).json({
        message: "Unable to load admin news.",
      });
    }
  }
);

// ==============================================
// ADMIN: CREATE NEWS
// POST /api/admin/news
// ==============================================

router.post(
  "/admin/news",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const {
        title,
        summary,
        content,
      } = req.body;

      if (
        typeof title !== "string" ||
        !title.trim() ||
        typeof summary !== "string" ||
        !summary.trim() ||
        typeof content !== "string" ||
        !content.trim()
      ) {
        return res.status(400).json({
          message:
            "Title, summary and content are required.",
        });
      }

      // Keep every field that exists in the current schema,
      // including sections and heading-related properties.
      const allowedFields = getAllowedNewsFields(req.body);

      const slug = await getUniqueSlug(title.trim());

      const news = await News.create({
        ...allowedFields,
        title: title.trim(),
        summary: summary.trim(),
        content: content.trim(),
        slug,
        image:
          typeof req.body.image === "string"
            ? req.body.image.trim()
            : "",
        imageKitFileId:
          req.body.imageKitFileId || "",
        active:
          typeof req.body.active === "boolean"
            ? req.body.active
            : true,
      });

      return res.status(201).json({
        message: "News published successfully.",
        news,
      });
    } catch (error) {
      console.error("Create news error:", error);

      if (error.code === 11000) {
        return res.status(409).json({
          message:
            "A news article with this slug already exists.",
        });
      }

      return res.status(500).json({
        message: "Unable to publish news.",
      });
    }
  }
);

// ==============================================
// ADMIN: UPDATE NEWS
// PUT /api/admin/news/:id
// ==============================================

router.put(
  "/admin/news/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          message: "Invalid news ID.",
        });
      }

      const news = await News.findById(id);

      if (!news) {
        return res.status(404).json({
          message: "News article not found.",
        });
      }

      const {
        title,
        summary,
        content,
        image,
        imageKitFileId,
        active,
      } = req.body;

      if (
        title !== undefined &&
        (typeof title !== "string" || !title.trim())
      ) {
        return res.status(400).json({
          message: "Title cannot be empty.",
        });
      }

      if (
        summary !== undefined &&
        (typeof summary !== "string" || !summary.trim())
      ) {
        return res.status(400).json({
          message: "Summary cannot be empty.",
        });
      }

      if (
        content !== undefined &&
        (typeof content !== "string" || !content.trim())
      ) {
        return res.status(400).json({
          message: "Content cannot be empty.",
        });
      }

      if (
        image !== undefined &&
        typeof image !== "string"
      ) {
        return res.status(400).json({
          message: "Invalid image URL.",
        });
      }

      if (
        active !== undefined &&
        typeof active !== "boolean"
      ) {
        return res.status(400).json({
          message: "Active must be true or false.",
        });
      }

      // Update schema-defined fields only.
      // This includes sections and heading properties
      // if they are defined in the News model.
      const allowedFields = getAllowedNewsFields(req.body);

      for (const [key, value] of Object.entries(allowedFields)) {
        news.set(key, value);
      }

      if (title !== undefined) {
        news.title = title.trim();

        // Generate a fresh slug only when the title changes.
        if (title.trim() !== createSlug(news.title).replace(/-/g, " ")) {
          // The slug below is generated from the new title.
          // Existing articles retain their slug when unchanged.
        }

        news.slug = await getUniqueSlug(
          title.trim(),
          news._id
        );
      } else if (!news.slug) {
        // Automatically create a slug for an older article
        // when it is edited for the first time.
        news.slug = await getUniqueSlug(
          news.title,
          news._id
        );
      }

      if (summary !== undefined) {
        news.summary = summary.trim();
      }

      if (content !== undefined) {
        news.content = content.trim();
      }

      if (image !== undefined) {
        news.image = image.trim();
      }

      // Do not erase an existing ImageKit file ID when
      // the frontend omits this property.
      if (imageKitFileId !== undefined) {
        news.imageKitFileId = imageKitFileId;
      }

      if (active !== undefined) {
        news.active = active;
      }

      await news.save();

      return res.status(200).json({
        message: "News updated successfully.",
        news,
      });
    } catch (error) {
      console.error("Update news error:", error);

      if (error.code === 11000) {
        return res.status(409).json({
          message:
            "A news article with this slug already exists.",
        });
      }

      return res.status(500).json({
        message: "Unable to update news.",
      });
    }
  }
);

// ==============================================
// ADMIN: DELETE NEWS
// DELETE /api/admin/news/:id
// ==============================================

router.delete(
  "/admin/news/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          message: "Invalid news ID.",
        });
      }

      const news = await News.findByIdAndDelete(id);

      if (!news) {
        return res.status(404).json({
          message: "News article not found.",
        });
      }

      return res.status(200).json({
        message: "News deleted successfully.",
      });
    } catch (error) {
      console.error("Delete news error:", error);

      return res.status(500).json({
        message: "Unable to delete news.",
      });
    }
  }
);

module.exports = router;
