const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatar');
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
     avatar:{
      type: String,
     }
},
{
    timestamps:true
  }
 
);

// note user_schema is the name given to the schema
// after adding attribute our task is to interate attributes name and storage and multer
// in storage we will have all details of the file like location and name of file
let storage = multer.diskStorage({
  // linking storage location
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'..' ,AVATAR_PATH));
  },
  //giving a file name
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

// static methods will make publically available


// this line binds multer to storage where data will be stored

// .single is intergrating attribute which is going to have multimedia file but only on photo
schema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
schema.statics.avatarPath = AVATAR_PATH;


const user_schema = mongoose.model('user_schema', schema);

module.exports = user_schema;

