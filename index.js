const express = require('express');

const port = 8000;


const app = express();

app.use('/', require('./routes/index'))
app.use('/profile', require('./routes/user'))

app.listen(port, function(err){
  if(err){
    console.log('could not be started');
  }
   
  console.log(`working fine at the ${port}`);
})