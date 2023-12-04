const { res, req, next } = require("express");
const { getRunners, gerUsersById, updateUser } = require("../../models/index");

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
    const { photo, name, email, gig, bio } = results.rows[0];
    res.json({ photo, name, email, gig, bio });
  } catch (err) {
    return next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { name, email, task, bio } = req.body;
    const data = {
      name,
      email,
      task,
      bio,
      id: req.params.id,
    };
    const results = await updateUser(data);
    res.json({message: "success", name, email, task, bio})
  } catch (err) {
    return next(err);
  }
};
