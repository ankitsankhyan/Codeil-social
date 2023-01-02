const post = require('../model/post');
const passport = require('passport');
module.exports.create = function(req, res){
   if(!req.isAuthenticated()){
           res.redirect('/user/sign-in');
   }
post.create({
    content: req.body.content,
    user:req.user._id
},function(err, post){
    if(err){
        console.log('err in creating a post');
        return;
    }

    return res.redirect('back');
});

}