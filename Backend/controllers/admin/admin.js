const { req, res, next } = require("express");
const { getAllTasks, getTaskByName } = require("../../models/index");


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
        const results = await getTaskByName(req.params.title)
        res.json(results.rows)
    } catch (err) {
        return next(err)
    }
}