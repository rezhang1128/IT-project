const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/taskControllers.js");
const passport = require("passport");
require("../config/passport")(passport); 
const jwt = require("jsonwebtoken");



router.get("/testing/addTask", TaskController.testingAddTask);




module.exports = router;