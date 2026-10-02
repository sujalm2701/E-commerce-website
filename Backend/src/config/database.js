import mongoose from "mongoose";
import config from "./config";
const connectDB = () => {
  mongoose
    .connect(config.MONGO_URI)
    .then(() => {
      console.log("Connecte to mongodb");
    })
    .catch((err) => {
      console.log(`Not connected to mongodb ${err}`);
    });
};
export default connectDB;
