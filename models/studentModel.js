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
        required : true
    },
    idNum : {
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    points : {
        type : Number,
        default : 0
    },
    sumPoints : {
        type : Number,
        default : 0
    },
    eventsAttended : {
        type : String,
    }
})

const student = mongoose.model("student", studentSchema)

module.exports = student
