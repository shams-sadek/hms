
// Schema Buildup
var Schema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Name field is required']
    },

    date: {
        type: Date,
        default: Date.now
    },

    createdBy: {
        type: Number,
        default: false
    },

    available: {
        type: Boolean,
        default: false
    },
});


module.exports = mongoose.model('investigation', Schema);
