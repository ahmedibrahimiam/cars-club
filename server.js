const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const carsRoutes = require("./routes/cars");

//dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/cars", carsRoutes);

//app.listen(process.env.PORT || 5000);

module.exports = app;
