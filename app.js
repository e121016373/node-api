const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

mongoose.connect(
  "mongodb://localhost:27017/node-api",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to MongoDB")
);

app.get("/", (req, res, next) => {
  res.send("hello world");
});

app.listen(PORT, () => `Server running on ${PORT}`);
