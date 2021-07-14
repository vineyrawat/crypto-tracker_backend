const mongoose = require("mongoose");
const database = require("../config/database");

module.exports = {
  connect() {
    return mongoose.connect(database.DB_CONN_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  },
};
