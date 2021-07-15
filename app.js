const express = require("express");
const connectDB = require("./db/db");
const morgan = require("morgan");
require("dotenv").config();

const itemRoute = require("./routes/item");
const authRoute = require("./routes/auth");

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
connectDB();

app.use("/api/item", itemRoute);
app.use("/api/auth", authRoute);

app.listen(process.env.PORT, () => `Server running on ${process.env.PORT}`);
