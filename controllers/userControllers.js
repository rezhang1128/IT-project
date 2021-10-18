const UserModel = require("../models/userModels");
const User = UserModel.User;
const bcrypt = require("bcrypt-nodejs");
const fs = require("fs");

//Get User Name
const getUserProfile = async (req, res) => {
  let userProfile = await User.find({ _id: req.user._id }).lean();
  res.json(userProfile);
};

const changeProfile = async (req, res) => {
  try {
    linkage = await User.findOne({ _id: req.user._id });
    linkage_pic = linkage.profilePic;
    profilePic = "";
    if (req.file) {
      profilePic = req.file.path;
      if (linkage_pic != "") {
        try {
          fs.unlinkSync(linkage_pic);
          //file removed
        } catch (err) {
          console.error(err);
        }
      }
    } else {
      profilePic = linkage_pic;
    }

    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        profilePic: profilePic,
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
