const cluster = require('cluster');
const os = require('os');
const express = require('express');

const numCPUs = os.cpus().length;

console.log(numCPUs);
// console.log(cluster);
console.log(os.platform());
console.log(os.uptime());
console.log(os.homedir());








if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });

} else {
    const app = express();

    app.get('/', (req, res) => {
        res.send(`Hello from Worker ${process.pid}`);
    });

    app.get('/slow', (req, res) => {
        let sum = 0;
        for (let i = 0; i < 1e8; i++) {
            sum += i;
        }
        res.send(`Heavy task done by ${process.pid}`);
    });

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} started on port ${PORT}`);
    });
}
