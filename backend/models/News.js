/*const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
      trim: true,
    },

    imageKitFileId: {
  type: String,
  default: "",
},
    summary: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("News", newsSchema); */








const mongoose = require("mongoose");

const newsSectionSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      default: "",
      trim: true,
    },
    content: {
      type: String,
      default: "",
    },
    headingFontSize: {
      type: Number,
      default: 28,
      min: 12,
      max: 60,
    },
    contentFontSize: {
      type: Number,
      default: 17,
      min: 12,
      max: 32,
    },
    alignment: {
      type: String,
      enum: ["left", "center", "right", "justify"],
      default: "left",
    },
  },
  { _id: true }
);

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
  type: String,
  trim: true,
  lowercase: true,
  index: true,
  default: "",
},
    image: {
      type: String,
      default: "",
      trim: true,
    },

    imageKitFileId: {
      type: String,
      default: "",
    },

    summary: {
      type: String,
      required: true,
      trim: true,
    },

    // Purane articles ke liye backward compatibility
    content: {
      type: String,
      required: true,
      default: "",
    },

    // Naye articles ke multiple headings aur paragraphs
    sections: {
      type: [newsSectionSchema],
      default: [],
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("News", newsSchema);
