import mongoose from "mongoose";

mongoose.set("debug", process.env.NODE_ENV !== "production");

mongoose.connection.on("error", (err) => {
  console.error(err);
});

const URI: string =
  process.env.MONGO_URI ||
  "mongodb+srv://ashutoshbksgold:ashutoshbksgold@cluster0.qejztmo.mongodb.net/";

export async function connectMongoDB() {
  await mongoose.connect(URI, {
    dbName: process.env.MONGO_DB_NAME,
  });

  console.log("MongoDB is connected");
}
