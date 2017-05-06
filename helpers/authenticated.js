
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

var logoutAuthenticated = function (req, res, next){
    if( req.isAuthenticated()){

        req.flash('success_msg', 'You are already logged in.');
        res.redirect('/');

    }else{
        return next();
    }
}


module.exports = {
    login: ensureAuthenticated,
    logout: logoutAuthenticated
};
