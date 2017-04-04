
var Customer = require('./../models/customer');


module.exports = function(app){


    /**
     | -------------------------------------------------------------------------
     | Create Customer
     | -------------------------------------------------------------------------
     */
    app.get('/customer/create', function(req, res){

        // var query = Customer.find();

        var data = Customer.find({}, function(err, data){
                if (err) throw err;

                res.render('customer', { result: data});
        });


        // console.log(result);




        // res.send('Create Customer' + query);

    });


};/* end exports */
