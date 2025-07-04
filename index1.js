import express from "express";

const app = express();
const host = "localhost";
const port = process.argv[2];

app.get("/", (req, res) => {
  res.send("App is working fine.");
});

app.listen(port, () => {
  console.log(`Server is listening on http://${host}:${port}`);
});
