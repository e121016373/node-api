const express = require("express");
const connectDB = require("./db/db");
require("dotenv/config");

const itemRoute = require("./routes/item");

const app = express();

app.use(express.json());
connectDB();

app.use("/api/items", itemRoute);

app.listen(process.env.PORT, () => `Server running on ${process.env.PORT}`);
