import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/photorefit");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true },
});
export const User = mongoose.model("user", userSchema);

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  category: String,
  userId: String,
});
export const Product = mongoose.model("product", productSchema);
