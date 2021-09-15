const express = require("express");
const router = express.Router();
// connect to food controller -- we will use the food controller to update the
// favourites list. 
const linkageController = require('../controllers/linkageControllers.js')
const passport = require('passport');
require('../config/passport')(passport);
const jwt = require('jsonwebtoken');


router.get("/testing/addLinkages", linkageController.testingAddLinkages);


router.get("/",passport.authenticate('jwt', { session: false }), (req,res) => linkageController.getAllLinkage(req, res));








module.exports = router;