/**
 | -----------------------------------------------------------------------------
 | user Route
 | -----------------------------------------------------------------------------
 */
var express = require('express')
var router = express.Router()

var User = require('../apis/models/user');

//  request handler
var request = require("request")

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

 // passportjs route middleware
 var auth = require('../helpers/authenticated');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next();
})


/**
 | -----------------------------------------------------------------------------
 | Return all users route = /users
 | -----------------------------------------------------------------------------
 */
router.get('/', (req, res, next) => {

    var p1 = new Promise( (resolve, reject) => {

        var url = globalUrl + '/api/users';

        request(url, (error, response, body) => {

                if (error) reject(error);

                resolve( JSON.parse(body) );
        });


    })

    var p2 = ['shams', 'sadek', 'faiza'];



    // send by promise all
    Promise.all([p1, p2]).then( values => {

               res.render('user/userList', {
                   userLists: values[0],
                   names: values[1],
                   users: values[2]
               });

    }).catch( reason => {
        console.log(res.send());
    });

})


/**
 | -----------------------------------------------------------------------------
 | get => /users/login
 | -----------------------------------------------------------------------------
 */
router.get('/login', auth.logout, (req, res, next) => {

        res.render('user/login');

});




/**
 | -----------------------------------------------------------------------------
 | passport js for users/login (post method)
 | -----------------------------------------------------------------------------
 */
 passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
  function(email, password, done) {

      // check username
      User.getUserByEmail(email, function(err, user){
           if (err) { return done(err); }

           if (!user) {
             return done(null, false, { message: 'Incorrect email address.' });
           }

          //check password
          User.comparePassword(password, user.password, function(err, isMatch){
               if (err) { return done(err); }
              if(isMatch){
                  return done(null, user);
              }else {
                  return done(null, false, {message: "Invalid password"});
              }
          });// comparePassword()

      });// getUserByUserName()

  }// function
));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});


/**
 | -----------------------------------------------------------------------------
 | post => /users/login
 | -----------------------------------------------------------------------------
 */
// router.post('/login', (req, res, next) => {
//     User.find({ name: req.body.username }, (err, data) => {
//         res.send(data);
//     })
//     // res.send('sdfsd');
// }

        // );
router.post('/login',
            passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/users/login',
                failureFlash: true
            }),
            function(req, res){

                // res.redirect('/');
            }
        );




/**
 | -----------------------------------------------------------------------------
 | get => /users/logout
 | -----------------------------------------------------------------------------
 */
router.get('/logout', (req, res, next) => {

        req.logout();

        req.flash('success_msg', 'You are logged out.');

        res.redirect('/users/login');

});



/**
 | -----------------------------------------------------------------------------
 | get => /users/register
 | -----------------------------------------------------------------------------
 */
router.get('/register', (req, res, next) => {

        res.render('user/userRegistration', { errors: req.session.errors});

        req.session.errors = null;
});


/**
 | -----------------------------------------------------------------------------
 | post => /users/register
 | -----------------------------------------------------------------------------
 */
router.post('/register', (req, res, next) => {

    // res.status(200).json(req.body);
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;


    // check validation
    req.checkBody('name', 'Name is required.').notEmpty();
    req.checkBody('email', 'Email is required.').notEmpty();
    req.checkBody('email', 'Email is not valid.').isEmail();
    req.checkBody('password', 'Password is required.').notEmpty();
    req.checkBody('password2', 'Password does not match.').equals(req.body.password);

    var errors = req.validationErrors();
    if(errors){

        res.render('user/userRegistration', {
            errors: errors
        });
    //      req.session.errors = errors;
    //      res.redirect('/users/create');
    }else{ // not errors

        // set api post url to save data
        var url = globalUrl + '/api/users/signup';


        var data = {
            name: name,
            email: email,
            password: password
        }

        // promise-1
        var p1 = new Promise( (resolve, reject) => {
            request.post({url: url, form: data }, (err,httpResponse,body) => {

                         if (err) reject(err);

                         else resolve(body);

                    });
        });// p1

        // apply promises
        Promise.all([p1]).then( values => {

            var result = JSON.parse(values[0]);

            if (result.error) {
                req.flash('error_msg', 'Already Exists This Email. Please Try Again.');

                res.redirect('/users/register');

            } else { // success if passed
                req.flash('success_msg', 'You are registered. Now you can login.');

                res.redirect('/users/login');
            }


        }).catch( reason => {
            req.flash('error_msg', 'Err in code. Please Check It.');

            res.redirect('/users/register');
        })

    }

});


/**
 | -----------------------------------------------------------------------------
 | post => /user/
 | -----------------------------------------------------------------------------
 */
router.post('/', function (req, res, next) {

    User.create(req.body).then(function(user){

            res.send(user);

        }).catch(next);

});



/**
 | -----------------------------------------------------------------------------
 | delete => /api/user/:id
 | -----------------------------------------------------------------------------
 */
router.delete('/:id', function (req, res, next) {

    User.findByIdAndRemove({ _id: req.params.id }).then(function(user){

        res.send('user');
    })

});


/**
 | -----------------------------------------------------------------------------
 | route = /api/user/:id
 | -----------------------------------------------------------------------------
 | delete
 */
router.put('/:id', function (req, res, next) {

    User.findByIdAndUpdate(req.params.id, req.body, {new: false}).then(function(user){

            res.send(req.body);

        }).catch(next);

});


// exports all APIs
module.exports = router;
