import express, { request } from "express";
import cors from "cors";
import { Product, User } from "./db/config.js";
import jwt from "jsonwebtoken";

const app = express();
const host = "localhost";
const port = 3001;
const jwtKey = "Private_Key";

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const user = new User(req.body);
  let response = await user.save();
  response = response.toObject();
  delete response.password;
  jwt.sign({ response }, jwtKey, { expiresIn: "1h" }, (err, token) => {
    res.send({ user: response, auth: token });
  });
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let response = await User.findOne(req.body).select("-password");
    if (response) {
      jwt.sign({ response }, jwtKey, { expiresIn: "1h" }, (err, token) => {
        res.send({ user: response, auth: token });
      });
    } else {
      res.send({ result: "User not found!" });
    }
  } else {
    res.send({ result: "User not found!" });
  }
});

app.post("/addproduct", verifyToken, async (req, res) => {
  const product = new Product(req.body);
  const response = await product.save();
  res.send(response);
});

app.get("/users", verifyToken, async (req, res) => {
  const users = await User.find().select("-password");
  res.send(users);
});

app.get("/products", verifyToken, async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

app.get("/product/:id", verifyToken, async (req, res) => {
  const response = await Product.findOne({ _id: req.params.id });
  res.send(response);
});

app.get("/search/:key", verifyToken, async (req, res) => {
  const response = await Product.find({
    $or: [
      { name: { $regex: req.params.key, $options: "i" } },
      { price: { $regex: req.params.key, $options: "i" } },
      { category: { $regex: req.params.key, $options: "i" } },
    ],
  });
  res.send(response);
});

app.put("/product/:id", verifyToken, async (req, res) => {
  const response = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(response);
});

app.delete("/product/:id", verifyToken, async (req, res) => {
  // const product = await Product.findByIdAndDelete(req.params.id);
  const product = await Product.deleteOne({ _id: req.params.id });
  res.send(product);
});

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, jwtKey, (err, valid) => {
      if (valid) {
        next();
      } else {
        res.send({ response: "Invalid Access" });
      }
    });
  } else {
    res.send({ response: "Access denied" });
  }
}


app.listen(port, () => {
  console.log(`server is listen on http://${host}:${port}`);
});
