const UnionModel = require("../models/unionModels");
const LinkageModel = require("../models/linkageModels");
const Union = UnionModel.Union;
const Linkage = LinkageModel.Linkage;
const mongoose = require("mongoose");
let ObjectId = require("mongoose").Types.ObjectId;

const testingAddUnion = async (req, res) => {
  var newUser = new Union();
  newUser.userId = new ObjectId("6139e1cd8e40774fd8ac61ba");
  newUser.name = "Alice";
  newUser.linkages = [];
  newUser.save();
  console.log(newUser);
  res.send(newUser);
};

const AddUnion = async (req, res) => {
  // console.log("req.body = ",req.body);
  // console.log("req.file = ",req.file);

  var newUser = new Union();
  newUser.userId = new ObjectId(`${req.user._id}`);
  newUser.name = req.body.name;
  newUser.linkages = [];
  // console.log("profilepic = "+JSON.stringify(req.body));
  if (req.file) {
    newUser.profilePic = req.file.path;
  }
  newUser.save();
  // console.log("newUser = ",newUser);
  res.send(newUser);
};

//Controller 2
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
    console.log("Unions = " + JSON.stringify(data));
    res.json(data);
  });
};

const changeUnion = async (req, res) => {
  try {
    await Union.findOneAndUpdate(
      { _id: req.body._id },
      { name: req.body.name, linkages: req.body.linkages },
      (error, data) => {
        if (!error) {
          console.log("change union success");
        }
      }
    );
  } catch (error) {}
};

const deleteUnion = async (req, res) => {
  try {
    await Union.findOneAndRemove(
      { _id: req.body._id },
      (error, deletedRecord) => {
        console.log("delete union success");
      }
    );
  } catch (error) {}
};

module.exports = {
  changeUnion,
  deleteUnion,
  testingAddUnion,
  AddUnion,
  getAllUnion,
};
