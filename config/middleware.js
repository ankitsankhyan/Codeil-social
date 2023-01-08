module.exports.setFlash = function(req, res, next){
    // this middleware sends the whole data from req to response
//  flash is storing message in
console.log(req.flash);
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }

    next();
}