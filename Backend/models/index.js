const { getAllTasks, getTaskByName, getAllRunners } = require("./admin/admin");

const { getUserByEmail, addUsers, getAllUsers } = require("./auth/auth");

const { addRunner, getRunnerByEmail } = require("./runners/runners");

module.exports = {
  getAllTasks,
  getTaskByName,
  getUserByEmail,
  addUsers,
  getAllUsers,
  addRunner,
  getAllRunners,
  getRunnerByEmail,
};