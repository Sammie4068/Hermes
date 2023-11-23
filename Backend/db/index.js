const { Client, ClientBase } = require("pg");
require("dotenv").config();

const client = new Client({
  user: "okoro" ,//process.env.DB_USER,
  host: "localhost" ,  //process.env.DB_HOST,
  database: "hermes",  //process.env.DB_DATABASE,
  password:  "10839", //process.env.DB_PASSWORD,
  port:  5432, //process.env.DB_PORT,
});
client.connect()
module.exports = client;
