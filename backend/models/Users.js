const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const UsersSchema = new Schema({
    name: {
      type: String,
      required: true,
      minlength:2,
      maxlength: 50
    },
    username:{
      type:String,
      required: true,
      minlength:6,
      maxlength: 30,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength:8,
      maxlength: 100
    },
})
//validation methods
UsersSchema.statics.isUsernameAvailable = async function(username){
  try {
    const userExists =  await this.findOne({username}, username)
    if (userExists) return false
    else return true
  } catch (error) {
    console.log("username already exists", error)
    return false
  }
}

const Users = mongoose.model('Users', UsersSchema)
module.exports = {Users, UsersSchema}