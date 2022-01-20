const mongoose = require ('mongoose');

const UserSchema = new mongoose.Schema({
    token: {
        type:String,
        required: true,
        unique : true,
      },
    email: {
      type:String,
      required: true,
      unique : true,
    },
    emissionDate: {
      type: Date,
    },
    nbJustifiedCharactere :{
        type: Number,
        default : 0,
    }
  }
); 

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;
