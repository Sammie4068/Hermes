const { res, req, next } = require("express");
const {
  getRunners,
  gerUsersById,
  updateUser,
  changePassword,
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
    const { photo, name, email, gig, bio, tip } = results.rows[0];
    res.json({ photo, name, email, gig, bio, tip });
  } catch (err) {
    return next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    // const urls = [];
    // const files = req.files;

    // for (const file of files) {
    //   const { path } = file;
    //   const newPath = await uploadImage(path);
    //   const { secure_url } = newPath;
    //   urls.push(secure_url);
    // }

    const { name, email, task, bio, tip } = req.body;
    const data = {
      name,
      email,
      task,
      bio,
      tip,
    //   photo: urls[0],
      id: req.params.id,
    };
    const results = await updateUser(data);
    res.json({ message: "success", name, email, task, bio, tip});
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
