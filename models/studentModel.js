//Setting up the "Student" model and its properties
/**/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    grade : {
        type : Number, 
        required : true,
    } ,
    idNum : {
        type : Number,
        required : true
    },
    dob : {
        type : Date,
        required : true
    },
    email : mongoose.Mixed,
    points : {
        type : Number,
        default : 0
    },
    sumPoints : {
        type : Number,
        default : 0
    },
    eventsAttended : {
        type : Array,
        default : []
    }
})

const student = mongoose.model("student", studentSchema)

module.exports = student