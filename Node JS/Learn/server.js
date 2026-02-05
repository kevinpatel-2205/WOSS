const express = require("express");

const PORT = 3000;
const app = express();
app.get(["/","/home","/kevin","/patel"], (req, res) => {
  res.send(`Hello from ${req.path} endpoint.....`);
});

app.get("/api", (req, res) => {
  res.send(`Hello from ${req.path} endpoint`);
});

app.use((req, res) => {
  res.send(`Hello from default ${req.path} endpoint`);
});



app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
