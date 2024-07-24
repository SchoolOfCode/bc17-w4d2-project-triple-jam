import express from "express";
import helmet from "helmet";
import data from "./activities.json" with { type: "json" }

// const sample = require('./sample.json');

const app = express();
const PORT = 3000;

// Use Helmet!
app.use(helmet());

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



app.post("/activities", async (req, res) =>{
  try{
   const newObject = await req.body;
   data.push(newObject);
   res.status(200).json(data);
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