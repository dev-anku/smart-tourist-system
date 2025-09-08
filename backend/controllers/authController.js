const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
// const digitalID = require("../config/blockchain.js");
const { validationResult } = require("express-validator");

const User = require("../models/user.js");

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { name, phone, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const idHash = crypto
      .createHash("sha256")
      .update(email + Date.now())
      .digest("hex");

    user = new User({ name, phone, email, password: hashedPassword, idHash });
    await user.save();

    // const tx = await digitalID.createUser(name, email);
    // await tx.wait();

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, idHash });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, idHash: user.idHash });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
