

// var customer = require(__dirname + '/../models/customer');
var Customer = require('./../models/customer');


var sadik = new Customer({
    name: 'Jasim Uddin',
    address: 'Netrokona'
})

module.exports = function(app) {

    app.get('/profile', function(req, res){

        res.render('profile', { arr: ['Faiza', 'Roshni', 'Jasim']});

    })

}
