
const mongoose = require('mongoose');

const passport = require('passport');
const Post = require('../model/post');
const Comment = require('../model/comment');

module.exports.create = function (req, res) {
    if (!req.isAuthenticated()) {
        res.redirect('/user/sign-in');
    }
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function (err, post) {
        if (err) {
            console.log('err in creating a post');
            return;
        }

        return res.redirect('back');
    });

}

// module.exports.destroy = function (req, res) {

//     // var id = new mongoose.Types.ObjectId(req.params.id);

//     Post.findById(req.params.id, function (err, post_found) {



//         // req.user.id is string and req.user._id is object


//             if (post_found.user == req.user.id) {
//                 post_found.remove();
//                 // in param post id will be sent and here we are checking if that id is present in comment then that comment will be
//                 Comment.deleteMany({ post: req.params.id }, function (err) {
//                     if (err) {
//                         console.log('error in finding comments related to posts');
//                         return res.redirect('back');
//                     }
//                     return res.redirect('back');
//                 })
//             } else {
//                 return res.redirect('back');
//             }



//     })
// }


module.exports.destroy = function (req, res) {
    console.log(req.params.id, 'in post destroy function');
     
        
    Post.findById(req.params.id, function (err, post) {
        if(err){
            console.log(err);
        }
        console.log(post);

        if (post.user == req.user.id) {
            post.remove();

            Comment.deleteMany({ post: req.params.id }, function (err) {
                return res.redirect('back');
            });
        } else {
            return res.redirect('back');
        }



    });
}


