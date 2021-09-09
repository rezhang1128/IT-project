// Express stuff
const express = require('express')
const app = express()

// YOU NEED TO INSTALL CORS: npm install cors
const cors = require('cors')

app.use(express.urlencoded({ extended: true })) // replaces body-parser
app.use(express.static('public'))	// define where static assets live

app.use(cors())

app.get('/', (req,res) => {
    res.send("Hey");
})


require('./models/db.js') 

// Routes
const userRouter = require("./routes/userRouters");
app.use("/user", userRouter);
const linkageRouter = require("./routes/linkageRouters");
app.use("/linkage", linkageRouter);
const unionRouter = require("./routes/unionRouters");
app.use("/union", unionRouter);



app.get('/hello', (req,res) => {
    
    res.send("Hello");

})


app.all('*', (req, res) => {  // 'default' route to catch user errors
	//res.status(404).render('error', {errorCode: '404', message: 'That route is invalid.'})
	res.send('error')
})


// start server and listen for HTTP requests
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}!`)
  })
  