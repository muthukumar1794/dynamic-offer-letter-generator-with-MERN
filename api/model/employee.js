const mongoose = require('mongoose')
const Schema = mongoose.Schema
const employeeSchema = new Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
mobNo:{
    type:String,
    required:true
},
city:{
    type:String,
    required:true
},
state:{
    type:String,
    required:true
},
zip:{
    type:Number,
    required:true
},
selected:{
    type:Boolean,
    default:0
}
})

module.exports = mongoose.model('employee',employeeSchema)