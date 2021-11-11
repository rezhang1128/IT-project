const express = require("express");
const router = express.Router();
const util = require("util");
const userController = require("../controllers/userControllers.js");
require("dotenv").config(); // for JWT password key
const jwt = require("jsonwebtoken");
const { deserializeUser } = require("passport");
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

const passport = require("passport");
require("../config/passport")(passport);

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      // if there were errors during executing the strategy
      // or the user was not found, we display and error
      console.log("user = " + user);
      if (err || !user) {
        const error = new Error("An Error occurred");

        return next(error);
      }
      // otherwise, we use the req.login to store the user details
      // in the session. By setting session to false, we are essentially
      // asking the client to give us the token with each request
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        // We don't want to store sensitive information such as the
        // user password in the token so we pick only the user's email
        const body = { _id: user._id };

        //Sign the JWT token and populate the payload with the user email
        const token = jwt.sign({ body }, process.env.PASSPORT_KEY);

        //Send back the token to the client
        res.status(200); // OK status
        // send the token
        res.cookie("jwt", token, {
          httpOnly: false,
          sameSite: false,
          secure: true,
          domain: "https://gestioitproject.herokuapp.com/",
        });
        return res.json(token);
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});


router.post("/register", async (req, res, next) => {
  passport.authenticate("register", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An Error occurred");

        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = { _id: user._id };
        const token = jwt.sign({ body }, process.env.PASSPORT_KEY);

        //Send back the token to the client
        res.status(200); // OK status
        // send the token
        res.cookie("jwt", token, {
          httpOnly: false,
          sameSite: false,
          secure: true,
          domain: "https://gestioitproject.herokuapp.com/",
        });
        return res.json(token);
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.post(
  "/profile/change",
  passport.authenticate("jwt", { session: false }),
  upload.single("profilePic"),
  (req, res) => userController.changeProfile(req, res)
);

router.post(
  "/password",
  passport.authenticate("jwt", { session: false }),
  (req, res) => userController.changePassword(req, res)
);

//Get User Profile
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => userController.getUserProfile(req, res)
);

module.exports = router;
