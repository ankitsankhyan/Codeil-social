const Like = require('../model/like');
const Post = require('../model/post');
const Comment = require('../model/comment');


module.exports.toggleLike = async function(req, res){
    try{
//   likes/toggle/?id & type = post
let likeable;
let deleted = false;

if(req.query.type == 'Post'){
    likeable = await Post.findById(req.query.id).populate('likes');
}else{
    likeable = await Comment.findById(req.qurey.id).populate('likes');
}
// check if like exists or not
 let existingLike = await  Like.findOne({
    likeable: req.query.id,
    onModel: req.query.type,
    user:req.user._id
 })

 if(existingLike){
    likeable.likes.pull(existingLike._id);
    likeable.save();
    existingLike.remove();
 }else{
    let newlike = await Like.create({
        user: req.user_id,
        likeable: req.user._id,
        onModel: req.query.type
    });

    likeable.likes.push(like_id);
    likeable.save();
 }

 return req.status(200).json({
    message:'Request Successful',
    data:{
        deleted:deleted
    }
 })
    }catch(err){

    }
}