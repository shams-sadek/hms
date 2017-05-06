
var express = require('express')
var router = express.Router()

var request = require("request")

let url = globalUrl + '/api/investigations';

router.get('/', (req, res, next) => {

    var p1 = new Promise( (resolve, reject) => {

            request(url, (error, response, body) => {

                    if (error) reject(error);
                    resolve( JSON.parse(body) );
            });

    });

    // send by promise all
    Promise.all([p1]).then( values => {

               res.render('investigation/list', {
                   lists: values[0],
                   globalUrl: globalUrl
               });

    }).catch( reason => {
        console.log(res.send());
    });

});


router.get('/create', (req, res, next) => {
    res.render('investigation/create')
});


router.post('/create', (req, res, next) => {

    sendUrl = url;

    request.post({
            url:sendUrl,
            form: req.body
        },
            function(err, httpResponse, body){

            if (err) throw err;


            var msg = JSON.parse(httpResponse.body);
            console.log(msg);

            if(typeof msg.error === "object"){
                req.flash('error_msg', msg.error.errmsg);
            }else{
                req.flash('success_msg', 'Successfully Created');
            }

            res.redirect('/investigation');
        })

    // res.render('investigation/create')
});



/**
 | -----------------------------------------------------------------------------
 | edit
 | -----------------------------------------------------------------------------
 */
router.get('/edit/:id', (req, res, next) => {
    // res.send(req.params.id);

    var url = globalUrl + '/api/investigations/' + req.params.id;

    var p1 = new Promise( (resolve, reject) => {

        request(url, (error, response, body) => {

                if (error) reject(error);

                resolve( JSON.parse(body) );
        });

    })

    Promise.all([p1]).then( values => {

        res.render('investigation/edit', {
            data: values[0]
        })

    }).catch( reason => {
        res.send(reason)
    })



});// edit


/**
 | -----------------------------------------------------------------------------
 | update
 | -----------------------------------------------------------------------------
 */
router.post('/update', (req, res, next) => {

    // res.send(req.params.id);

    sendUrl = url + "/" + req.body._id;

    var requestData = { name: req.body.name };

    request.put({
            url:sendUrl,
            form: requestData
        },
            function(err, httpResponse, body){

            if (err) throw err;

            var msg = JSON.parse(httpResponse.body);

            if(typeof msg.error === "object"){
                req.flash('error_msg', msg.error.message);
            }else{
                req.flash('success_msg', 'Successfully Updated');
            }


            res.redirect('/investigation/edit/' + req.body._id);
        })



});// update




module.exports = router;
