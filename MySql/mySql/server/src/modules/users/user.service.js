import User from "./user.model.js";

class UserService {
  async getAllUsers() {
    return await User.findAll();
  }

  async getUserById(id) {
    return await User.findByPk(id);
  }

  async createUser(userData) {
    return await User.create(userData);
  }

  async updateUser(id, updateData) {
    const user = await User.findByPk(id);
    if (user) {
      return await user.update(updateData);
    }
    return null;
  }

  async deleteUser(id) {
    return await User.destroy({ where: { id } });
  }
}

// Exporting instance for singleton behavior
export default new UserService();
