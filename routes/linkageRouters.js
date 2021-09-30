const express = require("express");
const router = express.Router();

const linkageController = require("../controllers/linkageControllers.js");
const passport = require("passport");
require("../config/passport")(passport); 
const jwt = require("jsonwebtoken");

router.get("/testing/addLinkages", linkageController.testingAddLinkages);

router.post(
  "/:linkageID/change",
  passport.authenticate("jwt", { session: false }),
  (req, res) => linkageController.changeLinkage(req, res)
);

router.post(
  "/:linkageID/remove",
  passport.authenticate("jwt", { session: false }),
  (req, res) => linkageController.deleteLinkage(req, res)
);

router.post("/", passport.authenticate("jwt", { session: false }), (req, res) =>
  linkageController.addLinkage(req, res)
);

router.get("/", passport.authenticate("jwt", { session: false }), (req, res) =>
  linkageController.getAllLinkage(req, res)
);

module.exports = router;
