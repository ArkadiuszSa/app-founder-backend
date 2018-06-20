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
        type:String,
        enum:['new','inProgress','finished'],
        default:'new'
    },
    ownerId: {
        type: String
    },
    budget:{
        currency:{
            type: String,
            enum:['$'],
            default:'$'
        },
        value:{
            type: String,
            default:'to negotiation'
        }
    },
    timestamp:{
        type: Date
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
    

}

);


const Project = mongoose.model('project', projectSchema);

module.exports = Project;