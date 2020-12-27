const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

const mongoUri = "mongodb://localhost:27017/OTI";
mongoose.connect(
  mongoUri,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) console.log("Error in DB connection : " + err);
    else console.log("MongoDB Connection succeeded");
  }
);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server Running on port: " + port);
});
