const { registrationAuth } = require("../utils/Auth");

const registerUser = async (req, res) => {
  await registrationAuth(req.body, "user", res);
};

const registerAdmin = async (req, res) => {
  await registrationAuth(req.body, "admin", res);
};

const registerSuperAdmin = async (req, res) => {
  await registrationAuth(req.body, "superadmin", res);
};

module.exports = { registerUser, registerAdmin, registerSuperAdmin };
