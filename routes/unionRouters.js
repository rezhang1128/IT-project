const express = require("express");
const router = express.Router();
// connect to food controller -- we will use the food controller to update the
// favourites list.
const unionController = require("../controllers/unionControllers.js");
const passport = require("passport");
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

require("../config/passport")(passport);
const jwt = require("jsonwebtoken");

router.get("/testing/addUnion", unionController.testingAddUnion);

router.get("/", passport.authenticate("jwt", { session: false }), (req, res) =>
  unionController.getAllUnion(req, res)
);

router.get("/", passport.authenticate("jwt", { session: false }), (req, res) =>
  unionController.getAllUnion(req, res)
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("unionImage"),
  (req, res) => unionController.AddUnion(req, res)
);

router.post(
  "/:unionID/change",
  passport.authenticate("jwt", { session: false }),
  (req, res) => unionController.changeUnion(req, res)
);

router.post(
  "/:unionID/remove",
  passport.authenticate("jwt", { session: false }),
  (req, res) => unionController.deleteUnion(req, res)
);

module.exports = router;
