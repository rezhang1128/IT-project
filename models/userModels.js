const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

// https://stackoverflow.com/questions/4796914/store-images-in-a-mongodb-database
//https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/  the source for image upload, might be usefful later
const UsersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  phoneNo: { type: String, required: true },
  profilePic: {
    type: String,
    required: false,
    default: "uploads/UserLogo.png",
  },
});
// // the method to generate hash password for new customer
UsersSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// // the method to validate the password when customer sign in
UsersSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
const User = mongoose.model("User", UsersSchema);
module.exports = { User };
