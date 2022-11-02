const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
    firstName : {
        type : String,
        required : true
    }
})

const student = mongoose.model("student", studentSchema)

module.exports = student
