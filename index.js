import express from "express";
import helmet from "helmet";
import data from "./activities.js";

// const sample = require('./sample.json');

const app = express();
const PORT = 3000;

// Use Helmet!
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.get();

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
