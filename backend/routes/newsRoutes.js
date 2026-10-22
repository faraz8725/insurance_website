/*const express = require("express");
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
// PUBLIC: GET ALL PUBLISHED NEWS
// GET /api/news
// ======================================

router.get("/news", async (req, res) => {
  try {
    const news = await News.find({
      active: true,
    }).sort({ createdAt: -1 });

    res.json(news);
  } catch (error) {
    console.error("Fetch news error:", error);

    res.status(500).json({
      message: "Unable to load news",
    });
  }
});

// ======================================
// PUBLIC: GET ONE NEWS ARTICLE
// GET /api/news/:id
// ======================================

router.get("/news/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid news ID",
      });
    }

    const news = await News.findOne({
      _id: req.params.id,
      active: true,
    });

    if (!news) {
      return res.status(404).json({
        message: "News article not found",
      });
    }

    res.json(news);
  } catch (error) {
    console.error("News detail error:", error);

    res.status(500).json({
      message: "Unable to load news article",
    });
  }
});

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

      const uploadedImage = await new Promise((resolve, reject) => {
        imagekit.upload(
          {
            file: req.file.buffer.toString("base64"),
            fileName: `policynews-${Date.now()}-${req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_")}`,
            folder: "/policynews/news",
            useUniqueFileName: true,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
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
      const news = await News.find().sort({
        createdAt: -1,
      });

      res.json(news);
    } catch (error) {
      console.error("Admin news error:", error);

      res.status(500).json({
        message: "Unable to load admin news",
      });
    }
  }
);

// ======================================
// ADMIN: ADD NEWS
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
      } = req.body;

      if (
        !title?.trim() ||
        !summary?.trim() ||
        !content?.trim()
      ) {
        return res.status(400).json({
          message:
            "Title, summary and full content are required",
        });
      }

      const news = await News.create({
        title: title.trim(),
        image: image?.trim() || "",
        imageKitFileId: imageKitFileId || "",
        summary: summary.trim(),
        content: content.trim(),
        active: true,
        

      });

      res.status(201).json({
        message: "News published successfully",
        news,
      });
    } catch (error) {
      console.error("Create news error:", error);

      res.status(500).json({
        message: "Unable to publish news",
      });
    }
  }
);

// ======================================
// ADMIN: EDIT NEWS
// PUT /api/admin/news/:id
// ======================================

router.put(
  "/admin/news/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({
          message: "Invalid news ID",
        });
      }

      const {
        title,
        image,
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
          message:
            "Title, summary and full content are required",
        });
      }

      const news = await News.findByIdAndUpdate(
        req.params.id,
        {
          title: title.trim(),
          image: image?.trim() || "",
          imageKitFileId: imageKitFileId || "",
          summary: summary.trim(),
          content: content.trim(),
          ...(typeof active === "boolean" && { active }),
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!news) {
        return res.status(404).json({
          message: "News article not found",
        });
      }

      res.json({
        message: "News updated successfully",
        news,
      });
    } catch (error) {
      console.error("Update news error:", error);

      res.status(500).json({
        message: "Unable to update news",
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
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({
          message: "Invalid news ID",
        });
      }

      const news = await News.findByIdAndDelete(
        req.params.id
      );

      if (!news) {
        return res.status(404).json({
          message: "News article not found",
        });
      }

      res.json({
        message: "News deleted successfully",
      });
    } catch (error) {
      console.error("Delete news error:", error);

      res.status(500).json({
        message: "Unable to delete news",
      });
    }
  }
);

module.exports = router; */


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

// =====================================================
// HELPER: Handle image upload middleware errors
// =====================================================

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
        "Invalid image. Please select a JPG, PNG, WEBP or GIF file.",
    });
  });
};

// =====================================================
// PUBLIC: GET ALL ACTIVE NEWS
// GET /api/news
// =====================================================

router.get("/news", async (req, res) => {
  try {
    const news = await News.find({ active: true })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json(news);
  } catch (error) {
    console.error("Get public news error:", error);

    return res.status(500).json({
      message: "Unable to fetch news.",
    });
  }
});

// =====================================================
// PUBLIC: GET SINGLE ACTIVE NEWS
// GET /api/news/:id
// =====================================================

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
    }).lean();

    if (!news) {
      return res.status(404).json({
        message: "News not found.",
      });
    }

    return res.status(200).json(news);
  } catch (error) {
    console.error("Get single news error:", error);

    return res.status(500).json({
      message: "Unable to fetch news.",
    });
  }
});

// =====================================================
// ADMIN: UPLOAD IMAGE TO IMAGEKIT
// POST /api/admin/news/upload-image
// FormData field name: image
// =====================================================

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
        message:
          "ImageKit upload failed. Check your ImageKit credentials and try again.",
      });
    }
  }
);

// =====================================================
// ADMIN: GET ALL NEWS
// GET /api/admin/news
// =====================================================

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
      console.error("Get admin news error:", error);

      return res.status(500).json({
        message: "Unable to fetch admin news.",
      });
    }
  }
);

// =====================================================
// ADMIN: CREATE NEWS
// POST /api/admin/news
// =====================================================

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
        message: "News created successfully.",
        news,
      });
    } catch (error) {
      console.error("Create news error:", error);

      return res.status(500).json({
        message: "Unable to create news.",
      });
    }
  }
);

// =====================================================
// ADMIN: UPDATE NEWS
// PUT /api/admin/news/:id
// =====================================================

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
          message: "News not found.",
        });
      }

      if (title !== undefined) {
        if (!title.trim()) {
          return res.status(400).json({
            message: "Title cannot be empty.",
          });
        }

        news.title = title.trim();
      }

      if (image !== undefined) {
        news.image = image.trim();
      }

      // Preserve the existing file ID unless a new one is supplied.
      if (imageKitFileId !== undefined) {
        news.imageKitFileId = imageKitFileId;
      }

      if (summary !== undefined) {
        if (!summary.trim()) {
          return res.status(400).json({
            message: "Summary cannot be empty.",
          });
        }

        news.summary = summary.trim();
      }

      if (content !== undefined) {
        if (!content.trim()) {
          return res.status(400).json({
            message: "Content cannot be empty.",
          });
        }

        news.content = content.trim();
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

      return res.status(500).json({
        message: "Unable to update news.",
      });
    }
  }
);

// =====================================================
// ADMIN: DELETE NEWS
// DELETE /api/admin/news/:id
// =====================================================

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
          message: "News not found.",
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

module.exports = router;  */






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
*/


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

