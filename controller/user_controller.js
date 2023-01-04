
// taking user schema in the file (model)
const user = require('../model/user');
const posts = require('../model/post');



module.exports.profile = function(req, res){
   

    // without prepopulate


    // posts.find({user: req.user._id}, function(err, post_user){
    //     if(err){
    //         console.log('error in finding posts');
    //         return;
    //     }
    //  console.log(post_user[0], 'in find')
    //     return res.render('user',{
    //         title: 'Profile ',
    //         user: req.user,
    //         local: res.locals,
    //         post: post_user
    //     });
    // });
   
    //  we will prefetch the data of user from data base whose id is given here

    posts.find({user: req.user._id}).populate('user').exec(function(err,post_user){
        if(err){
                    console.log('error in finding posts');
                    return;
                }
         
                return res.render('user',{
                    title: 'Profile ',
                    user: req.user,
                    local: res.locals,
                    post: post_user
                });
    })
}

module.exports.favarate_sport = function(req, res){
    res.end('<h1> Cricket is my fav game <h1>');
}


module.exports.signup = function(req, res){
    return res.render('sign_up.ejs',{
          title:'sign-up page',
          local: res.locals
    })
}

module.exports.signIn = function(req,res){
    return res.render('sign_in',{
        title: "Codiel| sign-in",
        local: res.locals
    });
}

module.exports.create = function(req, res){
   
   

    if(req.body.password != req.body.confirm_password){
    return res.redirect('back');
  }
    user.findOne({email:req.body.email}, function(err, User){
           if(err){
            console.log('error in finding');
            return;
           }
      
        if(!User){
            user.create({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                

            }, function(err, user){
                if(err){
                    console.log('error in creating user');
                    return;
                }

                return res.redirect('/user/sign-in');
            })
        }else{
            console.log('user exists already');
            return res.redirect('/home');
        }
    });

}


module.exports.createSession = function(req, res){
    // to do later
     return res.redirect('/user/profile');
}

module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/home');
      });
}

module.exports.update = function(req, res){
     if(req.body.password != req.user.password){
        return res.redirect('/user/profile');
     }

     
}