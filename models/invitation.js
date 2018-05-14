const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invitationSchema = new Schema({
    userId: {
        type: String
    },
    teamId: {
        type: String
    },
    state:{
        type:String
    },
    description: {
        type: String
    },
    timestamp:{
        type: String
    }
});

const Invitation = mongoose.model('invitation', invitationSchema);

module.exports = Invitation;