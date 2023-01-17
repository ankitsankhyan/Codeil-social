module.exports.setFlash = function(req, res, next){
    // this middleware sends the whole data from req to response
//  flash is storing message in
// ask doubt related to this


console.log(req.flash('success'), 'in middleware');
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }
    console.log(res.locals.flash);
    next();
}