const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["superadmin", "admin", "user"],
    },
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);
