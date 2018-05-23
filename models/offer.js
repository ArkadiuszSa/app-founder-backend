const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    projectId: {
        type: String
    },
    teamId: {
        type: String
    },
    state:{
        type:String,
        enum:['new','accepted','rejected'],
        default:'new'
    },
    description: {
        type: String
    },
    timestamp: {
        type:String
    }
});

const Offer = mongoose.model('offer', offerSchema);

module.exports = Offer;