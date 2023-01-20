const mongoose = require('mongoose');
const newComment = require('../mailers/comment_mailers');
const post = require('../model/post');
const comment = require('../model/comment');

module.exports.create = function (req, res){
    console.log(req.body.post);
    post.findById(req.body.post, function(err, post){
        console.log('finding if post exists or not');
        if(err){
            console.log('error in finding post to which comment is made');
        }
        console.log(post.content);
       if(post){
       
        comment.create({
        
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        },async function(err, comment){
        //  this puts in RAM
         if(err){
            console.log('error in creating a comment');

         }
      comment = await comment.populate('user');
         
      newComment.newComment(comment);
   
         console.log(comment,'created comment');
         console.log('comment created',comment._id);
        //  you can even add whole comment as it is array and we can add anything
            post.comments.push(comment._id);
        //    this puts in database
            post.save();

            res.redirect('/');
        })
       } 
    })
    
}

module.exports.destroy = function(req,res){
    
    comment.findById(req.params.id, function(err, comment_found){
     
        if(comment_found.user == req.user.id){
        
            console.log(comment_found);
              let postid = comment_found.post;
              console.log(postid);
              comment_found.remove();
        // this will pull the comment-id = req.params.id from the array of comments-id i.e delete that id
              post.findByIdAndUpdate( postid,{$pull : {comments : req.params.id}}, function(err,post){
             return  res.redirect('back');
          })
        }else{
            return res.redirect('back');
        }

    })
}