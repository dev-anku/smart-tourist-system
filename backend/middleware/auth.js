const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

async function auth(req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      return next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token invalid" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
}

function admin(req, res, next) {
  if (req.user && req.user.admin === true) {
    return next();
  }
  return res.status(403).json({ message: "Not authorized as admin" });
}

module.exports = { auth, admin };
