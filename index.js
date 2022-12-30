const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');

const port = 8000;
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());
const db = require('./config/mongoose');
app.use(express.static('./assets'));
app.set('view engine', 'ejs');
app.set('views', './views') // Note we can use ./views instead of path.join function
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// using express layouts

app.use(expressEjsLayouts);  
app.use('/', require('./routes/index'))
app.use('/user', require('./routes/user'))

app.listen(port, function (err) {
  if (err) {
    console.log('could not be started');
  }

  console.log(`working fine at the ${port}`);
})