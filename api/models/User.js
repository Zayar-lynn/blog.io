const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: { required: true, type: String, min: 3, unique: true },
  password: { required: true, type: String, min: 6 },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
