const db = require("../../db");

exports.getAllTasks = async () => {
  return db.query("SELECT * FROM tasks");
};

exports.getTaskByName = async (title) => {
  return db.query("SELECT * FROM tasks WHERE title=$1", [title]);
};

exports.getAllRunners = async () => {
  return db.query("SELECT * FROM users WHERE role='runner'");
};

exports.addActivity = async (data) => {
  return db.query(
    "INSERT INTO activity VALUES (DEFAULT,$1,0,$2,$3,$4,$5,$6,$7) RETURNING *",
    [
      data.task,
      data.description,
      data.location,
      data.date,
      data.time,
      data.status,
      data.setterid
    ]
  );
};
