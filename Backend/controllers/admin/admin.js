const { req, res, next } = require("express");
const {
  getAllTasks,
  getTaskByName,
  getAllRunners,
  addActivity,
  updateRunnerID,
  getUserActivity,
  getActivityByID,
  getRunnerActivity,
  getActivityBySetterID,
  updateStatus,
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
    const { task, description, location, date, time, status, setterid } =
      req.body;
    const data = {
      task,
      description,
      location,
      date,
      time,
      status,
      setterid,
    };
    const result = await addActivity(data);
    const { id } = result.rows[0];
    return res.json({ id });
  } catch (err) {
    return next(err);
  }
};

exports.updateRunnerID = async (req, res, next) => {
  try {
    const { runnerID } = req.body;
    const id = req.params.id;
    const result = await updateRunnerID(runnerID, id);
    return res.json({ message: "success"});
  } catch (err) {
    return next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const id = req.params.id;
    const result = await updateStatus(status, id);
    return res.json({ message: "success"});
  } catch (err) {
    return next(err);
  }
};

exports.getUserActivity = async (req, res, next) => {
  try {
    const results = await getUserActivity(req.params.id);
    return res.json(results.rows);
  } catch (err) {
    return next(err);
  }
};

exports.getRunnerActivity = async (req, res, next) => {
  try {
    const results = await getRunnerActivity(req.params.id);
    return res.json(results.rows);
  } catch (err) {
    return next(err);
  }
};

exports.getActivityByID = async (req, res, next) => {
  try {
    const results = await getActivityByID(req.params.id);
    return res.json(results.rows);
  } catch (err) {
    return next(err);
  }
};

exports.getActivityBySetterID = async (req, res, next) => {
  try {
    const results = await getActivityBySetterID(req.params.id);
    return res.json(results.rows);
  } catch (err) {
    return next(err);
  }
};
