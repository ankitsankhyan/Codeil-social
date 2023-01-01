
// taking user schema in the file (model)
const { resolveObjectURL } = require('buffer');
const user = require('../model/user');
module.exports.profile = function(req, res){
     user.findOne({_id: req.cookies.user_id}, function(err, User){
        if(err){
            console.log('could not find user from cookie in profile');
        }
        console.log('in profile', User);
              if(User){
               return res.render('user_found.ejs', {
                    title: 'profile',
                    name: User.name,
                    email: User.email
                });
            
              }else{
                return res.redirect('/user/sign-in');
              }
     })

    
}
 
module.exports.favarate_sport = function(req, res){
    res.end('<h1> Cricket is my fav game <h1>');
}


module.exports.signup = function(req, res){
    return res.render('sign_up.ejs',{
          title:'sign-up page'
    })
}

module.exports.signIn = function(req,res){
    // cookie parser puts the cookie in response
    if(req.cookies.user_id != undefined){
        return res.redirect('/user/profile');
    }
    return res.render('sign_in',{
        title: "Codiel| sign-in"
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
                name: req.body.name

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
    
    user.findOne({email: req.body.email}, function(err, User){
        if(err){
            console.log('error in finding user');
            return;
        }
          console.log(User , 'in create session');
        if(User){
            if(User.password != req.body.password){
               return res.redirect('back');
            }else{

                // added cookie inside response
                // cookie is constructor which creates attribute inside cookie in response

                res.cookie('user_id',User.id);
                return res.redirect('/user/profile');
            }
        }
      
    })
}

module.exports.destroy = function(req, res){
    console.log(req.cookies, 'in destroy');
    res.clearCookie('user_id');
    return res.redirect('/user/sign-in');
}

