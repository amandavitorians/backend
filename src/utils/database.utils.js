import mongoose from "mongoose";
import { UserService } from "../user/user.service.js";

const connectToDatabase = async () => {
  let connectionSuccess = false;
  const client = await mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bb6ie.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then((result) => {
      console.log("MongoDB connection success");
      connectionSuccess = true;
    })
    .catch((err) => {
      console.log({ err });
      console.log("MongoDB connection error");
    });
  return { client, connectionSuccess };
};

export { connectToDatabase };
