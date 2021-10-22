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
router.get("/pending", passport.authenticate("jwt", { session: false }), (req, res) =>
  taskController.getAllPendingTask(req, res)
);
router.get("/past", passport.authenticate("jwt", { session: false }), (req, res) =>
  taskController.getAllPastTask(req, res)
);
router.post("/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => taskController.addTask(req, res)
);
router.post("/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => taskController.changeTask(req, res)
);
router.post("/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => taskController.deleteTask(req, res)
);

module.exports = router;