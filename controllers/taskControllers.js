const TaskModel = require("../models/taskModels");
const Task = TaskModel.Task;
const mongoose = require("mongoose");
let ObjectId = require("mongoose").Types.ObjectId;


const testingAddTask = async (req, res) => {
    var newUser = new Task();
    newUser.name = "Task 2";
    newUser.userId = new ObjectId("61458edafd0bfd2b4098d34f");
    newUser.linkages = [new ObjectId("614cb9ab139ef2925fbd32bd")];
    newUser.save();
    console.log(newUser);
    // res.send(newUser);
  };

module.exports = {
    testingAddTask,
};