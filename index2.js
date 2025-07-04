import express from "express";
import mongoose from "mongoose";

const app = express();
const host = "localhost";
const port = process.argv[2];

const connectDB = async () => {
  mongoose.connect("mongodb://localhost:27017/photorefit");
  const productSchema = new mongoose.Schema({});
  const product = mongoose.model("product", productSchema);
  const data = await product.find();
  console.log(data);
};
connectDB();

app.get("/", (req, res) => {
  res.send("App is working fine.");
});

app.listen(port, () => {
  console.log(`Server is listening on http://${host}:${port}`);
});
