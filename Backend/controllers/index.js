const { getNameTask, getTasks, getAllRunners } = require("./admin/admin");

const {
  login,
  register,
  getUsers,
  tokenChecker,
  addRunner,
  getRunnerByEmail,
} = require("./auth/auth");

const { getRunners, gerUsersById, updateUser } = require("./users/users");

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
};