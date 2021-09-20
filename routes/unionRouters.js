const express = require("express");
const router = express.Router();
// connect to food controller -- we will use the food controller to update the
// favourites list.
const unionController = require("../controllers/unionControllers.js");

router.get("/testing/addUnion", unionController.testingAddUnion);

module.exports = router;
