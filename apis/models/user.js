
// Schema Buildup
var Schema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    // email: {
    //     type: String,
    //     unique: true,
    //     required: [true, 'email field is required']
    // },
    email: { type: String },
    password: { type: String},
    available: {
        type: Boolean,
        default: false
    }
});


//exports user collection
module.exports = mongoose.model('user', Schema);
