const { registrationAuth, loginAuth } = require("../utils/Auth");

const registerUser = async (req, res) => {
  await registrationAuth(req.body, "user", res);
};

const registerAdmin = async (req, res) => {
  await registrationAuth(req.body, "admin", res);
};

const registerSuperAdmin = async (req, res) => {
  await registrationAuth(req.body, "superadmin", res);
};

const loginUser = async (req, res) => {
  await loginAuth(req.body, "user", res);
};

const loginAdmin = async (req, res) => {
  await loginAuth(req.body, "user", res);
};

const loginSuperadmin = async (req, res) => {
  await loginAuth(req.body, "user", res);
};

module.exports = {
  registerUser,
  registerAdmin,
  registerSuperAdmin,
  loginUser,
  loginAdmin,
  loginSuperadmin,
};
