const { req, res, next } = require("express");
const {
  getUserByEmail,
  addUsers,
  getAllUsers,
  addRunner,
  getRunnerByEmail,
  getUser,
} = require("../../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uploadImage = require("../../utilities/index");

const secret = process.env.SECRET;

exports.getUsers = async (req, res) => {
  const results = await getAllUsers();
  res.json({ number: results.rows.length, data: results.rows });
};

exports.login = async (req, res, next) => {
  try {
    const foundUser = await getUser(req.body.email, req.body.role);

    if (foundUser.rows.length === 0 || !foundUser.rows[0].active) {
      return res.json({ message: "Invalid" });
    }

    const { role, name, email} = foundUser.rows[0];
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
      role,
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
        role: "setter"
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

exports.addRunner = async (req, res, next) => {
  try {
    const urls = [];
    const files = req.files;

    for (const file of files) {
      const { path } = file;
      const newPath = await uploadImage(path);
      const { secure_url } = newPath;
      urls.push(secure_url);
    }
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    const runner = {
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      photo: urls[0],
      password: hashedPassword,
      school: req.body.school,
      schoolstate: req.body.schoolstate,
      field: req.body.field,
      yearenrolled: req.body.yearenrolled,
      yeargrad: req.body.yeargrad,
      idcard: urls[1],
      role: "runner"
    };
    const result = await addRunner(runner);
    res.json({ message: "success" });
  } catch (err) {
    return next(err);
  }
};

exports.getRunnerByEmail = async (req, res, next) => {
  try {
    const foundRunner = await getRunnerByEmail(req.params.email);
    if (foundRunner.rows.length > 0) {
      res.json({ message: "exists" });
    } else {
      res.json({ message: "success" });
    }
  } catch (err) {
    return next(err);
  }
};
