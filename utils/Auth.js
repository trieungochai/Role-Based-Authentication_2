const bcrypt = require("bcryptjs");
const User = require("../models/Users.model");

/**
 * @DESC To register the user (SUPER_ADMIN, ADMIN, USER)
 */

const registrationAuth = async (userDetails, role, res) => {
  try {
    // Validate the username
    let usernameNotTaken = await validateUsername(userDetails.username);
    if (usernameNotTaken) {
      return res.status(400).json({
        success: false,
        message: `Username is already taken.`,
      });
    }

    // Validate the email
    let emailNotRegistered = await validateEmail(userDetails.email);
    if (emailNotRegistered) {
      return res.status(400).json({
        success: false,
        message: `Email is already registered.`,
      });
    }

    // Get the hashed password
    const hashedPassword = await bcrypt.hash(userDetails.password, 12);
    // Create a new user
    const newUser = new User({
      ...userDetails,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    return res.status(200).json({
      success: true,
      message: `Registered successfully!`,
    });
  } catch (error) {
    return res.json(500).json({
      success: false,
      message: `Unable to create your account!`,
    });
  }
};

const validateUsername = async (username) => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

module.exports = { registrationAuth };
