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
} = require("../controllers/report.controller");

// Citizen
router.post("/", verifyToken, upload.single("image"), createReport);

// Citizen Reports
router.get("/", verifyToken, getAllReports);

// Admin Reports
router.get("/admin/all", verifyToken, getAdminReports);

// Single Report
router.get("/:id", verifyToken, getReportById);

// Update Status
router.patch("/:id/status", verifyToken, updateReportStatus);

// Delete
router.delete("/:id", verifyToken, deleteReport);

module.exports = router;