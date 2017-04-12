/**
 | ---------------------------------------------------------
 | express
 | ---------------------------------------------------------
 */
const express = require('express');
const app = express();

const expressValidator = require('express-validator');
const expressSession = require('express-session');

/**
 | ------------------------------
 | Allow Access Control
 | ------------------------------
 */
var cors = require('cors');
app.use(cors());




/**
 | -----------------------------------------------------------------------------
 | middleware body-parser (json & http post)
 | -----------------------------------------------------------------------------
 */
// set body-parser middleware
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// validator start
app.use(expressValidator());

// session
app.use(expressSession({ secret: 'Max', saveUninitialized: false, resave: false}));

// middleware for assess public folder
app.use(express.static('public'));






/**
 | -----------------------------------------------------------------------------
 | mongoose Database Connection String
 | -----------------------------------------------------------------------------
 */
global.mongoose = require('mongoose');

// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/faiza');
mongoose.Promise = global.Promise;




/**
 | ---------------------------------------------------------
 | global variables
 | ---------------------------------------------------------
 */

global.globalUrl = 'http://localhost:3000';




/**
 | -----------------------------------------------------------------------------
 | calling all routes
 | -----------------------------------------------------------------------------
 */
 var route = require('./routes/route');
 route(app);



/**
 | -----------------------------------------------------------------------------
 | calling all APIs
 | -----------------------------------------------------------------------------
 */
 var api = require('./apis/api');
 api(app);




 /**
  | ----------------------------------------------------------------------------
  | error handling middleware V.V.I
  | ----------------------------------------------------------------------------
  */
 // app.use(function(err, req, res, next){
 //    // console.log(err);
 //
 //    var formField = err[Object.keys(err)[0]];
 //    var errResult = formField[Object.keys(formField)[0]];
 //
 //    res.status(422).send({ error: errResult.message });
 // });




/**
 | ---------------------------------------------------------
 | express-handlebars (template engine)
 | ---------------------------------------------------------
 */
var exphbs  = require('express-handlebars');

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'masterPage'
}));

app.set('view engine', 'hbs');

app.use('/assets', express.static('assets'));
app.use('/dist', express.static('dist'));




/**
 | ---------------------------------------------------------
 | Start Server
 | ---------------------------------------------------------
 */
app.listen('3000', function(){
    console.log('listening port 3000.');
})
