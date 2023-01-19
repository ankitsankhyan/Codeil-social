const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const customMware = require('./config/middleware')
const port = 8000;
const app = express();
// 

const sassMiddleware = require('node-sass-middleware');
const passportJWT = require('./config/passport-jwt-passport');
app.use(sassMiddleware({
  // will try to encode from scss folder then put inside css folder
  src: './assets/scss',
  dest: './assets/css',
  debug: true,
  outputStyle: 'compact',

  // here link related to this prefix is considered and from location scss file is taken and put into destination

  prefix: '/css'
}))

const google_passport = require('../codial/config/passport-google-oath-strategy');
const db = require('./config/mongoose');


// using express session

const session = require('express-session');

// using passport and strategy

const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
// const passportJWT = require(./config/)

// using express layouts

app.use(expressEjsLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// body parser

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//connect mongo to store cookies permanently


// cookie parser

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const Mongoose = require('mongoose');

//using MongoStore

const MongoStore = require('connect-mongo');




// setting up root folder

app.use(express.static('./assets'));

// this make this path available to browser to use
// note complete path is to be given here otherwise will not work i.e __dirname + '/uploads'
app.use('/uploads', express.static(__dirname + '/uploads'));


// setting up view

app.set('view engine', 'ejs');
app.set('views', './views') // Note we can use ./views instead of path.join function


// order does matter too

// setting details of session

// in cookie corresponding to codeil name corresponding encrypted id of session will be there

app.use(session({
  name: 'codeial',

  // to do change secret key
  // this is the key used to encode message

  secret: "blahsomething",

  //  Note any of the key can't be undefined here this thing is deprecated
  //  we don't want to save data again if it is stored

  resave: "false",

  // req not initialised then don't save

  saveUninitialized: false,
  cookie: {
    maxAge: (1000 * 60 * 100),

  },

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

app.use(passport.setAuthenticatedUser);
// call this flash function otherwise you will be stuck
app.use(flash());

app.use(customMware.setFlash);


// routing

// app.use('/home', require('./routes/index'))
// app.use('/user', require('./routes/user'))

app.use('/', require('./routes'));
// app.use('/user', require('./routes/user'));


app.listen(port, function (err) {
  if (err) {
    console.log('could not be started');
  }

  console.log(`working fine at the ${port}`);
})

