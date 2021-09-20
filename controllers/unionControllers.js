const UnionModel = require("../models/unionModels");
const Union = UnionModel.Union;
const mongoose = require("mongoose");
let ObjectId = require("mongoose").Types.ObjectId;

const testingAddUnion = async (req, res) => {
    var newUser = new Union();
    newUser.userId =  new ObjectId("6139e1cd8e40774fd8ac61ba");
    newUser.name = "Alice";
    newUser.linkages = [];
    newUser.save();
    console.log(newUser);
    res.send(newUser);
}

const AddUnion = async (req, res) => {
    var newUser = new Union();
    newUser.userId =  new ObjectId(`${req.user._id}`);
    newUser.name = req.body.name;
    newUser.linkages = [];
    newUser.save();
    console.log(newUser);
    res.send(newUser)

}

const getAllUnion = async (req, res) => {
    let unions = await Union.find({userId: req.user._id}).lean();
    console.log("unions = "+ unions);
    res.json(unions);
}


module.exports = {
    
    testingAddUnion,
    AddUnion,
    getAllUnion
};