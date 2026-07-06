const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const reportRoutes = require("./routes/report.routes");

const app = express();

// =====================
// Middlewares
// =====================

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// =====================
// Routes
// =====================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "NagarConnect API is running 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);

// =====================
// 404 Handler
// =====================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;