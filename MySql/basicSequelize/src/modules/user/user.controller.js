const userService = require("./user.service");

exports.getAllUsers = async (req, res) => {
  const users = await userService.findAll();
  res.json(users);
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await userService.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  await userService.delete(req.params.id);
  res.status(204).send();
};
