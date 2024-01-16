const { res, req, next, urlencoded } = require("express");
const {
  getRunners,
  gerUsersById,
  updateUser,
  changePassword,
  changeImage,
} = require("../../models/index");
const bcrypt = require("bcrypt");
const uploadImage = require("../../utilities/index");

exports.getRunners = async (req, res, next) => {
  try {
    const taskParam = req.params.task.replace(/_/g, " ");
    const results = await getRunners(taskParam, req.params.location);
    res.json(results.rows);
  } catch (err) {
    return next(err);
  }
};

exports.gerUsersById = async (req, res, next) => {
  try {
    const results = await gerUsersById(req.params.id);
    const { id, photo, name, email, gig, bio, completed, school, wallet } =
      results.rows[0];
    res.json({ id, photo, name, email, gig, bio, completed, school, wallet });
  } catch (err) {
    return next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { name, email, phone, task, bio } = req.body;
    const data = {
      name,
      email,
      phone,
      task,
      bio,
      id: req.params.id,
    };
    const results = await updateUser(data);
    res.json({ message: "success", name, email, phone, task, bio });
  } catch (err) {
    return next(err);
  }
};

exports.changeImage = async (req, res, next) => {
  try {
    const response = await uploadImage(req.file.path);
    const { url } = response;

    const id = req.params.id;
    const result = await changeImage(url, id);
    res.json({ message: "success" });
  } catch (err) {
    return next(err);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const id = req.params.id;
    const foundUser = await gerUsersById(id);
    const hashedPassword = await bcrypt.compare(
      oldPassword,
      foundUser.rows[0].password
    );
    if (hashedPassword === false) {
      return res.json({ message: "invalid" });
    }
    const newHashPassword = await bcrypt.hash(newPassword, 10);
    const result = await changePassword(newHashPassword, id);
    return res.json({ message: "success" });
  } catch (err) {
    return next(err);
  }
};
