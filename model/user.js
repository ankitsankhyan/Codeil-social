const mongoose = require('mongoose');

const schema = new mongoose.schema({
    email:{
        type:string,
        required:true,
        unique:true
      }
      ,

    password:{
        type:string,
        required:true,
        
    }
    ,
    name:{
        type:string,
        required:true
    },
     
},
{
    timestamps:true
  }
 
);

const user_schema = mongoose.model('user_schema', schema);

module.exports = user_schema;

