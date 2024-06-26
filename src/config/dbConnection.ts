import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    const connectionString = process.env.MONGODB_CONNECTION_STRING;
    if (connectionString) {
      const connect = await mongoose.connect(connectionString);
      console.log(
        "Database Connected !",
        connect.connection.host,
        connect.connection.name
      );
    } else {
      console.log("Cannot find the connection string !");
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
