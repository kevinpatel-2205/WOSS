import User from "../models/user.model.js";

export const createUser = async (data) => {
  return await User.create(data);
};

export const getAllUsers = async () => {
  return await User.findAll();
};

export const getUserById = async (id) => {
  return await User.findByPk(id);
};

export const updateUser = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  await user.update(data);
  return user;
};

export const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  await user.destroy();
  return true;
};
