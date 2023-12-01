const db = require("../../db");

exports.getRunners = async (gig, state) => {
  return db.query("SELECT * FROM users WHERE gig=$1 AND schoolstate=$2", [gig, state]);
};