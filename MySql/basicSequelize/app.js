const express = require("express");
const sequelize = require("./src/config/database");
const userRoutes = require("./src/modules/user/user.routes");

const app = express();
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

const PORT = 3000;

// Sync Database and Start Server
sequelize.sync().then(() => {
  console.log("Database Synced");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
