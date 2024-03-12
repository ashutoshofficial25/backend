import { connectMongoDB } from "./db.js";

const boot = async () => {
  await connectMongoDB();
  console.log("booted successfully");
};

export default boot;
