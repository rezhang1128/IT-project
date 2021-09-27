const LinkageModel = require("../models/linkageModels");
const Linkage = LinkageModel.Linkage;
const mongoose = require("mongoose");
let ObjectId = require("mongoose").Types.ObjectId;

//Controller 1
const testingAddLinkages = async (req, res) => {
  var newUser = new Linkage();
  newUser.userId = new ObjectId("6139e1cd8e40774fd8ac61ba");
  newUser.firstName = "Alice";
  newUser.middleName = "InThe";
  newUser.lastName = "Wonderland";
  newUser.email = "aliceWonderland@test.com";
  newUser.address = "address 1, address 2";
  newUser.save();
  console.log(newUser);
  res.send(newUser);
};
//Controller 2
const getAllLinkage = async (req, res) => {
  let linkages = await Linkage.find({ userId: req.user._id }).lean();
  console.log("linkages = " + linkages);
  res.json(linkages);
};

module.exports = {
  testingAddLinkages,
  getAllLinkage,
};
