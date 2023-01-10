
const mongoose = require('mongoose');

const passport = require('passport');
const Post = require('../model/post');
const Comment = require('../model/comment');

module.exports.create = async function (req, res) {
    if (!req.isAuthenticated()) {
        res.redirect('/user/sign-in');

    }

    try {
        var post = await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        req.flash('success', 'Post created successfully');
        return res.redirect('back');
    } catch (err) {
        console.log(err);
    }
        
   


}


module.exports.destroy = async function (req, res) {
    console.log(req.params.id, 'in post destroy function');


    var post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
        post.remove();

        await Comment.deleteMany({ post: req.params.id });
        req.flash('success', 'Post deleted Successfully');
        return res.redirect('back');

    } else {

        return res.redirect('back');
    }
}


