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
const getAllPendingTask = async (req, res) => {
  let tasks = await Task.find({ userId: req.user._id, status: "pending" }).lean();
  // console.log("linkages = " + linkages);
  res.json(tasks);
}

const getAllPastTask = async (req, res) => {
  let tasks = await Task.find({ userId: req.user._id, status: {$ne:"pending"} }).lean();
  // console.log("linkages = " + linkages);
  res.json(tasks);
}

const addTask = async (req, res) => {
  var newUser = new Task();
  newUser.userId = new ObjectId(`${req.user._id}`);
  newUser.name = req.body.name;
  newUser.note = req.body.note;
  newUser.StartTime = req.body.StartTime;
  newUser.EndTime = req.body.EndTime;
  newUser.recurring = req.body.recurring;
  newUser.status = req.body.status;
  try{
  newUser.save();
  res.send(newUser);
  }catch(err){
    console.log(err.message);
  }
  
};

const changeTask = async (req, res) => {
  try {
    await Task.findOneAndUpdate(
      { _id: req.body._id },
      { name: req.body.name, note: req.body.note, StartTime: req.body.StartTime, EndTime: req.body.EndTime, status: req.body.status,recurring:req.body.recurring},
      (error, data) => {
        if (!error) {
          // console.log("change union success");
        }
        else{
          console.log("edittask 1 error = ",error)
        }
      }
    );
  } catch (error) {
    console.log("edittask error = ",error)
  }
};

const deleteTask = async (req, res) => {
  try {
    await Task.findOneAndRemove(
      { _id: req.body._id },
      (error, deletedRecord) => {
        console.log("delete union success");
      }
    );
  } catch (error) {}
};
module.exports = {
    deleteTask,
    changeTask,
    addTask,
    testingAddTask,
    getAllPastTask,
    getAllTask,
    getAllPendingTask,
};