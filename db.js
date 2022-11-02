const Student = require('./models/studentModel')

const registerStudent = (s) =>{
    let nStudent = new Student(s)
    nStudent.save()
    .then((res) =>{
        console.log("Saved Student")
    }).catch((e) =>{
        console.log("Error saving student")
    })
}

module.exports = registerStudent