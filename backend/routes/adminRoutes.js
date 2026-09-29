/*const express = require("express");

const User = require("../models/User");
const InsuranceProduct = require("../models/InsuranceProduct");
const FAQ = require("../models/FAQ");
const Partner = require("../models/Partner");
const Claim = require("../models/Claim");
const Enquiry = require("../models/Enquiry");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();


// ===============================
// ADMIN DASHBOARD
// ===============================

router.get(
  "/dashboard",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const users = await User.countDocuments();

      const products =
        await InsuranceProduct.countDocuments();

      const faqs = await FAQ.countDocuments();

      const partners =
        await Partner.countDocuments();

      const claims =
        await Claim.countDocuments();

      const enquiries =
        await Enquiry.countDocuments();

      res.json({
        users,
        products,
        faqs,
        partners,
        claims,
        enquiries,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to load dashboard",
      });
    }
  }
);


// ===============================
// USERS
// ===============================

router.get(
  "/users",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 });

      res.json(users);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to load users",
      });
    }
  }
);


// ===============================
// INSURANCE PRODUCTS
// ===============================

// GET ALL PRODUCTS

router.get(
  "/products",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const products =
        await InsuranceProduct.find()
          .sort({ createdAt: -1 });

      res.json(products);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to load products",
      });
    }
  }
);


// ADD PRODUCT

router.post(
  "/products",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const product =
        await InsuranceProduct.create(req.body);

      res.status(201).json({
        message: "Product added successfully",
        product,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to add product",
      });
    }
  }
);


// DELETE PRODUCT

router.delete(
  "/products/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      await InsuranceProduct.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to delete product",
      });
    }
  }
);


// ===============================
// FAQ
// ===============================

// GET FAQs

router.get(
  "/faqs",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const faqs = await FAQ.find()
        .sort({ createdAt: -1 });

      res.json(faqs);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to load FAQs",
      });
    }
  }
);


// ADD FAQ

router.post(
  "/faqs",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const faq = await FAQ.create(req.body);

      res.status(201).json({
        message: "FAQ added successfully",
        faq,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to add FAQ",
      });
    }
  }
);


// DELETE FAQ

router.delete(
  "/faqs/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      await FAQ.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "FAQ deleted successfully",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to delete FAQ",
      });
    }
  }
);


// ===============================
// PARTNERS
// ===============================

// GET PARTNERS

router.get(
  "/partners",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const partners =
        await Partner.find()
          .sort({ createdAt: -1 });

      res.json(partners);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to load partners",
      });
    }
  }
);


// ADD PARTNER

router.post(
  "/partners",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const partner =
        await Partner.create(req.body);

      res.status(201).json({
        message: "Partner added successfully",
        partner,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to add partner",
      });
    }
  }
);


// DELETE PARTNER

router.delete(
  "/partners/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      await Partner.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Partner deleted successfully",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to delete partner",
      });
    }
  }
);


// ===============================
// CLAIMS
// ===============================

router.get(
  "/claims",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const claims = await Claim.find()
        .populate(
          "user",
          "name email phone"
        )
        .sort({ createdAt: -1 });

      res.json(claims);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to load claims",
      });
    }
  }
);


// UPDATE CLAIM STATUS

router.put(
  "/claims/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const claim =
        await Claim.findByIdAndUpdate(
          req.params.id,
          {
            status: req.body.status,
          },
          {
            new: true,
          }
        );

      res.json({
        message: "Claim status updated",
        claim,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to update claim",
      });
    }
  }
);


// ===============================
// ENQUIRIES
// ===============================

router.get(
  "/enquiries",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const enquiries =
        await Enquiry.find()
          .sort({ createdAt: -1 });

      res.json(enquiries);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to load enquiries",
      });
    }
  }
);


// UPDATE ENQUIRY STATUS

router.put(
  "/enquiries/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const enquiry =
        await Enquiry.findByIdAndUpdate(
          req.params.id,
          {
            status: req.body.status,
          },
          {
            new: true,
          }
        );

      res.json({
        message: "Enquiry status updated",
        enquiry,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to update enquiry",
      });
    }
  }
);


module.exports = router; */



const express = require("express");

const User = require("../models/User");
const InsuranceProduct = require("../models/InsuranceProduct");
const FAQ = require("../models/FAQ");
const Partner = require("../models/Partner");
const Claim = require("../models/Claim");
const Enquiry = require("../models/Enquiry");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();


