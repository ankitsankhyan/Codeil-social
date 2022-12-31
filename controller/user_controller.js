
// taking user schema in the file (model)
const user = require('../model/user');
module.exports.profile = function(req, res){
    return res.render('user', {
        title: 'Profile',
        user: req.user,
        local: res.locals
    });
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
    console.log(req.body);
   

    if(req.body.password != req.body.confirm_password){
    return res.redirect('back');
  }
    user.findOne({email:req.body.email}, function(err, User){
           if(err){
            console.log('error in finding');
            return;
           }
       console.log(User);
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