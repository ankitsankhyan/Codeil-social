const post = require('../model/post');
module.exports.home = function(req, res){
  console.log(res.locals, 'in home');


  // user here is your attribute which you are populate

  
  post.find({}).populate('user').exec(function(err,post_all){
    console.log(post_all);
    return  res.render('home', {
      title : 'Home',
      local: res.locals,
      post: post_all
    })
  })
 
}