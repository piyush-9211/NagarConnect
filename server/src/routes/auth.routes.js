const express = require("express");
const router = express.Router();

console.log("✅ AUTH ROUTES LOADED");

const authMiddleware = require("../middleware/auth.middleware");
const { register, login } = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed successfully",
    user: req.user,
  });
});

module.exports = router;