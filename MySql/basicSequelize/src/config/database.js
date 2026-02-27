const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("kevindb", "root", "kevin@123", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
