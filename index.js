const express = require('express');

const port = 8000;


const app = express();

app.set('view engine', 'ejs');
app.set('views', './views') // Note we can use ./views instead of path.join function

app.use('/', require('./routes/index'))
app.use('/profile', require('./routes/user'))

app.listen(port, function(err){
  if(err){
    console.log('could not be started');
  }
   
  console.log(`working fine at the ${port}`);
})