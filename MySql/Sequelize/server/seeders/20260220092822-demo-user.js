import { v4 as uuidv4 } from "uuid";

export default {
  up: async (queryInterface, Sequelize) => {
    const numberOfRows = 50;
    const users = [];

    for (let i = 1; i <= numberOfRows; i++) {
      users.push({
        id: uuidv4(),
        name: `User ${i}`,
        email: `user${i}@example.com`,
        age: Math.floor(Math.random() * 10) + 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert("Users", users);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};