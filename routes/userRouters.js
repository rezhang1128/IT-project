const express = require("express");
const router = express.Router();
const userController = require('../controllers/userControllers.js')
 

router.get("/testing/addUser", userController.testingAddUsers);

router.get("/:id", (req,res) => userController.getUser(req,res));





module.exports = router;