const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    teamLeaderId: {
        type: String
    },
    projectsId: [{
        type: String
    }],
    membersId:[{
        type: String
    }],
    timestamp:{
        type: String
    },
    visable:{
        type: Boolean,
        default: false
    }
});

const Team = mongoose.model('team', teamSchema);

module.exports = Team;