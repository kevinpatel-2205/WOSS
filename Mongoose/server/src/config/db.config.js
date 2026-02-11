import mongoose from "mongoose";

mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB successfully connected.");
});

mongoose.connection.on("error", (err) => {
  console.error(`❌ Connection error: ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB connection lost. Attempting to reconnect...");
});

const dbConfig = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    // console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database Connection Failed:", error);
    process.exit(1);
  }
};
export default dbConfig;
