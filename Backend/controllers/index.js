const { getNameTask, getTasks, getAllRunners } = require("./admin/admin");

const { login, register, getUsers, tokenChecker } = require("./auth/auth");
const { addRunner, getRunnerByEmail } = require("./runners/runners");

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
};