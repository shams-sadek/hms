
/**
 | -----------------------------------------------------------------------------
 | this is for passportjs route middleware
 | -----------------------------------------------------------------------------
 */
var ensureAuthenticated = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('error_msg', 'You are not logged in.');
        res.redirect('/users/login');
    }
}


module.exports = ensureAuthenticated;
