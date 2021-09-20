const express = require("express");
const router = express.Router();
// connect to food controller -- we will use the food controller to update the
// favourites list. 
const unionController = require('../controllers/unionControllers.js')
const passport = require('passport');
require('../config/passport')(passport);
const jwt = require('jsonwebtoken');


router.get("/testing/addUnion", unionController.testingAddUnion);


router.get("/",passport.authenticate('jwt', { session: false }), (req,res) => unionController.getAllUnion(req, res));

router.post("/",passport.authenticate('jwt', { session: false }), (req,res) => unionController.AddUnion(req, res));



module.exports = router;