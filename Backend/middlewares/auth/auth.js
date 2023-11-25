const { req, res, next } = require("express");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

exports.ensureLoggedIn = (req, res, next) => {
  try {
    const authHeaderValue = req.headers.authorization;
    jwt.verify(authHeaderValue.split(" ")[1], secret);
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
