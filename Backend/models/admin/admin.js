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
      data.setterid,
    ]
  );
};

exports.updateRunnerID = async (runnerID, id) => {
  return db.query("UPDATE activity SET runnerid = $1 WHERE id=$2", [
    runnerID,
    id,
  ]);
};

exports.getUserActivity = async (id) => {
  return db.query(
    "SELECT activity.*, users.photo, users.name, users.email, users.gig, users.bio, users.wallet FROM activity INNER JOIN users ON activity.runnerid = users.id WHERE activity.setterid = $1",
    [id]
  );
};

exports.getRunnerActivity = async (id) => {
  return db.query(
    "SELECT activity.*, users.photo, users.name, users.email FROM activity INNER JOIN users ON activity.setterid = users.id WHERE activity.runnerid = $1",
    [id]
  );
};

exports.getActivityByID = async (id) => {
  return db.query(
    "SELECT activity.*, users.photo, users.name, users.email, users.school, users.gig, users.bio, users.wallet, users.phone FROM activity INNER JOIN users ON activity.runnerid = users.id WHERE activity.id = $1",
    [id]
  );
};

exports.getActivityBySetterID = async (id) => {
  return db.query(
    "SELECT activity.*, users.photo, users.name, users.email, users.phone FROM activity INNER JOIN users ON activity.setterid = users.id WHERE activity.id = $1",
    [id]
  );
};

exports.updateStatus = async (status, id) => {
    return db.query("UPDATE activity SET status = $1 WHERE id=$2", [
      status,
      id,
    ]);
}