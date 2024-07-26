import express from "express";
import helmet from "helmet";
import data from "./activities.js";
import crypto from "crypto";
console.log(crypto.randomUUID());

const app = express();
const PORT = 3000;

// Use Helmet!
app.use(helmet());
app.use(express.json());

//Check if server sends a response
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// GET activities array
app.get("/activities", (req, res) => {
  try {
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.error(error);
    res.status(400).send("Failed to fetch data");
  }
});

// POST handler
app.post("/activities", (req, res) => {
  //Grab new activity from body request
  const activity = req.body.newActivity;
  // If no body is provided send response code 400
  if (!activity) {
    res.status(400).send("Please provide object body");
  }
  //Creating new object and adding 2 new properties
  const newActivity = {
    id: crypto.randomUUID(),
    activity_submitted: Date.now(),
    ...activity,
  };
  //Push new object to activities array
  data.push(newActivity);
  res.status(200).send({ status: "success", data });
});

// PUT handler
app.put("/activities/:id", (req, res) => {
  const updateBody = req.body.update;
  const id = req.params.id;
  const index = data.findIndex((activity) => activity.id === id);
  // -1 is a value returned from findIndex method
  if (index === -1) {
    res.status(400).send("ID does not exist");
    return;
  }
  //Create updated object
  const updatedActivity = {
    id: id,
    activity_submitted: Date.now(),
    ...updateBody,
  };
  //Replacing object in array
  data[index] = updatedActivity;

  res.status(200).send({ status: "success", data });
});

// DELETE handler
app.delete("/activities/:id", (req, res) => {
  // const deleteBody = req.body.delete
  const id = req.params.id;
  const index = data.findIndex((activity) => activity.id === id);
  // -1 is a value returned from findIndex method
  if (index === -1) {
    res.status(400).send("Invalid ID");
  }
  data.splice(index, 1);
  res.status(200).send({ data });
});

// listens to the port 3000
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});
