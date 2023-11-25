const { getAllTasks, getTaskByName } = require("./admin/admin")

const { getUserByEmail, addUsers, getAllUsers } = require("./auth/auth");

module.exports = {
  getAllTasks,
  getTaskByName,
  getUserByEmail,
  addUsers,
  getAllUsers,
};