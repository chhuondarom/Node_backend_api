var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    id_no: {
        type: String,
        required: true,
        maxlength: 8
    },
    full_name: {
        type: String,
        maxlength: 100,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type:Number,
        required:true
    }
});
var user = new mongoose.model('User', schema);
module.exports = user;