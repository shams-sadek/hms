/**
 | -----------------------------------------------------------------------------
 | Home Controller
 | -----------------------------------------------------------------------------
 */

var ejs = require('ejs');

var fs = require('fs');


module.exports = function(app){


    /**
     | -----------------------------------------------------------------------------
     | Home
     | -----------------------------------------------------------------------------
     */
    app.get('/', function(req, res){

        // res.send('Bus Reservation System');
        res.render('home', { name: 'Shams Sadek'});

    });

    /**
     | -----------------------------------------------------------------------------
     | Profile Page
     | -----------------------------------------------------------------------------
     */
    // app.get('/profile', function(req, res){
    //
    //     var viewArgs = { mobile: '01761-586077' };
    //
    //     // pass variable in additional view file
    //     var messageHtml = ejs.renderFile(__dirname + '/../views/partials/header.ejs', viewArgs, function(err, str){
    //         if (err) throw err;
    //
    //         return str;
    //     });
    //
    //
    //     var data = { name: 'Shams Sadek', age: 90, hobbies: ['eating', 'fighting', 'fishing'], header: messageHtml};
    //
    //
    //     // res.redirect('/');
    //     res.render('profile', data);
    //
    // });



    /**
     | -----------------------------------------------------------------------------
     | Contact Page
     | -----------------------------------------------------------------------------
     */
    app.get('/contact', function(req, res){

        var data = { address: 'Dhaka'};

        res.render('contact', data);

    });
}
