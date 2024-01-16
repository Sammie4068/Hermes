const db = require("../../db");

exports.getUserByEmail = async (email) => {
  return await db.query("SELECT * FROM users WHERE email=$1 AND role='setter'", [email]);
};

exports.getUser = async (email, role) => {
  return await db.query("SELECT * FROM users WHERE email=$1 AND role=$2", [email, role])
}

exports.addUsers = async (user) => {
  return db.query(
    "INSERT INTO users (name,email,password,role,phone) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    [user.name, user.email, user.hashedPassword, user.role, user.phone]
  );
};

exports.getAllUsers = async () => {
  return db.query("SELECT * FROM users");
};

exports.addRunner = async (runner) => {
  return db.query(
    "INSERT INTO users (name, email, gender, photo, password, school, schoolstate, field, yearenrolled, yeargrad, idcard, role, gig, bio, wallet) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *",
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
      runner.role,
      runner.gig,
      runner.bio,
      runner.wallet
    ]
  );
};

exports.getRunnerByEmail = async (email) => {
  return db.query("SELECT * FROM users WHERE email=$1 AND role='runner'", [email]);
};