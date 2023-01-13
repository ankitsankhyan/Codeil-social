
const mongoose = require('mongoose');

const passport = require('passport');
const Post = require('../model/post');
const Comment = require('../model/comment');

module.exports.create = async function (req, res) {
    console.log(req.body );
    
    if (!req.isAuthenticated()) {
        res.redirect('/user/sign-in');

    }
  console.log('reached');
    try {
        var post_created = await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        // checking if xml http req is there or not
       
        if(req.xhr){
            // req.flash('success', 'Post created successfully');
            console.log('yooooooooooooooooooooooo');
            return res.status(200).json({
                data:{
                    post:post_created
                    // we try to return a message
                },
                message:'post is created!'

            });
        }
        req.flash('success', 'Post created successfully');
        return res.redirect('back');
    } catch (err) {
        console.log(err);
    }
        
   


}


module.exports.destroy = async function (req, res) {
  try{
    console.log(req.params.id, 'in post destroy function');

   console.log(req.user.id , 'destroy of post controller');
    var post = await Post.findById(req.params.id);
     
    if (post.user == req.user.id) {
        post.remove();

        await Comment.deleteMany({ post: req.params.id });

        if(req.xhr){
          console.log('proceding to delete')
            return res.status(200).json({
              data:{
                post_id : req.params.id
              } ,
              message:'post deleted' 
            });
        }
        req.flash('success', 'Post deleted Successfully');
        return res.redirect('back');

    } else {

        return res.redirect('back');
    }

  }catch(err){
    console.log(err);
  } 

}


