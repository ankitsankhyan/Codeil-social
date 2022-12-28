const express = require('express');

const port = 2005;


const app = express();


app.listen(port, function(err){
  if(err){
    console.log('could not be started');
  }

  console.log(`working fine at the ${port}`);
})