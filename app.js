// Express stuff
const express = require('express')
const app = express()
const util = require('util');
const cors = require('cors')


const passport = require('passport');
const flash    = require('connect-flash-plus');
const session      = require('express-session');
const jwt = require('jsonwebtoken');

// we are storing some information in the environment variables
const dotenv = require('dotenv').config()

// configure passport authenticator -- making sure we can access
// the strategies
require('./config/passport')(passport);

// IMPORTANT to enable CORS -- see  Week 7 lectures
app.use(cors({
credentials: true, // from Express docs: adds the Access-Control-Allow-Credentials CORS header
origin: ["https://gestio-it-project-comp30022.herokuapp.com/","http://localhost:3000"] 
}));


// setup a session store signing the contents using the secret key
app.use(session({ secret: process.env.PASSPORT_KEY,
resave: true,
saveUninitialized: true
}));

//middleware that's required for passport to operate
app.use(passport.initialize());
// middleware to store user object
app.use(passport.session());
// use flash to store messages
app.use(flash());

app.use(express.json())
app.use(express.urlencoded({ extended: false })) // replaces body-parser
app.use(express.static('public'))	// define where static assets live
app.use('/uploads', express.static('uploads'))

require('./models/db.js') 

app.get('/',passport.authenticate('jwt', { session: false }), (req,res) => {
    // console.log(`post/${util.inspect(req.user,false,null)}`);
    res.send("Hey");
})



// Routes
const userRouter = require("./routes/userRouters");
app.use("/user", userRouter);
const taskRouter = require("./routes/taskRouters");
app.use("/task", taskRouter);
const linkageRouter = require("./routes/linkageRouters");
app.use("/linkage", linkageRouter);
const unionRouter = require("./routes/unionRouters");
app.use("/union", unionRouter);

 

app.all('*', (req, res) => {  // 'default' route to catch user errors
	//res.status(404).render('error', {errorCode: '404', message: 'That route is invalid.'})
	res.send('error')
})


// start server and listen for HTTP requests
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}!`)
  })
  