const express = require('express');
const app = express();

const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const exphbs  = require('express-handlebars');
const expressValidator = require('express-validator');

const flash = require('connect-flash');

const expressSession = require('express-session');

const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

// database
global.mongoose = require('mongoose');
const mongo = require('mongodb');




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
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



/**
 | -------------------------------------------------------------------------------------------------------
 | express-validator [options], it must be added after bodyParser
 | In this example, the formParam value is going to get morphed into form body format useful for printing.
 | -------------------------------------------------------------------------------------------------------
 */
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));



// session
app.use(expressSession({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));


app.use(flash());

//passport auth ( by passportjs )
app.use(passport.initialize());
app.use(passport.session());


/**
 | ---------------------------------------------------------
 | global variables
 | ---------------------------------------------------------
 */
global.globalUrl = 'http://localhost:3000';

// Global vars
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})



/**
 | -----------------------------------------------------------------------------
 | middleware for assess public folder (set static folder)
 | -----------------------------------------------------------------------------
 */
app.use(express.static( path.join(__dirname, 'public') ));






/**
 | -----------------------------------------------------------------------------
 | mongoose Database Connection String
 | -----------------------------------------------------------------------------
 */
// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/faiza');
mongoose.Promise = global.Promise;







//access files from directory
app.use('/assets', express.static('assets'));
app.use('/dist', express.static('dist'));








/**
 | -----------------------------------------------------------------------------
 | calling all routes
 | -----------------------------------------------------------------------------
 */
 var route = require('./routes/route');
 route(app);



/**
 | -----------------------------------------------------------------------------
 | calling all APIs (2nd Part middleware)
 | -----------------------------------------------------------------------------
 */
 var api = require('./apis/api');
 api(app);




 /**
  | ----------------------------------------------------------------------------
  | error handling middleware V.V.I ( 3rd/Last Part middleware)
  | ----------------------------------------------------------------------------
  */
 app.use(function(err, req, res, next){
    // console.log(err);

    // var formField = err[Object.keys(err)[0]];
    // var errResult = formField[Object.keys(formField)[0]];
    // res.status(422).send({ error: errResult.message });

    // 422: Unprocessable Entity
    res.status(422).send({ error: err });
 });




/**
 | ---------------------------------------------------------
 | express-handlebars (template engine)
 | ---------------------------------------------------------
 */
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'masterPage'
}));

app.set('view engine', 'hbs');







/**
 | ---------------------------------------------------------
 | Start Server
 | ---------------------------------------------------------
 */
app.listen('3000', function(){
    console.log('listening port 3000.');
})
