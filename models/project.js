const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title:{
        type:String
    },
    description: {
        type: String
    },
    status: {
        type: String
    },
    ownerId: {
        type: String
    },
    budget:{
        currency:{
            type: String
        },
        value:{
            type: Number
        }
    },
    timestamp:{
        type: String
    },
    deadline:{
        type: String
    },
    technologies:[{
        type: String
    }],
    visable:{
        type: Boolean,
        default: false
    }
    

});

const Project = mongoose.model('project', projectSchema);

module.exports = Project;