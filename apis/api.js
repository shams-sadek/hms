/**
 | -----------------------------------------------------------------------------
 | All API are calling here...
 | -----------------------------------------------------------------------------
 */
module.exports = function(app){

    // users
    app.use('/api/users', require('./userApi'));

    // investigation
    app.use('/api/investigations', require('./investigationApi'));

}
