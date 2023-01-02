const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique:true
      }
      ,

    password:{
        type:String,
        required:true,
        
    }
    ,
    name:{
        type:String,
        required:true
    },
     
},
{
    timestamps:true
  }
 
);

// note user_schema is the name given to the schema

const user_schemadfdfdfdf = mongoose.model('user_schema', schema);

module.exports = user_schemadfdfdfdf;

