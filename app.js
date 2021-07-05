const express = require("express");
require("dotenv").config();
const cors = require("cors");
const assets = require("./routes/assets");
const database = require("./services/database");

// Configuration
const app = express();
const PORT = process.env.PORT;

// Database connection
database
  .connect()
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log("Unable to connect to mongodb, " + err.message));

// Middlewares
app.use(express.json());
app.use(cors());

// Route middlewares
app.use("/assets", assets);

// Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
