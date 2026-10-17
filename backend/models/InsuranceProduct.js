
const mongoose = require("mongoose");

const insuranceProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

   category: {
  type: String,
  required: true,
  trim: true,
  lowercase: true,
},

    description: {
      type: String,
      required: true,
    },

    coverage: {
      type: String,
      required: true,
    },

    startingPrice: {
      type: Number,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "InsuranceProduct",
  insuranceProductSchema
);

