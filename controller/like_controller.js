const Like = require('../model/like');
const Post = require('../model/post');
const Comment = require('../model/comment');
var mongoose = require('mongoose'); 


module.exports.toggleLike = async function(req, res){
    try{
//   likes/toggle/?id & type = post
let likeable;
let deleted = false;




// checking for type

if(req.query.type == 'Post'){
    likeable = await Post.findById(req.query.id).populate('likes');
    console.log(likeable);
}else{
    likeable = await Comment.findById(req.query.id).populate('likes');
}
// check if like exists or not

 let existingLike = await  Like.findOne({
    likeable: req.query.id,
    onModel: req.query.type,
    user:req.user._id
 })

// exist Liking

 if(existingLike){

    // delete the like from array of likes

    likeable.likes.pull(existingLike._id);
    likeable.save();
   
   
    //  removing that like

    existingLike.remove();

 }else{
  

    let newlike = await Like.create({
        user: req.user._id,
        likeable: req.query.id,
        onModel: req.query.type
    });
    
    likeable.likes.push(newlike._id);
    likeable.save();
 }

 if(req.xhr){
    return req.status(200).json({
        message:'Request Successful',
        data:{
            deleted:deleted
        }
     })
 }
 
    }catch(err){
      console.log('err in likes',  err);
    }
 console.log('created');
    return res.redirect('back');

}