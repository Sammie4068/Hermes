const { req, res, next } = require("express");
const { addRunner, getRunnerByEmail } = require("../../models/index");
const bcrypt = require("bcrypt");

const uploadImage = require("../../utilities/index");

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
