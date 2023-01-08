const post = require('../model/post');
const user = require('../model/user');
module.exports.home = function(req, res){
  console.log(res.locals, 'in home');


  // user here is your attribute which you are populate

  // populating user attribute of post
  post.find({}).populate('user').populate({
    // populating comments attribute of post
    path: 'comments',
// this is nested populating in which user attribute of commnets value is populated
    populate:{
      path: 'user'

    }

    
  }).exec(function(err,post_all){
    console.log(res.locals.user, 'is returned');
    user.find({}, function(err,friend){
      return  res.render('home', {
        title : 'Home',
        local: res.locals,
        post: post_all,
        friends : friend
      })
    })
   
  })
  
 
}