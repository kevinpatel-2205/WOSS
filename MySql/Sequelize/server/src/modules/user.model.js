import { Model, DataTypes } from "sequelize";
import database from "../config/database.js";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.INTEGER,
  },
  {
    sequelize: database.sequelize,
    modelName: "User",
    tableName: "Users",
  },
);

export default User;
