import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";
import bcrypt from "bcryptjs";
class User extends Model {
  async comparePassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue("username");
        return rawValue ? rawValue.toUpperCase() : null;
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        len: [5, 100],
      },
      set(value) {
        this.setDataValue("email", value.toLowerCase().trim());
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullNameEmail: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.username} ${this.email}`;
      },
      set(value) {
        throw new Error("Do not try to set the fullNameEmail field directly!");
      },
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  },
);

export default User;
