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

    var p3 = [
        {
            name: 'Shams Sadek'
        },
        {
            name: 'Nazmun Nahar'
        },
        {
            name: 'Shahida Chowdhury'
        }

    ];

    // send by promise all
    Promise.all([p1, p2, p3]).then( values => {

               res.render('user/user_list', {
                   userLists: values[0],
                   names: values[1],
                   users: values[2]
               });

    }).catch( reason => {
        console.log(res.send());
    });

})


// get
router.get('/create', (req, res, next) => {
        res.render('user/userRegistration');
});


// post
router.post('/create', (req, res, next) => {
        res.send(req);
});


/**
 | -----------------------------------------------------------------------------
 | route = /user/
 | -----------------------------------------------------------------------------
 | post
 */
router.post('/', function (req, res, next) {

    User.create(req.body).then(function(user){

            res.send(user);

        }).catch(next);

});



/**
 | -----------------------------------------------------------------------------
 | route = /api/user/:id
 | -----------------------------------------------------------------------------
 | delete
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