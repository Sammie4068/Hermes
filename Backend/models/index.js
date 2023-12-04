const { getAllTasks, getTaskByName, getAllRunners } = require("./admin/admin");

const {
  getUserByEmail,
  addUsers,
  getAllUsers,
  addRunner,
  getRunnerByEmail,
  getUser,
} = require("./auth/auth");

const { getRunners, gerUsersById, updateUser } = require("./users/users");

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
};
