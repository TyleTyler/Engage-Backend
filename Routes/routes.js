const express = require('express')
const router = express.Router()
const registerStudent = require('../db')
const Student = require('../models/studentModel')

router.get("/", (req, res) =>{
    res.render("mainPage", { header : 'Main Page'})
})

router.get("/create", (req, res) =>{
    res.render("create", { header : "Create Page"})
})

router.post("/save-student", (req, res) =>{
    console.log(req.body)
    registerStudent(req.body)
    res.redirect("/")
})

router.get("/Student:name", (req, res) =>{
    let name = req.params.name
    let header = req.params.name.charAt(1).toUpperCase() + req.params.name.slice(2)

    Student.find({ firstName: header}).then(student=>{
        if(student.length === 0){
            res.render('errStud', { header: "Error:(", student: `${header}`})
        }else{
            console.log(student)
            res.render('student', {header : `${header}'s Report`, student: student})
        }
    }).catch((e)=>{
        console.log(e)
    })
})


module.exports = router