import mysql from "mysql";

const connectDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

export default connectDB;
