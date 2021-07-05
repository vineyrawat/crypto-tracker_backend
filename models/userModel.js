const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  data: { type: Date, default: new Date.now() },
});

const User = mongoose.model("user", schema);

module.exports.User = User;
