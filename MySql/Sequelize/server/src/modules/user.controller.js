import userService from "./user.service.js";

class UserController {
  async create(req, res) {
    const user = await userService.createUser(req.body);
    res.json(user);
  }

  async findAll(req, res) {
    const users = await userService.getAllUsers();
    res.json(users);
  }

  async findOne(req, res) {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  }

  async update(req, res) {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user);
  }

  async delete(req, res) {
    await userService.deleteUser(req.params.id);
    res.json({ message: "User deleted" });
  }
}

export default new UserController();