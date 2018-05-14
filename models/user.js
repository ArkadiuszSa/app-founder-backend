const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fName: {
        type: String
    },
    lName: {
        type: String
    },
    description:{
        type: String
    },
    email: {
        type: String
    },
    password: {
        type:String
    },
    country: {
        type: String
    },
    city:{
        type: String
    },
    bDay:{
        type: String
    },
    technologies:[{
        type:String
    }],
    timestamp:{
        type: String
    },

});

const User = mongoose.model('user', userSchema);

module.exports = User;