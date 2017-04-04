var express = require('express')
var router = express.Router()


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})



var request = require("request")

// const got = require('got');

/**
 | -----------------------------------------------------------------------------
 | define the home page route
 | -----------------------------------------------------------------------------
 */
router.get('/', function (req, res) {


    var p1 = new Promise(function(resolve, reject){

        var url = globalUrl + '/api/user/list';

        request(url, function (error, response, body) {
                if (error) reject(error);
                resolve(body);
        });

    });

    var p2 = ['shams', 'sadek'];

    Promise.all([p1, p2]).then(function(values){

               res.render('home', { p1: values[0], p2: values[1] });

           });

})



module.exports = router
