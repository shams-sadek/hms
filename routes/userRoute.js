/**
 | -----------------------------------------------------------------------------
 | user Route
 | -----------------------------------------------------------------------------
 */
var express = require('express')
var router = express.Router()


//  request handler
var request = require("request")


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next();
})


/**
 | -----------------------------------------------------------------------------
 | Return all users route = /user/list
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
 | get => /users/create
 | -----------------------------------------------------------------------------
 */
router.get('/create', (req, res, next) => {

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
    req.check('name', 'Name field is required.').notEmpty();
    req.check('email', 'Email field is required.').notEmpty();

    var errors = req.validationErrors();
    if(errors){
         req.session.errors = {msg: errors[0].msg};
         res.redirect('/users/create');
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
