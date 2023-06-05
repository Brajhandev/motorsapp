const { Sequelize } = require("sequelize");

const db = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "lopezs",
  database: "motorsdb",
  port: 5432,
  logging: false,
});

module.exports = { db };
