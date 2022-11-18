const express = require('express')
const mongoose = require('mongoose')
const student = require('../models/studentModel')
const router = express.Router()
const Student = require("../models/studentModel")

router.get('/', (req, res)=>{
    Student.find().then((data) =>{
        res.json({
            body: data 
        })
    })
    
})

router.get('/:name', (req, res) =>{
    let name = req.params.name
    Student.findOne({firstName : name}).then((student) =>{
        res.json({
            student: student
        })
    })
   
})

router.post('/', (req, res)=>{
    res.json({
        mssg: "Post a new workout"
    })
})

router.delete('/:id', (req, res)=>{
    res.json({
        mssg: "Delete a new workout"
    })
})
router.patch('/:id', (req, res)=>{
    res.json({
        mssg: "Update a new workout"
    })
})




module.exports = router