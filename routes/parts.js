const express = require("express");
const router = express.Router();
const Part = require("../models/Part"); // P كبير
const protect = require("../middleware/authMiddleware");

// @route   POST /api/parts/add
// @desc    Add a new part (Protected route for Admin)
// @access  Private

router.post("/add", protect, async (req, res) => {
  try {
    // استخدم Destructuring لقراءة جميع الحقول (بما فيها الـ user ID يدوياً)
    const { name, description, price, stockQuantity, imageUrl, user } = req.body;
    
    // إنشاء قطعة الغيار باستخدام جميع البيانات المستخرجة
    const part = await Part.create({
      name,
      description,
      price,
      stockQuantity,
      imageUrl,
      user
    });

    res.status(201).json({
      success: true,
      message: "Part added successfully!",
      data: part,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ success: false, message: messages });
    }
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;