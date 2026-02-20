import User from "./user.model.js";

class UserService {
  async createUser(data) {
    return await User.create(data);
  }

  async getAllUsers() {
    return await User.findAll();
  }

  async getUserById(id) {
    return await User.findByPk(id);
  }

  async updateUser(id, data) {
    await User.update(data, { where: { id } });
    return this.getUserById(id);
  }

  async deleteUser(id) {
    return await User.destroy({ where: { id } });
  }
}

export default new UserService();