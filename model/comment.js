const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        required:true

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user_schema'
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
})

const comment_12 = mongoose.model('Comment', commentSchema);
module.exports = comment_12;