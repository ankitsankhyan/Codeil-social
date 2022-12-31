module.exports.home = function(req, res){
  console.log(res.locals);
  return  res.render('home', {
      title : 'Home',
      local: res.locals
    })
}