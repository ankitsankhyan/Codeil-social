const mongoose = require('mongoose');


const likeSchema = new mongoose.Schema({
    user:{
        
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    likable:{
        type: mongoose.Schemal.Types.ObjectId,
        refPath: 'onModel',
    },
  onModel :{
    type:String,
    required:true,
    enum: ['Post', 'Comment']
  }

},{
    timestamps:true
}
);

const Like = mongoose.model('like',likeSchema);
module.exports = Like;