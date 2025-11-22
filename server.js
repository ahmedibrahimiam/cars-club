const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const carsRoutes = require("./routes/cars");
const partsRoutes = require("./routes/parts"); // ⬅️ تأكد من وجوده

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/cars", carsRoutes);
app.use("/api/parts", partsRoutes); // ⬅️ تأكد من وجوده

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;