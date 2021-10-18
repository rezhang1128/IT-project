const UserModel = require("../models/userModels");
const User = UserModel.User;
const bcrypt = require("bcrypt-nodejs");

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

const changeProfile = async (req, res) => {
  try {

    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
      },
      (error, data) => {
        if (!error) {
          // console.log(firstName);
          console.log("change Profile success");
        }
      }
    );
  } catch (error) {}
};

const changePassword = async (req, res) => {

  generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  };

  try {

    // generateHash = function(password) {
    //   return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    //   };

    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        password: generateHash(req.body.password),
        
      },
      (error, data) => {
        
        if (error) {
          
          console.log(error.message);
        }
        
      }
    );
  } catch (error) {}
};


module.exports = {
  // testingAddUsers,
  //   getUser,
  changeProfile,
  getUserProfile,
  changePassword,
};
