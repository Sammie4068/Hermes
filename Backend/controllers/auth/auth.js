const { req, res, next } = require("express");
const { getUserByEmail, addUsers, getAllUsers } = require("../../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

exports.getUsers = async (req, res) => {
  const results = await getAllUsers();
  res.json({ number: results.rows.length, data: results.rows });
};

exports.login = async (req, res, next) => {
  try {
    const foundUser = await getUserByEmail(req.body.email);

    if (foundUser.rows.length === 0 || !foundUser.rows[0].active) {
      return res.json({ message: "Invalid" });
    }

    const { id, name, email} = foundUser.rows[0];
    const hashedPassword = await bcrypt.compare(
      req.body.password,
      foundUser.rows[0].password
    );
    if (hashedPassword === false) {
      return res.json({ message: "invalid" });
    }
    const token = jwt.sign({ name }, secret, {
      expiresIn: 60 * 60,
    });

    return res.json({
      token,
      message: "logged",
      id,
      name,
      email,
    });
  } catch (err) {
    return next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const results = await getUserByEmail(req.body.email);
    if (results.rows.length > 0) {
      res.json({ message: "Already Exists" });
    } else {
      let hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = {
        name: req.body.name,
        email: req.body.email,
        hashedPassword,
      };
      const result = await addUsers(user);
      res.json({ message: "success" });
    }
  } catch (err) {
    return next(err);
  }
};

exports.tokenChecker = async (req, res, next) => {
  try {
    return res.json({ message: "You made it!" });
  } catch (err) {
    return res.json(err);
  }
};
