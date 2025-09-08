const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(process.env.MONGODB).catch((err) => {
  console.error(err);
});

const authRoutes = require("./routes/authRoutes.js");
const geofenceRoutes = require("./routes/geofenceRoutes.js");
const locationRoutes = require("./routes/locationRoutes.js");

app.use("/api/auth", authRoutes);
app.use("/api/geofence", geofenceRoutes);
app.use("/api/location", locationRoutes);

module.exports = app;
