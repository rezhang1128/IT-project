const LinkageModel = require("../models/linkageModels");
const Linkage = LinkageModel.Linkage;
const Event = LinkageModel.Event;
const mongoose = require("mongoose");
let ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs");

//Controller 1
// the testing controller for creating the first linkage in the database
const testingAddLinkages = async (req, res) => {
  var newUser = new Event();
  newUser.name = "Event 2";
  newUser.userId = new ObjectId("61458edafd0bfd2b4098d34f");
  newUser.linkages = new ObjectId("614cb9ab139ef2925fbd32bd");
  // newUser.firstName = "Alice";
  // newUser.middleName = "InThe";
  // newUser.lastName = "Wonderland";
  // newUser.email = "aliceWonderland@test.com";
  // newUser.address = "address 1, address 2";
  newUser.save();
  console.log(newUser);
  // res.send(newUser);
};

// Get all the linkages of the user
const getAllLinkage = async (req, res) => {
  let linkages = await Linkage.find({ userId: req.user._id }).lean();
  // console.log("linkages = " + linkages);
  res.json(linkages);
};

// Get all the events of the user
const getAllEvent = async (req, res) => {
  let events = await Event.find({ userId: req.user._id }).lean();
  // console.log("linkages = " + linkages);
  res.json(events);
};

const getAllPendingEvent = async (req, res) => {
  let events = await Event.find({
    userId: req.user._id,
    status: "pending",
  }).lean();
  // console.log("linkages = " + linkages);
  res.json(events);
};

// add the linkage into database
const addLinkage = async (req, res) => {
  var newUser = new Linkage();
  newUser.userId = new ObjectId(`${req.user._id}`);
  newUser.firstName = req.body.firstName;
  newUser.middleName = req.body.middleName;
  newUser.lastName = req.body.lastName;
  newUser.email = req.body.email;
  newUser.address = req.body.address;
  newUser.phoneNumber = req.body.phoneNumber;
  newUser.note = req.body.note;
  if (req.file) {
    newUser.profilePic = req.file.path;
  } else {
    newUser.profilePic = "uploads/LinkageLogo.png";
  }
  newUser.save();
  // console.log(newUser);
  res.send(newUser);
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

const changeLinkage = async (req, res) => {
  try {
    linkage = await Linkage.findOne({ _id: req.body._id });
    linkage_pic = linkage.profilePic;
    profilePic = "";
    if (req.file) {
      profilePic = req.file.path;
      if (linkage_pic != "uploads/LinkageLogo.png") {
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

    await Linkage.findOneAndUpdate(
      { _id: req.body._id },
      {
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
        note: req.body.note,
        phoneNumber: req.body.phoneNumber,
        profilePic: profilePic,
      },
      (error, data) => {
        if (!error) {
          // console.log(firstName);
          console.log("change linkage success");
        }
      }
    );
  } catch (error) {}
};

// delete the linkage
const deleteLinkage = async (req, res) => {
  try {
    await Linkage.findOneAndRemove(
      { _id: req.body._id },
      (error, deletedRecord) => {
        console.log("delete linkage success");
      }
    );
    if (req.body.profilePic != "uploads/LinkageLogo.png") {
      try {
        fs.unlinkSync(req.body.profilePic);
        //file removed
      } catch (err) {
        console.error(err);
      }
    }
  } catch (error) {}
};

const addEvent = async (req, res) => {
  var newUser = new Event();
  newUser.userId = new ObjectId(`${req.user._id}`);
  newUser.linkages = req.body.linkages;
  newUser.name = req.body.name;
  newUser.StartTime = req.body.StartTime;
  newUser.EndTime = req.body.EndTime;
  newUser.recurring = req.body.recurring;
  newUser.status = req.body.status;
  try {
    newUser.save();
    res.send(newUser);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  addLinkage,
  changeLinkage,
  deleteLinkage,
  testingAddLinkages,
  getAllLinkage,
  getAllEvent,
  getAllPendingEvent,
  addEvent,
};
