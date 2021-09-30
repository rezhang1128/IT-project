const UserModel = require("../models/userModels");
const User = UserModel.User;

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
  // console.log("userProfile = ",JSON.stringify(userProfile));
  res.json(userProfile);
};


module.exports = {
  testingAddUsers,
  //   getUser,
  getUserProfile,
};
