const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");

const {
  createReport,
  getAllReports,
  getReportById,
  updateReportStatus,
  deleteReport,
} = require("../controllers/report.controller");

// Create Report
router.post("/", verifyToken, createReport);

// Get All Reports
router.get("/", verifyToken, getAllReports);

// Get Report By ID
router.get("/:id", verifyToken, getReportById);

// Update Report Status
router.patch("/:id/status", verifyToken, updateReportStatus);

// Delete Report
router.delete("/:id", verifyToken, deleteReport);

module.exports = router;