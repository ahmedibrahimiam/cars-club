const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.json({ success: false, message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashed
    });

    res.json({ success: true, user });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.json({ success: true, token, user });
});

module.exports = router;
