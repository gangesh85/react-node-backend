import express, { request } from "express";
import cors from "cors";
// import "./db/config.js";
// import User from "./db/user.js";
import { Product, User } from "./db/config.js";
import react from "react";

const host = "localhost";
const port = 3001;
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const user = new User(req.body);
  let response = await user.save();
  response = response.toObject();
  delete response.password;
  res.send(response);
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "User not found!" });
    }
  } else {
    res.send({ result: "User not found!" });
  }
});

app.post("/addproduct", async (req, res) => {
  const product = new Product(req.body);
  const response = await product.save();
  res.send(response);
});

app.get("/users", async (req, res) => {
  const users = await User.find().select("-password");
  res.send(users);
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

app.get("/product/:id", async (req, res) => {
  const response = await Product.findOne({ _id: req.params.id });
  res.send(response);
});

app.get("/search/:key", async (req, res) => {
  const response = await Product.find({
    $or: [{ name: { $regex: req.params.key } }],
    $or: [{ price: { $regex: req.params.key } }],
    $or: [{ category: { $regex: req.params.key } }],
  });
  res.send(response);
});

app.put("/product/:id", async (req, res) => {
  const response = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(response);
});

app.delete("/product/:id", async (req, res) => {
  // const product = await Product.findByIdAndDelete(req.params.id);
  const product = await Product.deleteOne({ _id: req.params.id });
  res.send(product);
});

app.listen(port, () => {
  console.log(`server is listen on http://${host}:${port}`);
});
