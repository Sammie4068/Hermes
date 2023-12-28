const {
  getAllTasks,
  getTaskByName,
  getAllRunners,
  addActivity,
  updateRunnerID,
  getUserActivity,
  getActivityByID,
} = require("./admin/admin");

const {
  getUserByEmail,
  addUsers,
  getAllUsers,
  addRunner,
  getRunnerByEmail,
  getUser,
} = require("./auth/auth");

const {
  getRunners,
  gerUsersById,
  updateUser,
  changePassword,
} = require("./users/users");

module.exports = {
  getAllTasks,
  getTaskByName,
  getUserByEmail,
  addUsers,
  getAllUsers,
  addRunner,
  getAllRunners,
  getRunnerByEmail,
  getUser,
  getRunners,
  gerUsersById,
  updateUser,
  changePassword,
  addActivity,
  updateRunnerID,
  getUserActivity,
  getActivityByID,
};
