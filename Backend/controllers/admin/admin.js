const { req, res, next } = require("express");
const {
  getAllTasks,
  getTaskByName,
  getAllRunners,
  addActivity,
} = require("../../models/index");

exports.getTasks = async (req, res, next) => {
  try {
    const results = await getAllTasks();
    res.json(results.rows);
  } catch (err) {
    return next(err);
  }
};

exports.getNameTask = async (req, res, next) => {
  try {
    const results = await getTaskByName(req.params.title);
    res.json(results.rows);
  } catch (err) {
    return next(err);
  }
};

exports.getAllRunners = async (req, res, next) => {
  try {
    const results = await getAllRunners();
    res.json(results.rows);
  } catch (err) {
    return next(err);
  }
};

exports.addActivity = async (req, res, next) => {
  try {
    const { task, description, location, date, time, status, setterid } = req.body;
    const data = {
      task,
      description,
      location,
      date,
      time,
      status,
      setterid
    };
    const result = await addActivity(data);
    const { id } = result.rows[0];
    return res.json({ id });
  } catch (err) {
    return next(err);
  }
};
