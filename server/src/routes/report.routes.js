const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");

const {
  createReport,
  getAllReports,
  getReportById,
} = require("../controllers/report.controller");

// ==============================
// Create Report
// ==============================
router.post("/", verifyToken, createReport);

// ==============================
// Get All Reports
// ==============================
router.get("/", verifyToken, getAllReports);

// ==============================
// Get Report By ID
// ==============================
router.get("/:id", verifyToken, getReportById);

module.exports = router;