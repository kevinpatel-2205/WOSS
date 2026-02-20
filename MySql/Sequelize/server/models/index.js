import Sequelize from "sequelize";
import configFile from "../config/config.json" assert { type: "json" };
import userModel from "./user.js";

const config = configFile["development"];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

const User = userModel(sequelize, Sequelize.DataTypes);

export { sequelize, Sequelize, User };
