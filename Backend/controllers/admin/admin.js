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
  addTransaction,
  updateWallet,
  getTransactions,
  gerUsersById
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
    const {
      task,
      description,
      location,
      duration,
      date,
      time,
      status,
      setterid,
    } = req.body;

    const taskData = await getTaskByName(task);
    const { tip } = taskData.rows[0];
    const price = duration * tip;
    const total = price + 500;
    const created = new Date()
    const data = {
      task,
      description,
      location,
      date,
      time,
      status,
      setterid,
      duration,
      price,
      total,
      created
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
    const { runnerID, status } = req.body;
  
    const id = req.params.id;
    const result = await updateRunnerID(runnerID, status, id);
    return res.json({ message: "success", data: result.rows });
  } catch (err) {
    return next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const id = req.params.id;
    const result = await updateStatus(status, id);
    return res.json({ message: "success" });
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

exports.addTransaction = async (req, res, next) => {
  try {
    const { id, type, amount } = req.body;
    const date = new Date();

    const result = await addTransaction(id, type, amount, date);
    res.json({ message: "success" });
  } catch (err) {
    return next(err);
  }
};

exports.updateWallet = async (req, res, next) => {
  try {
    const { amount, id } = req.body;

    const result = await updateWallet(amount, id);
    res.json({ message: "success", data: result.rows[0] });
  } catch (err) {
    return next(err);
  }
};

exports.getTransactions = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await getTransactions(id)
    return res.json(result.rows);
  } catch (err) {
    return next(err)
  }
}

exports.addToWallet = async (req, res, next) => {
  try {
    const { id, price } = req.body;
    
    const result = await gerUsersById(id)
    const { wallet } = result.rows[0]
    const amount = parseFloat(wallet) + parseFloat(price)

    const results = await updateWallet(amount, id)
    res.json({ message: "success", data: results.rows[0] });
  } catch (err) {
    return next(err)
  }
}