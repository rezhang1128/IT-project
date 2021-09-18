const express = require("express");
const router = express.Router();
const util = require('util');
const userController = require('../controllers/userControllers.js')
require('dotenv').config()    // for JWT password key
const jwt = require('jsonwebtoken');
const { deserializeUser } = require('passport');

const passport = require('passport');
require('../config/passport')(passport);

router.get("/testing/addUser", userController.testingAddUsers);
// router.post("register", (req,res) => userController.testingRegister(req,res));

router.get("/:id", (req,res) => userController.getUser(req,res));

// POST login -- we are using JWT
// POST --> http://localhost:5000/user/login
router.post('/login', async (req, res, next) => {
    // passport.authenticate is provided by passport to authenticate
    // users
    // 'login' is the name of strategy that we have defined in the
    // passport.js file in the config folder
    // user and info should be passed by the 'login' strategy
    // to passport.authenticate -- see the code for the strategy
    passport.authenticate('login', async (err, user, info) => {
        try {
            // if there were errors during executing the strategy
            // or the user was not found, we display and error
            console.log("user = "+ user)
            if(err ||!user){
                const error = new Error('An Error occurred')

                return next(error);
            }
            
            // otherwise, we use the req.login to store the user details
            // in the session. By setting session to false, we are essentially
            // asking the client to give us the token with each request
            req.login(user, { session : false }, async (error) => {
                
                if( error ) return next(error)

                // We don't want to store sensitive information such as the
                // user password in the token so we pick only the user's email 
                const body = { _id : user._id };

                //Sign the JWT token and populate the payload with the user email 
                const token = jwt.sign({ body },process.env.PASSPORT_KEY);
                
                //Send back the token to the client
                res.status(200); // OK status
                // send the token 
                res.cookie('jwt',token, { httpOnly: false, sameSite: false, secure: true, domain:"http://localhost:5000"});
                return res.json(token);
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
    
});


// router.post('/register', async (req, res) => {
//     console.log(`post/${util.inspect(req.body,false,null)}`);

// })
router.post('/register', async (req, res, next) => {
    // passport.authenticate is provided by passport to authenticate
    // users
    // 'login' is the name of strategy that we have defined in the
    // passport.js file in the config folder
    // user and info should be passed by the 'login' strategy
    // to passport.authenticate -- see the code for the strategy
    passport.authenticate('register', async (err, user, info) => {
        try {
            // if there were errors during executing the strategy
            // or the user was not found, we display and error
            // console.log("user = "+ user)
            if(err ||!user){
                const error = new Error('An Error occurred')

                return next(error);
            }
            
            // otherwise, we use the req.login to store the user details
            // in the session. By setting session to false, we are essentially
            // asking the client to give us the token with each request
            req.login(user, { session : false }, async (error) => {
                
                if( error ) return next(error)

                // We don't want to store sensitive information such as the
                // user password in the token so we pick only the user's email 
                const body = { _id : user._id };

                //Sign the JWT token and populate the payload with the user email 
                const token = jwt.sign({ body },process.env.PASSPORT_KEY);
                
                //Send back the token to the client
                res.status(200); // OK status
                // send the token 
                res.cookie('jwt',token, { httpOnly: false, sameSite: false, secure: true, domain:"http://localhost:5000"});
                return res.json(token);
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
    
});



module.exports = router;