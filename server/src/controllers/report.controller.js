const prisma = require("../config/prisma");

// ==============================
// Create Report
// ==============================
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
      !title ||
      !description ||
      !issueType ||
      latitude == null ||
      longitude == null
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const report = await prisma.report.create({
      data: {
        title,
        description,
        issueType,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        address,
        citizenId: req.user.id,

        images: req.file
          ? {
              create: {
                imageUrl: `/uploads/${req.file.filename}`,
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
      message: "Report created successfully",
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

// ==============================
// Citizen Reports
// ==============================
const getAllReports = async (req, res) => {
  try {
    const reports = await prisma.report.findMany({
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

// ==============================
// Admin Reports
// ==============================
const getAdminReports = async (req, res) => {
  try {
    const reports = await prisma.report.findMany({
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

// ==============================
// Report Details
// ==============================
const getReportById = async (req, res) => {
  try {
    const report = await prisma.report.findUnique({
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

// ==============================
// Update Status
// ==============================
const updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const report = await prisma.report.update({
      where: {
        id: req.params.id,
      },
      data: {
        status,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
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

// ==============================
// Delete Report
// ==============================
const deleteReport = async (req, res) => {
  try {
    const report = await prisma.report.findUnique({
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
      message: "Report deleted successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createReport,
  getAllReports,
  getAdminReports,
  getReportById,
  updateReportStatus,
  deleteReport,
};