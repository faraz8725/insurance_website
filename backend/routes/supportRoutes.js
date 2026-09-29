
const express = require("express");

const Enquiry = require("../models/Enquiry");
const Claim = require("../models/Claim");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


// ======================================
// USER - SUBMIT ENQUIRY
// POST /api/enquiries
// ======================================

router.post("/enquiries", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
    } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "Name, email, subject and message are required",
      });
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    res.status(201).json({
      message: "Enquiry submitted successfully",
      enquiry,
    });

  } catch (error) {
    console.error("Enquiry error:", error);

    res.status(500).json({
      message: "Failed to submit enquiry",
    });
  }
});


// ======================================
// USER - SUBMIT CLAIM
// POST /api/claims
// ======================================

router.post("/claims", protect, async (req, res) => {
  try {
    const {
      policyNumber,
      claimType,
      description,
    } = req.body;

    // Basic validation
    if (!policyNumber || !claimType || !description) {
      return res.status(400).json({
        message:
          "Policy number, claim type and description are required",
      });
    }

    const claim = await Claim.create({
      user: req.user.userId,
      policyNumber,
      claimType,
      description,
    });

    res.status(201).json({
      message: "Claim submitted successfully",
      claim,
    });

  } catch (error) {
    console.error("Claim error:", error);

    res.status(500).json({
      message: "Failed to submit claim",
    });
  }
});


module.exports = router;

