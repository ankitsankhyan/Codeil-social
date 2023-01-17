const post = require('../model/post');
const user = require('../model/user');
module.exports.home = async function (req, res) {
  console.log(res.locals, 'in home');


  // user here is your attribute which you are populate

  // populating user attribute of post

  try{
   
    var post_all = await post.find({})
    .populate('user')
    .populate({
      // populating comments attribute of post
      path: 'comments',
      // this is nested populating in which user attribute of commnets value is populated
      populate: {
        path: 'user'
      }

    }).sort('-createdAt');
    // console.log(post_all);
    // console.log(post_all.comments);
      // post_all.comments =post_all.comments.reverse();
  // post_all.save();
  post_all.forEach((e) => {

  e.comments = e.comments.reverse();
    
  })
  var friend = await user.find({});
  return res.render('home', {
    title: 'Home',
    local: res.locals,
    post: post_all,
    friends: friend,
   
  })
  }catch(err){
    console.log(err);
  }



}




