const cors = require("cors");
const express = require("express");
const { DB, PORT } = require("./config");
const connectDB = require("./database/connect");
const { success, error } = require("consola");
const usersRouter = require("./routes/users.router");

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// User Router Middleware
app.use("api/v1/users", usersRouter);

const start = async () => {
  try {
    await connectDB(DB);
    app.listen(PORT, () => {
      success({ message: `Server started on port ${PORT}`, badge: true });
    });
  } catch (err) {
    error({
      message: err.message,
      badge: true,
    });
  }
};

start();
