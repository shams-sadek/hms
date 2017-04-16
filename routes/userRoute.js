/**
 | -----------------------------------------------------------------------------
 | user Route
 | -----------------------------------------------------------------------------
 */
var express = require('express')
var router = express.Router()


//  request handler
var request = require("request")

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

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
router.get('/login', (req, res, next) => {

        res.render('user/login');

});



/**
 | -----------------------------------------------------------------------------
 | post => /users/login
 | -----------------------------------------------------------------------------
 */

 passport.use(new LocalStrategy(
  function(username, password, done) {
    // User.findOne({ username: username }, function (err, user) {
    //   if (err) { return done(err); }
    //   if (!user) {
    //     return done(null, false, { message: 'Incorrect username.' });
    //   }
    //   if (!user.validPassword(password)) {
    //     return done(null, false, { message: 'Incorrect password.' });
    //   }
    //   return done(null, user);
    // });
  }
));

// router.post('/login', (req, res, next) => {
//
//         res.send(req.body);
//         // res.render('user/login');
//
// });

router.post('/login',
            passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/login'
            }),
            function(req, res){
                res.redirect('/');
            }
        );




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
 | post => /users/create
 | -----------------------------------------------------------------------------
 */
router.post('/create', (req, res, next) => {

    // check validation
    req.checkBody('name', 'Name field is required.').notEmpty();
    req.checkBody('email', 'Email field is required.').notEmpty();

    var errors = req.validationErrors();
    if(errors){
         req.session.errors = errors;
         res.redirect('/users/create');
    }else{
        res.send('success');
    }


    var url = globalUrl + '/api/users';

    // promise-1
    var p1 = new Promise( (resolve, reject) => {
        request.post({url: url, form: req.body }, (err,httpResponse,body) => {

                     if (err) reject(err);

                     else resolve(body);

                });
    });// p1


    // apply promises
    Promise.all([p1]).then( values => {

        res.send(values[0]);

    }).catch( reason => {
        res.send('hi');
        // res.send(reason);
    })


    res.redirect('/users');
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
