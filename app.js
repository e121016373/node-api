const express = require("express");
const connectDB = require("./db/db");
require("dotenv/config");

const app = express();

app.use(express.json());
connectDB();

app.get("/", (req, res, next) => {
  res.send("hello world");
});

app.listen(process.env.PORT, () => `Server running on ${process.env.PORT}`);
