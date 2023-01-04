
const mongoose = require('mongoose');


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
           }]},
    {
        timestamps:true
    });

    const  Post = mongoose.model('Post', postSchema);
    module.exports = Post;