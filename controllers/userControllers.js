const UserModel = require("../models/userModels");
const User = UserModel.User;

//Controller 1
const testingAddUsers = async (req, res) => {
  // var newUser = new User();
  // newUser.firstName = "Vincent";
  // newUser.lastName = "Gestio";
  // newUser.email = "cust1@test.com";
  // newUser.password = "123456";
  // newUser.phoneNo = "12345678";
  // newUser.save();
  // console.log(newUser);
};

//Controller 2
// const getUser = async (req, res) => {
//   try {
//     user = await User.findOne(
//       { _id: req.params.id },
//       { firstName: true, lastName: true }
//     );
//     console.log(req.params);
//     res.json(user);
//   } catch (error) {
//     console.log(error);
//   }
// };

//Get User Name
const getUserProfile = async (req, res) => {
  let userProfile = await User.find({ _id: req.user._id }).lean();
  //   console.log("userProfile = " + userProfile);
  res.json(userProfile);
};

// const testingRegister= async (req,res) => {
//     console.log()
// }

module.exports = {
  testingAddUsers,
  //   getUser,
  getUserProfile,
};
