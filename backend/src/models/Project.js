const mongoose = require('mongoose');
const schema = new mongoose.Schema({ title:{type:String,required:true,trim:true}, description:{type:String,required:true,trim:true}, tags:[{type:String,trim:true}], status:{type:String,trim:true,default:'In progress'}, liveUrl:{type:String,trim:true,default:''}, repoUrl:{type:String,trim:true,default:''} }, {timestamps:true});
module.exports = mongoose.model('Project', schema);
