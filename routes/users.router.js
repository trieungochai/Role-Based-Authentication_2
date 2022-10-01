const express = require("express");
const {
  registerUser,
  registerAdmin,
  registerSuperAdmin,
  loginUser,
  loginAdmin,
  loginSuperadmin,
} = require("../controllers/users.controller");

const usersRouter = express.Router();

usersRouter.route("/register-user").post(registerUser);
usersRouter.route("/register-admin").post(registerAdmin);
usersRouter.route("/register-superadmin").post(registerSuperAdmin);
usersRouter.route("/login-user").post(loginUser);
usersRouter.route("/login-admin").post(loginAdmin);
usersRouter.route("/login-superadmin").post(loginSuperadmin);

module.exports = usersRouter;
