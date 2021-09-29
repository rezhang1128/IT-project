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

const addLinkage = async (req, res) => {
  var newUser = new Linkage();
  newUser.userId = new ObjectId(`${req.user._id}`);
  newUser.firstName = req.body.firstName;
  newUser.middleName = req.body.middleName;
  newUser.lastName = req.body.lastName;
  newUser.email = req.body.email;
  newUser.address = req.body.address;
  newUser.note = req.body.note;
  newUser.save();
  console.log(newUser);
  res.send(newUser);
};

const changeLinkage = async (req, res) => {
  try {
    await Linkage.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: {
          firstName: req.body.firstName,
          middleName: req.body.middleName,
          lastName: req.body.lastName,
          email: req.body.email,
          address: req.body.address,
          note: req.body.note,
          phoneNumber: req.body.phoneNumber,
        },
      },
      { new: true, omitUndefined: true },
      (error, data) => {
        if (!error) {
          console.log(firstName);
          console.log("change linkage success");
        }
      }
    );
  } catch (error) {}
};

const deleteLinkage = async (req, res) => {
  try {
    await Linkage.findOneAndRemove(
      { _id: req.body._id },
      (error, deletedRecord) => {
        console.log("delete union success");
      }
    );
  } catch (error) {}
};

module.exports = {
  addLinkage,
  changeLinkage,
  deleteLinkage,
  testingAddLinkages,
  getAllLinkage,
};
