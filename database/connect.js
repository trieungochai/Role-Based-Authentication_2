const mongoose = require("mongoose");
const { success, error } = require("consola");

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => {
      success({ message: "Database connection is ready...", badge: true });
    })
    .catch((err) => {
      error({
        message: `Unable to connect with Database \n${err}`,
        badge: true,
      });
    });
};

module.exports = connectDB;
