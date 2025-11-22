const express = require("express");
const router = express.Router();
const Part = require("../models/Part");
const protect = require("../middleware/authMiddleware");

// @route   GET /api/parts
// @desc    Get all parts (Public route for Flutter)
// @access  Public
router.get("/", async (req, res) => {
    try {
        const parts = await Part.find();
        res.json({
            success: true,
            count: parts.length,
            data: parts
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// @route   POST /api/parts/add
// @desc    Add a new part (Protected route for Admin)
// @access  Private
router.post("/add", protect, async (req, res) => {
    try {
        const userId = req.user.id;
        
        const part = await Part.create({
            ...req.body,
            user: userId
        });

        res.status(201).json({
            success: true,
            message: "Part added successfully!",
            data: part
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