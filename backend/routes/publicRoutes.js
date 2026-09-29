
const express = require("express");

const InsuranceProduct = require("../models/InsuranceProduct");
const FAQ = require("../models/FAQ");
const Partner = require("../models/Partner");

const router = express.Router();


// ======================================
// PUBLIC PRODUCTS
// GET /api/products
// GET /api/products?featured=true
// ======================================

router.get("/products", async (req, res) => {
  try {
    const filter = {
      active: true,
    };

    // Only featured products
    if (req.query.featured === "true") {
      filter.featured = true;
    }

    const products = await InsuranceProduct.find(filter)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.error("Products error:", error);

    res.status(500).json({
      message: "Unable to load products",
    });
  }
});


// ======================================
// PUBLIC PRODUCT DETAIL
// GET /api/products/:id
// ======================================

router.get("/products/:id", async (req, res) => {
  try {
    const product = await InsuranceProduct.findOne({
      _id: req.params.id,
      active: true,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    console.error(
      "Product detail error:",
      error
    );

    res.status(500).json({
      message: "Unable to load product details",
    });
  }
});


// ======================================
// PUBLIC FAQs
// GET /api/faqs
// ======================================

router.get("/faqs", async (req, res) => {
  try {
    const faqs = await FAQ.find({
      active: true,
    }).sort({ createdAt: -1 });

    res.json(faqs);
  } catch (error) {
    console.error("FAQs error:", error);

    res.status(500).json({
      message: "Unable to load FAQs",
    });
  }
});


// ======================================
// PUBLIC PARTNERS
// GET /api/partners
// ======================================

router.get("/partners", async (req, res) => {
  try {
    const partners = await Partner.find({
      active: true,
    }).sort({ createdAt: -1 });

    res.json(partners);
  } catch (error) {
    console.error("Partners error:", error);

    res.status(500).json({
      message: "Unable to load partners",
    });
  }
});


module.exports = router;