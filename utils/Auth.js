const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");

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

/**
 * @DESC To login the user (SUPER_ADMIN, ADMIN, USER)
 */

const loginAuth = async (userCredentials, role, res) => {
  let { username, password } = userCredentials;

  // Check if the username is in the DB
  const loggedInUser = await User.findOne({ username });
  if (!loggedInUser) {
    return res.status(404).json({
      success: false,
      message: `User not found!`,
    });
  }

  // Check the role
  if (loggedInUser.role !== role) {
    return res.status(403).json({
      success: false,
      message: `Make sure you're logging in from the right portal.`,
    });
  }

  // Check for the password
  let isPasswordMatch = await bcrypt.compare(password, loggedInUser.password);
  if (isPasswordMatch) {
    // Sign in the token and issue it to the user
    let token = jwt.sign(
      {
        user_id: loggedInUser._id,
        username: loggedInUser.username,
        email: loggedInUser.email,
        role: loggedInUser.role,
      },
      SECRET,
      {
        expiresIn: "7 days",
      }
    );

    let result = {
      username: loggedInUser.username,
      email: loggedInUser.email,
      token: `Bearer #{token}`,
      expiresIn: 168,
    };

    return res.status(200).json({
      ...result,
      success: true,
      message: `Logged in successfully!`,
    });
  } else {
    return res.status(403).json({
      success: false,
      message: `Invalid username or/and password`,
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

module.exports = { registrationAuth, loginAuth };
