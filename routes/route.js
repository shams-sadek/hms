
/**
 | -----------------------------------------------------------------------------
 | All Routes are calling here...
 | -----------------------------------------------------------------------------
 */
module.exports = function(app){

    // home page
    app.use('/', require('./home'));


    // example of birds route
    // app.use('/birds', require('./birds'));


    // user
    app.use('/users', require('./userRoute'));



}
