const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const carsRoutes = require("./routes/cars");
const partsRoutes = require("./routes/parts");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

connectDB();

// Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carsRoutes);
app.use("/api/parts", partsRoutes);

// Error Handling Middleware (for 404 and 500)
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({ 
        success: false, 
        message: err.message || 'Server Error' 
    });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;