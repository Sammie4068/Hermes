const { getNameTask, getTasks } = require("./admin/admin")

const { login, register, getUsers, tokenChecker } = require("./auth/auth");

module.exports = {
  getNameTask,
  getTasks,
  login,
  register,
  getUsers,
  tokenChecker,
};