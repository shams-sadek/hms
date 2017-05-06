/**
 | -----------------------------------------------------------------------------
 | user APIs
 | -----------------------------------------------------------------------------
 */
var express = require('express');
var router = express.Router();

/**
 | -----------------------------------------------------------------------------
 | investigation model
 | -----------------------------------------------------------------------------
 */
var Investigation = require('./models/investigation');



// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})


/**
 | -----------------------------------------------------------------------------
 | get, Return all investigations route = /api/investigation
 | -----------------------------------------------------------------------------
 */
router.get('/', function (req, res, next) {

    // User.find({}, (err, data) => {
    //
    //     if (err) throw err;
    //
    //     else res.json(data);
    // })

    Investigation.find({})
        // .select(['name'])
        .then( (data) => {
            res.send(data);
        })
})


/**
 | -----------------------------------------------------------------------------
 | get, route = /api/investigations/:id
 | -----------------------------------------------------------------------------
 */
router.get('/:id', function (req, res, next) {

    Investigation.findById(req.params.id, {new: false})
                 .then( (data) => {

                        res.send(data)

                 }).catch(next)
});


/**
 | -----------------------------------------------------------------------------
 | post, route = /api/investigations/
 | -----------------------------------------------------------------------------
 */
router.post('/', function (req, res, next) {

    Investigation.create(req.body)
                 .then(function(data){
                    res.send(data)
                 })
                 .catch(next)
});



/**
 | -----------------------------------------------------------------------------
 | put, route = /api/investigations/:id
 | -----------------------------------------------------------------------------
 */
router.put('/:id', function (req, res, next) {

    Investigation.findByIdAndUpdate(req.params.id, req.body, {new: false})
                 .then( (data) => {

                        Investigation.findOne({_id: req.params.id})
                        .then(function(data){
                            res.send(data)
                        })

                 }).catch(next)
});



/**
 | -----------------------------------------------------------------------------
 | delete, route = /api/investigations/:id
 | -----------------------------------------------------------------------------
 */
router.delete('/:id', function (req, res, next) {

    Investigation.findByIdAndRemove({ _id: req.params.id }).then( (user) => {

        res.send(user)

    }).catch(next)

});



// exports all APIs
module.exports = router;
