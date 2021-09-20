const UnionModel = require("../models/unionModels");
const Union = UnionModel.Union;
const mongoose = require("mongoose");

const testingAddUnion = async (req, res) => {
  var newUser = new User();
  newUser.firstName = "Vincent";
  newUser.lastName = "Gestio";
  newUser.email = "cust1@test.com";
  newUser.password = "123456";
  newUser.phoneNo = "12345678";
  newUser.save();
  console.log(newUser);
  res.send(newUser);
};

//Controller 2
const getAllUnion = async (req, res) => {
  let Unions = await Union.find({ userId: req.user._id }).lean();
  console.log("Unions = " + Unions);
  res.json(Unions);
};

module.exports = {
  testingAddUnion,
  getAllUnion,
};
