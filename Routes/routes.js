const express = require('express')
const router = express.Router()
const registerStudent = require('../db')

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

module.exports = router