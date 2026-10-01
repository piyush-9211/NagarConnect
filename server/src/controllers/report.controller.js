const prisma = require("../config/prisma");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const AI_SERVICE_URL =
  process.env.AI_SERVICE_URL || "http://localhost:8000";

// ==========================================
// Reverse Geocoding
// ==========================================

const getAddressFromCoordinates = async (
  latitude,
  longitude
) => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          lat: latitude,
          lon: longitude,
          format: "jsonv2",
        },
        headers: {
          "User-Agent":
            "NagarConnect/1.0 (Student Project)",
        },
        timeout: 10000,
      }
    );

    return response.data.display_name || null;
  } catch (error) {
    console.error(
      "Reverse Geocoding Error:",
      error.message
    );

    return null;
  }
};

// ==========================================
// AI Prediction
// ==========================================

const analyzeImageWithAI = async (filePath) => {
  try {
    const form = new FormData();

    form.append(
      "file",
      fs.createReadStream(filePath)
    );

    const response = await axios.post(
      `${AI_SERVICE_URL}/predict`,
      form,
      {
        headers: {
          ...form.getHeaders(),
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        timeout: 120000,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "AI SERVICE ERROR:",
      error.response?.data || error.message
    );

    return null;
  }
};

// ==========================================
// Reverse Geocode API
// ==========================================

const reverseGeocode = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (
      latitude == null ||
      longitude == null
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Latitude and longitude are required",
      });
    }

    const address =
      await getAddressFromCoordinates(
        parseFloat(latitude),
        parseFloat(longitude)
      );

    return res.status(200).json({
      success: true,
      address,
    });
  } catch (error) {
    console.error(
      "Reverse Geocode Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to get address",
    });
  }
};

// ==========================================
// Create Report
// ==========================================

const createReport = async (req, res) => {
  try {
    const {
      title,
      description,
      issueType,
      latitude,
      longitude,
      address,
    } = req.body;

    if (
      latitude == null ||
      longitude == null
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // ======================================
    // Address
    // ======================================

    let finalAddress = address;

    if (!finalAddress) {
      finalAddress =
        await getAddressFromCoordinates(
          parseFloat(latitude),
          parseFloat(longitude)
        );
    }

    // ======================================
    // AI ANALYSIS
    // ======================================

    let aiResult = null;

    if (req.file?.path) {
      aiResult = await analyzeImageWithAI(
        req.file.path
      );
    }

    console.log(
      "AI RESULT:",
      JSON.stringify(aiResult, null, 2)
    );

    // ======================================
    // AI VALUES
    // ======================================

    const detectedIssue =
      aiResult?.class ||
      issueType ||
      "Unknown";

    const aiConfidence =
      aiResult?.confidence ?? null;

    const aiSeverity =
      aiResult?.severity ?? null;

    const estimatedRepairCost =
      aiResult?.estimated_cost ?? null;

    const aiDepartment =
      aiResult?.department ?? null;

    // ======================================
    // AUTO-GENERATE REPORT DETAILS
    // ======================================

    const finalTitle =
      aiResult?.class
        ? `${aiResult.class} detected`
        : (title?.trim() || "Civic Issue Report");

    const confidenceText =
      aiConfidence != null
        ? `${(aiConfidence * 100).toFixed(1)}%`
        : "unknown";

    const finalDescription =
      aiResult?.class
        ? `AI detected a ${aiResult.class} with ${confidenceText} confidence. Severity: ${aiSeverity || "Unknown"}.`
        : (description?.trim() || "Civic issue reported by citizen.");

    // ======================================
    // CREATE REPORT
    // ======================================

    const report =
      await prisma.report.create({
        data: {
          title: finalTitle,

          description: finalDescription,

          issueType: detectedIssue,

          latitude:
            parseFloat(latitude),

          longitude:
            parseFloat(longitude),

          address: finalAddress,

          aiClass:
            aiResult?.class || null,

          aiConfidence,

          aiSeverity,

          estimatedRepairCost,

          aiDepartment,

          citizenId: req.user.id,

          images: req.file
            ? {
                create: {
                  imageUrl:
                    `/uploads/${req.file.filename}`,
                },
              }
            : undefined,
        },

        include: {
          citizen: {
            select: {
              id: true,
              fullName: true,
              email: true,
            },
          },

          images: true,
        },
      });

    return res.status(201).json({
      success: true,
      message:
        "Report created successfully",
      report,
      ai: aiResult,
    });

  } catch (err) {
    console.error(
      "CREATE REPORT ERROR:",
      err
    );

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================================
// Citizen Reports
// ==========================================

const getAllReports = async (req, res) => {
  try {
    const reports =
      await prisma.report.findMany({
        where: {
          citizenId: req.user.id,
        },

        include: {
          images: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================================
// SLA Helper
// ==========================================

const getSLAInfo = (report) => {
  const issue = (report.aiClass || report.issueType || "").toLowerCase();

  let slaHours = 48;

  if (issue.includes("garbage")) {
    slaHours = 24;
  } else if (issue.includes("waterlogging")) {
    slaHours = 24;
  } else if (issue.includes("pothole")) {
    slaHours = 48;
  } else if (issue.includes("brokenstreetlight") || issue.includes("streetlight")) {
    slaHours = 72;
  }

  const deadline = new Date(
    new Date(report.createdAt).getTime() + slaHours * 60 * 60 * 1000
  );

  const now = new Date();
  const remainingMs = deadline.getTime() - now.getTime();

  let sla_status;

  if (
    report.status === "RESOLVED" ||
    report.status === "REJECTED"
  ) {
    sla_status =
      report.status === "RESOLVED"
        ? "Within SLA"
        : "SLA Breached";
  } else if (remainingMs <= 0) {
    sla_status = "SLA Breached";
  } else if (remainingMs <= 6 * 60 * 60 * 1000) {
    sla_status = "Near Deadline";
  } else {
    sla_status = "Within SLA";
  }

  return {
    sla_hours: slaHours,
    sla_deadline: deadline,
    sla_status,
  };
};

// ==========================================
// Admin Reports
// ==========================================

const getAdminReports = async (req, res) => {
  try {
    const reports =
      await prisma.report.findMany({
        include: {
          citizen: {
            select: {
              id: true,
              fullName: true,
              email: true,
            },
          },

          images: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return res.status(200).json({
      success: true,
      reports,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================================
// Report Details
// ==========================================

const getReportById = async (req, res) => {
  try {
    const report =
      await prisma.report.findUnique({
        where: {
          id: req.params.id,
        },

        include: {
          citizen: {
            select: {
              id: true,
              fullName: true,
              email: true,
            },
          },

          images: true,
        },
      });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    return res.status(200).json({
      success: true,
      report,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================================
// Update Status
// ==========================================

const updateReportStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    const report =
      await prisma.report.update({
        where: {
          id: req.params.id,
        },

        data: {
          status,
        },
      });

    return res.status(200).json({
      success: true,
      message:
        "Status updated successfully",
      report,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================================
// Delete Report
// ==========================================

const deleteReport = async (req, res) => {
  try {
    const report =
      await prisma.report.findUnique({
        where: {
          id: req.params.id,
        },
      });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    await prisma.report.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({
      success: true,
      message:
        "Report deleted successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================================
// EXPORTS
// ==========================================

module.exports = {
  createReport,
  getAllReports,
  getAdminReports,
  getReportById,
  updateReportStatus,
  deleteReport,
  reverseGeocode,
};
