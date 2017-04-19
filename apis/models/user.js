// var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
let SALT_WORK_FACTOR = 10;


var bcrypt = require('bcryptjs');


// Schema Buildup
var UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },

    email: {
        type: String,
        unique: true,
        required: [true, 'email field is required']
    },

    date: {
        type: Date,
        default: Date.now
    },

    password: {
        type: String
    },

    available: {
        type: Boolean,
        default: false
    }
});



/**
 | -----------------------------------------------------------------------------
 | password hashing
 | -----------------------------------------------------------------------------
 */
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

// retrive hashing...
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


// test a matching password
    //  user.comparePassword('Password123', function(err, isMatch) {
    //      if (err) throw err;
    //      console.log('Password123:', isMatch); // -> Password123: true
    //  });



// Schema.virtual('fullName').get(function () {
//   return this._id + ' ' + this.name;
// });


//exports user collection
var User = module.exports = mongoose.model('user', UserSchema);


// check username
module.exports.getUserByUserName = function(username, callback){
    var query = { name: username};
    User.findOne(query, callback);
}

// check id
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

// compare password
module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
}
