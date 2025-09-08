const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const authController = require("../controllers/authController.js");

router.post(
  "/register",
  body("name", "Name should be longer than 3 letters.")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  authController.register,
);

router.post("/login", authController.login);

module.exports = router;
