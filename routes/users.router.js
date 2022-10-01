const express = require("express");
const {
  registerUser,
  registerAdmin,
  registerSuperAdmin,
} = require("../controllers/users.controller");

const usersRouter = express.Router();

usersRouter.route("/register-user").post(registerUser);
usersRouter.route("/register-admin").post(registerAdmin);
usersRouter.route("/register-superadmin").post(registerSuperAdmin);

module.exports = usersRouter;
