const { Client, ClientBase } = require("pg");
require("dotenv").config();

const client = new Client({
  connectionString: process.env.DB_CONNECTION_STRING,
});
client.connect()
module.exports = client;
