const mongoose = require('mongoose');
const schema = new mongoose.Schema({ name:{type:String,required:true,trim:true}, role:{type:String,required:true,trim:true}, location:{type:String,trim:true,default:''}, email:{type:String,trim:true,lowercase:true}, intro:{type:String,required:true,trim:true}, about:{type:String,trim:true,default:''}, availability:{type:String,trim:true,default:''} }, {timestamps:true});
module.exports = mongoose.model('Profile', schema);
