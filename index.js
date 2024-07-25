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
    id: crypto.randomUUID(),
    date: Date.now(),
  };
  //Push new object to activities array
  data.push(newActivity);
  console.log(data);
  res.status(200).send({ status: true, newActivity });
});

// put handler

// app.put("/activities/:id", (req, res) => {
//   const update = req.body.update;
//   const id = req.params.id;

//   const updatedActivity = {
//     ...update,
//     id: id,
//     // activity_type: "flying high",
//     // activity_duration: "20000",
//     date: Date.now(),
//   };
//   // data.push(updatedActivity);
//   res.send(updatedActivity);
//   console.log(updatedActivity);
//   console.log(data);
// });



// listens to the port 3000
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});





















// app.put("/activities/:id", (req, res) => {
//   const update = req.body.update;
//   const id = req.params.id;

//   // To find something in an array, you need an index. This is an index finder.
//   const activityIndex = data.findIndex(activity => activity.id === id);

//     // Merge the existing activity with the update
//     const updatedActivity = {
//       // ...data[activityIndex],
//       ...update,
//       id: id,  // Ensure the id remains the same
//       date: Date.now(),  // Update the date to the current timestamp
//     };
//     // Replace the old activity with the updated one
//     data[activityIndex] = updatedActivity;

//   res.send(updatedActivity);
//   console.log(data);
// });