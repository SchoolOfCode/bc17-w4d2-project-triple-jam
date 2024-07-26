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

// GET handler
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
  res.status(200).send({ status: "success", data });
});

// PUT handler
app.put("/activities/:id", (req, res) => {
  const updateBody = req.body.update;
  const id = req.params.id;
  const index = data.findIndex(activity => activity.id === id);
if (!id) {
  res.status(400).send('Bad request')
  return
}
const updatedActivity = {
    "id":id,
    "activity_submitted": Date.now(),
    ...updateBody
  }

  data[index] = updatedActivity;

  res.status(200).send( {status: "success", data})
});



// // DELETE handler
// app.delete("/activities/:id", (req, res) => {
//   // const deleteBody = req.body.delete
//   const id = req.params.id;
//   const index = data.findIndex(activity => activity.id === id);

//   if (index === -1) {
//     res.status(400).send('Booooo');
//     return
//   } else if (index >= 0) {
//        data.splice(index, 1);
//        }

//   res.status(200).send({ data })
//   console.log(data);
// });

// DELETE handler
app.delete("/activities/:id", (req, res) => {
  // const deleteBody = req.body.delete
  const id = req.params.id;
  const index = data.findIndex(activity => activity.id === id);

       data.splice(index, 1);

  res.status(200).send({ data })
  console.log(data);
});






// app.delete("/api/notes/:id", function(req, res) {
//   console.log("req params", req.params.id)
//   const itemIndex = myArray.findIndex(({ id }) => id === req.params.id);
//   if (itemIndex >= 0) {
//     myArray.splice(itemIndex, 1);
//   }
// });


// listens to the port 3000
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});