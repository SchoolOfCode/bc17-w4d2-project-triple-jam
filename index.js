import express from "express";
import helmet from "helmet";
import data from "./activities.json" with { type: "json" }

// const sample = require('./sample.json');

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
  res.status(200).json({"status": true, data})
} catch(error) {
  console.error(error);
  res.status(400).send('Failed to fetch data')
}

})

let newactivity = {
  "id": "54321234",
  "date": Date.now(),
  "activity_type": "run",
  "activity_duration": "30"
}

app.post("/activities", (req, res) =>{
  try{ const addActive = (req.body.newactivity);
    res.status(200).json({"success": true, addActive }); 
  }
  catch (error){
    console.error(error);
    res.status(400).send('Failed to fetch data')
  }
})


// listens to the port 3000
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});