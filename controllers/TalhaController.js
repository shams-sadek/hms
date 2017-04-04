
module.exports = function(app){

    app.get('/talha', function(req, res){

        // res.send('I am Talha');

        res.render('talha_html', { name: 'Faiza Fatema'});

    })
}
