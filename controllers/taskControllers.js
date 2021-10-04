const TaskModel = require("../models/taskModels");
const Task = TaskModel.Task;
const mongoose = require("mongoose");
let ObjectId = require("mongoose").Types.ObjectId;


const testingAddTask = async (req, res) => {
    var newUser = new Task();
    newUser.name = "Task 3";
    newUser.userId = new ObjectId("61458edafd0bfd2b4098d34f");
    newUser.linkages = [];
    newUser.save();
    console.log(newUser);
    // res.send(newUser);
  };

const getAllTask = async (req, res) => {
  let tasks = await Task.find({ userId: req.user._id }).lean();
  // console.log("linkages = " + linkages);
  res.json(tasks);
}

module.exports = {
    testingAddTask,
    getAllTask,
};