module.exports.profile = function(req, res){
    return res.render('user', {
        title: 'Profile'
    });
}

module.exports.favarate_sport = function(req, res){
    res.end('<h1> Cricket is my fav game <h1>');
}