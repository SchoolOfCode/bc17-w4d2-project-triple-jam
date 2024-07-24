import express from "express";
import helmet from "helmet";
import data from "./activities.js";

const app = express();
const PORT = 3000;

// Use Helmet!
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/activities", (req, res) => {
  try {
    res.status(200).json({ status: true, data });
  } catch (error) {
    console.error(error);
    res.status(400).send("Failed to fetch data");
  }
});

app.post("/activities", (req, res) => {
  const activity = req.body.newActivity;
  // If no body is provided send response code 400
  if (!activity) {
    res.status(400).send("No data");
  }
  //Creating new object and adding 2 new properties
  const newActivity = {
    ...activity,
    id: "54321234",
    date: Date.now(),
  };

  res.status(200).send({ status: true, newActivity });
});

// listens to the port 3000
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
