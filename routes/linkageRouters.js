const express = require("express");
const router = express.Router();
const linkageController = require("../controllers/linkageControllers.js");
const passport = require("passport");
require("../config/passport")(passport); 
const jwt = require("jsonwebtoken");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") +
        file.fieldname +
        file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  //reject File that are not png, jpeg
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("invalid image type"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.get("/testing/addLinkages", linkageController.testingAddLinkages);

router.post(
  "/:linkageID/change",
  passport.authenticate("jwt", { session: false }), upload.single("linkageImage"),
  (req, res) => linkageController.changeLinkage(req, res)
);

router.post(
  "/:linkageID/remove",
  passport.authenticate("jwt", { session: false }),
  (req, res) => linkageController.deleteLinkage(req, res)
);

router.post("/", passport.authenticate("jwt", { session: false }), upload.single("linkageImage"), (req, res) =>
  linkageController.addLinkage(req, res)
);

router.get("/", passport.authenticate("jwt", { session: false }), (req, res) =>
  linkageController.getAllLinkage(req, res)
);

router.get("/event", passport.authenticate("jwt", { session: false }), (req, res) =>
  linkageController.getAllEvent(req, res)
);

module.exports = router;
