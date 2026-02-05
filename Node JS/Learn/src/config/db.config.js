import mongoose from 'mongoose';

const dbConfig = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
          console.log("Database Connected Successfully");
    } catch (error) {
        console.error("Database Connection Failed:", error);
        process.exit(1);
    } 
};
export default dbConfig;
          