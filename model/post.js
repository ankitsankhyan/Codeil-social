
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const Image_path = path.join('/uploads/users/post_images');
const postSchema = new mongoose.Schema({
    content:{
        type : String,
        require:true
    }
,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user_schema'
            },
            // include array of id of comments to fetch them fast
           comments: [{
             type: mongoose.Schema.Types.ObjectId,
             ref: 'Comment'
           }],
        images : {
            type : String
        }
        },
    {
        timestamps:true
    });

   let storage = multer.diskStorage({
    destination: function(req, file,cb){
        cb(null, path.join(__dirname, '..', Image_path ));
    },
    filename : function(req, file, cb){
        const uniqueSuffix = Date.now()+'-'+ Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' +uniqueSuffix);
    }
   })


   postSchema.statics.uploadedImage = multer({storage1: storage}).single('images');
   postSchema.statics.ImagePath = Image_path;

    const  Post = mongoose.model('Post', postSchema);
    module.exports = Post;