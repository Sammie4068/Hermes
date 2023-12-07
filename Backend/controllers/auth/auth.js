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
      return res.json({ message: "invalid" });
    }

    const { id, role, name, email } = foundUser.rows[0];
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
      id,
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
    const { name, email, role } = req.body;

    const results = await getUserByEmail(email);
    if (results.rows.length > 0) {
      res.json({ message: "Already Exists" });
    } else {
      let hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = {
        name,
        email,
        hashedPassword,
        role,
      };
      const result = await addUsers(user);
      const { id } = result.rows[0];
      const token = jwt.sign({ name }, secret, {
        expiresIn: 60 * 60,
      });

      return res.json({
        id,
        token,
        message: "success",
        role,
        name,
        email,
      });
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
      role: "runner",
      gig: req.body.gig,
      bio: req.body.bio,
      tip: req.body.tip
    };
    const result = await addRunner(runner);
    const {id} = result.rows[0]
    res.json({
      message: "success",
      id
    });
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
