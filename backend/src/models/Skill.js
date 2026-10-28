const mongoose = require('mongoose');
const schema = new mongoose.Schema({ name:{type:String,required:true,trim:true}, category:{type:String,required:true,trim:true}, level:{type:String,trim:true,default:'Learning'} }, {timestamps:true});
module.exports = mongoose.model('Skill', schema);
