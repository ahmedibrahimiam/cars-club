const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

router.post("/add", protect, (req, res) => {
  const userId = req.user.id;
  const { model, color } = req.body;

  res.json({
    success: true,
    message: "Car added successfully!",
    carData: { model, color, addedBy: userId },
  });
});

module.exports = router;