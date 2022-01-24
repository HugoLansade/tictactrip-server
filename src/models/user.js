const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    // unique : true, //should be unique but for testing it's easier to just give the same email
  },
  emissionDate: {
    type: Date,
  },
  nbJustifiedCharacters: {
    type: Number,
    default: 0,
  },
});

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;
