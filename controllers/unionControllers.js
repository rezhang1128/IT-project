const UnionModel = require("../models/unionModels");
const LinkageModel = require("../models/linkageModels");
const Union = UnionModel.Union;
const Linkage = LinkageModel.Linkage;
const mongoose = require("mongoose");
let ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs");

// the testing controller for creating the first union in the database
const testingAddUnion = async (req, res) => {
  var newUser = new Union();
  newUser.userId = new ObjectId("6139e1cd8e40774fd8ac61ba");
  newUser.name = "Alice";
  newUser.linkages = [];
  newUser.save();
  // console.log(newUser);
  res.send(newUser);
};

// add union into database
const AddUnion = async (req, res) => {
  var newUser = new Union();
  console.log("unionImage = ,", req.file);
  newUser.userId = new ObjectId(`${req.user._id}`);
  newUser.name = req.body.name;
  newUser.linkages = [];
  // console.log("profilepic = "+JSON.stringify(req.body));
  if (req.file) {
    newUser.profilePic = req.file.path;
  } else {
    newUser.profilePic = "uploads/UnionLogo.png";
  }
  newUser.save();
  // console.log("newUser = ",newUser);
  res.send(newUser);
};

//get all the union and linkages of the users
const getAllUnion = async (req, res) => {
  await Union.aggregate([
    { $match: { userId: req.user._id } },
    {
      $lookup: {
        from: "linkages",
        localField: "linkages",
        foreignField: "_id",
        as: "linkages_info",
      },
    },
  ]).then((data) => {
    // console.log("Unions = " + JSON.stringify(data));
    res.json(data);
  });
};

// update union information
const changeUnion = async (req, res) => {
  try {
    await Union.findOneAndUpdate(
      { _id: req.body._id },
      { name: req.body.name, linkages: req.body.linkages },
      (error, data) => {
        if (!error) {
          // console.log("change union success");
        }
      }
    );
  } catch (error) {}
};

// delete a union
const deleteUnion = async (req, res) => {
  try {
    // console.log("req.body.profilePic = " + req.body.profilePic);
    await Union.findOneAndRemove(
      { _id: req.body._id },
      (error, deletedRecord) => {
        console.log("delete union success");
      }
    );
    if (req.body.profilePic != "uploads/UnionLogo.png") {
      try {
        fs.unlinkSync(req.body.profilePic);
        //file removed
      } catch (err) {
        console.error(err);
      }
    }
  } catch (error) {}
};

module.exports = {
  changeUnion,
  deleteUnion,
  testingAddUnion,
  AddUnion,
  getAllUnion,
};
