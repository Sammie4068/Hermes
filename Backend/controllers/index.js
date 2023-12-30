const {
  getNameTask,
  getTasks,
  getAllRunners,
  addActivity,
  updateRunnerID,
  getUserActivity,
  getActivityByID,
  getRunnerActivity,
  getActivityBySetterID,
} = require("./admin/admin");

const {
  login,
  register,
  getUsers,
  tokenChecker,
  addRunner,
  getRunnerByEmail,
} = require("./auth/auth");

const {
  getRunners,
  gerUsersById,
  updateUser,
  changePassword,
} = require("./users/users");

module.exports = {
  getNameTask,
  getTasks,
  login,
  register,
  getUsers,
  tokenChecker,
  addRunner,
  getAllRunners,
  getRunnerByEmail,
  getRunners,
  gerUsersById,
  updateUser,
  changePassword,
  addActivity,
  updateRunnerID,
  getUserActivity,
  getActivityByID,
  getRunnerActivity,
  getActivityBySetterID,
};