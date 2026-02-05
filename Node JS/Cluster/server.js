const cluster = require("cluster");
const os = require("os");
const express = require("express");
const { log } = require("console");

const PORT = 3000;
const numCPUs = os.cpus().length;
console.log("Number Of CPU....", numCPUs);

if (cluster.isPrimary) {
  console.log(`Master process ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  const app = express();
  app.get("/", (req, res) => {
    console.log(`Fast route handled by worker ${process.pid}`);
    res.send(`Hello from worker ${process.pid}`);
  });

  app.get("/busy", (req, res) => {
    console.log(`BUSY route handled by worker ${process.pid}`);

    let total = 0;
    for (let i = 0; i < 5e9; i++) {
      total += i;
    }

    res.send(`Busy work done by worker ${process.pid}`);
  });

  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} listening on port ${PORT}`);
  });
}
