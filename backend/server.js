



/*

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const supportRoutes = require("./routes/supportRoutes");
const publicRoutes = require("./routes/publicRoutes");
const newsRoutes = require("./routes/newsRoutes");
dotenv.config();
console.log("ImageKit public key loaded:", Boolean(process.env.IMAGEKIT_PUBLIC_KEY));
console.log("ImageKit private key loaded:", Boolean(process.env.IMAGEKIT_PRIVATE_KEY));
console.log("ImageKit endpoint loaded:", Boolean(process.env.IMAGEKIT_URL_ENDPOINT));
const app = express();


// =========================
// MIDDLEWARE
// =========================
/*
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
); *
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://insurance-website-sooty.vercel.app",
    "https://policynews.in"
  ],
  credentials: true
};

app.use(cors(corsOptions));


app.use(express.json());


// =========================
// ROUTES
// =========================

app.get("/", (req, res) => {
  res.json({
    message: "InsureX API is running",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api", supportRoutes);
app.use("/api", publicRoutes);
app.use("/api", newsRoutes);
// =========================
// MONGODB
// =========================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT, () => {
      console.log(
        `Server running on http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed:",
      error
    );
  });

*/




require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Check environment variables without printing secret values
console.log(
  "ImageKit public key loaded:",
  Boolean(process.env.IMAGEKIT_PUBLIC_KEY)
);
console.log(
  "ImageKit private key loaded:",
  Boolean(process.env.IMAGEKIT_PRIVATE_KEY)
);
console.log(
  "ImageKit endpoint loaded:",
  Boolean(process.env.IMAGEKIT_URL_ENDPOINT)
);

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const supportRoutes = require("./routes/supportRoutes");
const publicRoutes = require("./routes/publicRoutes");
const newsRoutes = require("./routes/newsRoutes");

const app = express();

// =========================
// MIDDLEWARE
// =========================

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://insurance-website-sooty.vercel.app",
    "https://policynews.in",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// =========================
// ROOT ROUTE
// =========================

app.get("/", (req, res) => {
  res.json({
    message: "InsureX API is running",
  });
});

// =========================
// API ROUTES
// =========================

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", supportRoutes);
app.use("/api", publicRoutes);
app.use("/api", newsRoutes);

// =========================
// START SERVER
// =========================

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from backend .env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
