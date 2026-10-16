const express = require("express");
const mongoose = require("mongoose");

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

module.exports = router;