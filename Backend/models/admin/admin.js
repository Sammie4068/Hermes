const db = require("../../db")

exports.getAllTasks = async () => {
    return db.query("SELECT * FROM tasks")
}

exports.getTaskByName = async (title) => {
  return db.query("SELECT * FROM tasks WHERE title=$1", [title]);
};