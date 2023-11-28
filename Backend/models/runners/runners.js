const db = require("../../db");

exports.addRunner = async (runner) => {
  return db.query(
    "INSERT INTO runners (name, email, gender, photo, password, school, schoolstate, field, yearenrolled, yeargrad, idcard) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
    [
      runner.name,
      runner.email,
      runner.gender,
      runner.photo,
      runner.password,
      runner.school,
      runner.schoolstate,
      runner.field,
      runner.yearenrolled,
      runner.yeargrad,
      runner.idcard,
    ]
  );
};

exports.getRunnerByEmail = async (email) => {
  return db.query("SELECT * FROM runners WHERE email=$1", [email]);
};
