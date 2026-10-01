const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const {
  createReport,
  getAllReports,
  getAdminReports,
  getReportById,
  updateReportStatus,
  deleteReport,
  reverseGeocode,
} = require("../controllers/report.controller");

// ==========================================
// Create Report
// ==========================================
router.post(
  "/",
  verifyToken,
  upload.single("image"),
  createReport
);

// ==========================================
// Citizen Reports
// ==========================================
router.get(
  "/",
  verifyToken,
  getAllReports
);

// ==========================================
// Reverse Geocoding
// IMPORTANT: keep this BEFORE /:id
// ==========================================
router.get(
  "/geocode",
  verifyToken,
  reverseGeocode
);

// ==========================================
// Admin Reports
// ==========================================
router.get(
  "/admin/all",
  verifyToken,
  getAdminReports
);

// ==========================================
// Single Report
// ==========================================
router.get(
  "/:id",
  verifyToken,
  getReportById
);

// ==========================================
// Update Status
// ==========================================
router.patch(
  "/:id/status",
  verifyToken,
  updateReportStatus
);

// ==========================================
// Delete
// ==========================================
router.delete(
  "/:id",
  verifyToken,
  deleteReport
);

module.exports = router;