// ===============================
// ADMIN DASHBOARD
// ===============================

router.get(
  "/dashboard",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const users = await User.countDocuments();

      const products =
        await InsuranceProduct.countDocuments();

      const faqs = await FAQ.countDocuments();

      const partners =
        await Partner.countDocuments();

      const claims =
        await Claim.countDocuments();

      const enquiries =
        await Enquiry.countDocuments();

      res.json({
        users,
        products,
        faqs,
        partners,
        claims,
        enquiries,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to load dashboard",
      });
    }
  }
);


// ===============================
// USERS
// ===============================

router.get(
  "/users",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 });

      res.json(users);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to load users",
      });
    }
  }
);


// ===============================
// INSURANCE PRODUCTS
// ===============================

// GET ALL PRODUCTS

router.get(
  "/products",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const products =
        await InsuranceProduct.find()
          .sort({ createdAt: -1 });

      res.json(products);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to load products",
      });
    }
  }
);


// ADD PRODUCT

router.post(
  "/products",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const product =
        await InsuranceProduct.create(req.body);

      res.status(201).json({
        message: "Product added successfully",
        product,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to add product",
      });
    }
  }
);


// UPDATE PRODUCT / FEATURED STATUS

router.put(
  "/products/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const { featured } = req.body;

      const product =
        await InsuranceProduct.findByIdAndUpdate(
          req.params.id,
          {
            featured: Boolean(featured),
          },
          {
            new: true,
            runValidators: true,
          }
        );

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.json({
        message: "Product featured status updated",
        product,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Unable to update product featured status",
      });
    }
  }
);


// DELETE PRODUCT

router.delete(
  "/products/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      await InsuranceProduct.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to delete product",
      });
    }
  }
);


// ===============================
// FAQ
// ===============================

// GET FAQs

router.get(
  "/faqs",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const faqs = await FAQ.find()
        .sort({ createdAt: -1 });

      res.json(faqs);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to load FAQs",
      });
    }
  }
);


// ADD FAQ

router.post(
  "/faqs",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const faq = await FAQ.create(req.body);

      res.status(201).json({
        message: "FAQ added successfully",
        faq,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to add FAQ",
      });
    }
  }
);


// DELETE FAQ

router.delete(
  "/faqs/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      await FAQ.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "FAQ deleted successfully",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to delete FAQ",
      });
    }
  }
);


// ===============================
// PARTNERS
// ===============================

// GET PARTNERS

router.get(
  "/partners",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const partners =
        await Partner.find()
          .sort({ createdAt: -1 });

      res.json(partners);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to load partners",
      });
    }
  }
);


// ADD PARTNER

router.post(
  "/partners",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const partner =
        await Partner.create(req.body);

      res.status(201).json({
        message: "Partner added successfully",
        partner,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to add partner",
      });
    }
  }
);


// DELETE PARTNER

router.delete(
  "/partners/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      await Partner.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Partner deleted successfully",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to delete partner",
      });
    }
  }
);


// ===============================
// CLAIMS
// ===============================

router.get(
  "/claims",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const claims = await Claim.find()
        .populate(
          "user",
          "name email phone"
        )
        .sort({ createdAt: -1 });

      res.json(claims);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to load claims",
      });
    }
  }
);


// UPDATE CLAIM STATUS

router.put(
  "/claims/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const claim =
        await Claim.findByIdAndUpdate(
          req.params.id,
          {
            status: req.body.status,
          },
          {
            new: true,
          }
        );

      res.json({
        message: "Claim status updated",
        claim,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to update claim",
      });
    }
  }
);


// ===============================
// ENQUIRIES
// ===============================

router.get(
  "/enquiries",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const enquiries =
        await Enquiry.find()
          .sort({ createdAt: -1 });

      res.json(enquiries);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to load enquiries",
      });
    }
  }
);


// UPDATE ENQUIRY STATUS

router.put(
  "/enquiries/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const enquiry =
        await Enquiry.findByIdAndUpdate(
          req.params.id,
          {
            status: req.body.status,
          },
          {
            new: true,
          }
        );

      res.json({
        message: "Enquiry status updated",
        enquiry,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to update enquiry",
      });
    }
  }
);


module.exports = router;