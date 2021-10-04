const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskControllers.js");
const passport = require("passport");
require("../config/passport")(passport); 
const jwt = require("jsonwebtoken");



router.get("/testing/addTask", taskController.testingAddTask);


router.get("/", passport.authenticate("jwt", { session: false }), (req, res) =>
  taskController.getAllTask(req, res)
);



module.exports = router;