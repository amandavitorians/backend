import mongoose from "mongoose";

const connectToDatabase = async () => {
  let connectionSuccess = false;
  const client = await mongoose
    .connect(
      `mongodb+srv://amandavns:<password>@cluster0.xdjwv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
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
