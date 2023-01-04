const mongoose = require('mongoose');

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
        }),function(err, comment){
        //  this puts in RAM
         if(err){
            console.log('error in creating a comment');

         }
         console.log('comment created');
            post.comments.push(comment);
        //    this puts in database
            post.save();

            res.redirect('/');
        }
       } 
    })
    
}