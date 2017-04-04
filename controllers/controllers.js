/*
 | -----------------------------------------------------------------------------
 | Loading controllers manually.
 | -----------------------------------------------------------------------------
 **/
module.exports = function(app) {


    require('./homeController')(app);

    require('./profileController')(app);

    // customer
    require('./customerController')(app);


    // User Registration
    require('./UserRegistrationController')(app);


    // User API
    require('./api/UserApi')(app);

}





/*
 | -----------------------------------------------------------------------------
 | Loading controllers dynamically for controllers directory.
 | -----------------------------------------------------------------------------
 **/
// var fs = require('fs');
//
// module.exports = function(app) {
//
//     // read all files in this directory
//     fs.readdir(__dirname, function(err, files) {
//         if (err) return;
//
//         files.forEach(function(fileName) {
//             var f = fileName.substr(0, fileName.lastIndexOf('.'));
//
//             require('./' + f)(app);
//         });
//     });
// }
