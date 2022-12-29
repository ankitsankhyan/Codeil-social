module.exports.profile = function(req, res){
    return res.render('user', {
        title: 'Profile'
    });
}

module.exports.favarate_sport = function(req, res){
    res.end('<h1> Cricket is my fav game <h1>');
}


module.exports.sign_in = function(req, res){
    return res.render('sign_in.ejs',{
          title:'sign-in page'
    })
}