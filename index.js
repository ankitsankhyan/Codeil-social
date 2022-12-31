const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');

const port = 8000;
const app = express();


const db = require('./config/mongoose');


// using express session

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


// using express layouts
 
app.use(expressEjsLayouts);  
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// body parser

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//connect mongo to store cookies permanently

const moongostore = require('connect-mongo').session;

// cookie parser

const cookieParser = require('cookie-parser');
const  Mongoose  = require('mongoose');
const MongoStore = require('connect-mongo');

app.use(cookieParser());




app.use(express.static('./assets'));
app.set('view engine', 'ejs');
app.set('views', './views') // Note we can use ./views instead of path.join function


// order does matter too

// setting details of session

// in cookie corresponding to codeil name corresponding encrypted id of session will be there

app.use(session({
  name:'codeial',

// to do change secret key
// this is the key used to encode message

 secret: "blahsomething",

//  Note any of the key can't be undefined here this thing is deprecated
//  we don't want to save data again if it is stored

resave: "false",

// req not initialised then don't save

 saveUninitialized:false,
 cookie:{
  maxAge:(1000*60*100),

 } ,

// solution given on mongoStore documentation

 store: MongoStore.create({
  mongoUrl: 'mongodb://localhost/test-app', 
  autoRemove: 'disabled'
})

// solution using MongoStore constructor only

//  store : new MongoStore(
//     {
//       // refer the documentation 
//       // we provided the url where data is stored
 
//       mongoUrl: 'mongodb://localhost/codial_development',
//       autoRemove : 'disabled'
//     }, 
//       function(err){
//         console.log(err || 'connect-mongodb setup ok');
//       }
//  )
}));

// more middlewares

app.use(passport.initialize());
app.use(passport.session());

// in each call this function is used to copy the cookie

app.use(passport.setAuthenticatedUser)




// routing

app.use('/home', require('./routes/index'))
app.use('/user', require('./routes/user'))

app.listen(port, function (err) {
  if (err) {
    console.log('could not be started');
  }

  console.log(`working fine at the ${port}`);
})