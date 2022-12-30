module.exports.profile = function(req, res){
    return res.render('user', {
        title: 'Profile'
    });
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
    return res.render('sign_in',{
        title: "Codiel| sign-in"
    });
}