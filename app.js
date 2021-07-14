const express = require("express");
require("dotenv").config();
const cors = require("cors");
const assets = require("./routes/assets");
const database = require("./services/database");
const auth = require("./routes/auth");
// Configuration
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
// Database connection
database
  .connect()
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log("Unable to connect to mongodb, " + err.message));

// Middlewares

// Route middlewares
app.get("/", (req, res) => {
  res.send(req.body);
});
app.use("/assets", assets);
app.use("/auth", auth);
// Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
