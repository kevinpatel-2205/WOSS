import userService from "./user.service.js";

class UserController {
  constructor() {
    this.get = this.get.bind(this);
  }
  
  async get(req, res) {
    const users = await userService.getAllUsers();
    res.json(users);
  }

  async create(req, res) {
    try {
      const newUser = await userService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async remove(req, res) {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.status(200).send();
  }
}

export default new UserController();
