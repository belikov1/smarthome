const { Schema, model } = require("mongoose");

const schema = new Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastName: { type: String },
  firstName: { type: String },
  middleName: { type: String },
  gender: { type: String },
  email: { type: String },
});

module.exports = model("User", schema);
