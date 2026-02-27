const User = require("./user.model.js");

class UserService {
  async findAll() {
    return await User.findAll();
  }

  async create(data) {
    return await User.create(data);
  }

  async update(id, data) {
    const user = await User.findByPk(id);
    if (user) return await user.update(data);
    return null;
  }

  async delete(id) {
    return await User.destroy({ where: { id } });
  }
}

module.exports = new UserService();
