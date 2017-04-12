/**
 | -----------------------------------------------------------------------------
 | user APIs
 | -----------------------------------------------------------------------------
 */
var express = require('express');
var router = express.Router();

/**
 | -----------------------------------------------------------------------------
 | user model
 | -----------------------------------------------------------------------------
 */
var User = require('./models/user');



// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})


/**
 | -----------------------------------------------------------------------------
 | get, Return all users route = /api/users
 | -----------------------------------------------------------------------------
 */
router.get('/', function (req, res, next) {

    // User.find({}, (err, data) => {
    //
    //     if (err) throw err;
    //
    //     else res.json(data);
    // })

    User.find({})
        // .select(['name'])
        .then( (user) => {
            res.send(user);
        })
})



/**
 | -----------------------------------------------------------------------------
 | post, route = /api/users/signup
 | -----------------------------------------------------------------------------
 */
router.post('/signup', function (req, res, next) {


    // store data
    User.create(req.body).then(function(user){

            res.send(user)

        }).catch(next)

});



/**
 | -----------------------------------------------------------------------------
 | post, route = /api/users/check-email-password
 | -----------------------------------------------------------------------------
 */
router.post('/login', function (req, res, next) {

    // res.send(req.body);
    User.findOne({
        email: req.body.email,
    }).then( (user) => {

        user.comparePassword(req.body.password, function(err, isMatch) {
             if (err) throw err;

             if(isMatch && isMatch == true) {
                //  req.session.user = user;
                 res.status(200).send(isMatch);
             }else {
                 res.status(401).send(isMatch);
             }

         });

    });

});



/**
 | -----------------------------------------------------------------------------
 | put, route = /api/users/:id
 | -----------------------------------------------------------------------------
 */
router.put('/:id', function (req, res, next) {

    User.findByIdAndUpdate(req.params.id, req.body, {new: false}).then( (user) => {

            User.findOne({_id: req.params.id}).then(function(user){
                res.send(user)
            })

        }).catch(next)
});



/**
 | -----------------------------------------------------------------------------
 | delete, route = /api/users/:id
 | -----------------------------------------------------------------------------
 */
router.delete('/:id', function (req, res, next) {

    User.findByIdAndRemove({ _id: req.params.id }).then( (user) => {

        res.send(user)

    }).catch(next)

});



// exports all APIs
module.exports = router;
