const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database.js");

const User = sequelize.define(
  "User",
  {
    name: { type: DataTypes.UUID, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    salary: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    tableName: "users",
    timestamps: true,
  },
);

module.exports = User;
