const db = require("../../db");

exports.getRunners = async (gig, state) => {
  return db.query("SELECT * FROM users WHERE gig=$1 AND schoolstate=$2", [gig, state]);
};

exports.gerUsersById = async (id) => {
    return db.query("SELECT *  FROM users WHERE id=$1", [id])
}

exports.updateUser = async (data) => {
    return db.query("UPDATE users SET name = $1, email = $2, phone= $3, gig = $4, bio = $5 WHERE id=$6", 
    [
        data.name,
        data.email,
        data.phone,
        data.task,
        data.bio,
        data.id
    ])
}

exports.changePassword = async (password, id) => {
    return db.query("UPDATE users SET password = $1 WHERE id=$2", [
        password,
        id
    ])
}

exports.changeImage = async (photo, id) => {
   return db.query("UPDATE users SET photo = $1 WHERE id=$2", [
    photo,
    id
   ]) 
}