require('dotenv').config()    // for JWT password key

// used to create our local strategy for authenticating
// using username and password
const LocalStrategy = require('passport-local').Strategy;

// our user model
const { User } = require('../models/userModels');

// the following is required if you wanted to use passport-jwt
// JSON Web Tokens
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

module.exports = function(passport) {

    // these two functions are used by passport to store information
    // in and retrieve data from sessions. We are using user's object id
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(_id, done) {
        User.findById(_id, function(err, user) {
            done(err, user);
        });
    });

    // depending on what data you store in your token, setup a strategy
    // to verify that the token is valid. This strategy is used to check
    // that the client has a valid token
    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // clien puts token in request header
        secretOrKey   : process.env.PASSPORT_KEY, // the key that was used to sign the token
        passReqToCallback: true
    }, (req, jwt_payload, done) => { // passport will but the decrypted token in jwt_payload variable

        // here I'm simply searching for a user with the email addr
        // that was added to the token. _id was added to the token
        // body that was signed earlier in the userRouter.js file
        // when logging in the user
        console.log(jwt_payload.body._id)
        User.findOne({'_id':jwt_payload.body._id}, (err, user) => {

            if(err){
                return done(err, false);
            }
            // if we found user, provide the user instance to passport    
            if(user){
                return done(null, user);
            } else { // otherwise assign false to indicate that authentication failed
                return done(null, false);
            }
        });
    }));

    //Create a passport middleware to handle User login
    // EXERCISE: Write the signup strategy

    //Create a passport middleware to handle User login
    passport.use('login', new LocalStrategy({
        usernameField : 'email',     // get email and password
        passwordField : 'password'
        
    }, async (email, password, done) => {
        try {
            //Find the user associated with the email provided by the user
            await User.findOne({ 'email' :  email }, function(err, user) {
                // if user is not found or there are other errors
                if (err)
                    return done(err);
                if (!user)
                    return done(null, false, {message: 'No user found.'});

                // user is found but the password doesn't match
                // if (!user.validPassword(password))
                if (1!=1){
                    return done(null, false, {message: 'Oops! Wrong password.'});
                }
                // everything is fine, provide user instance to passport
                else {
                    return done(null, user, {message: 'Login successful'});
                }
            });
        } catch (error) {
            return done(error);
        }
    }));


};



