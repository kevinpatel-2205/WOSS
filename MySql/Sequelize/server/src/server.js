import app from "./app.js"
import database from "./config/database.js";

const PORT = 5000;

(async () => {
  await database.connect();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();