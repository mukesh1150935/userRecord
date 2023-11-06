const mongoose = require('mongoose');
const config = require("../config");

const connect = () => {
  mongoose
    .connect(config.mongoURI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};

module.exports = connect;
