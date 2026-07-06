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
      },
    });

    res.status(201).json({
      success: true,
      message: "Report created successfully",
      report,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==============================
// Get All Reports
// ==============================
const getAllReports = async (req, res) => {
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
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==============================
// Get Report By ID
// ==============================
const getReportById = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await prisma.report.findUnique({
      where: {
        id,
      },
      include: {
        citizen: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).json({
      success: true,
      report,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createReport,
  getAllReports,
  getReportById,
};