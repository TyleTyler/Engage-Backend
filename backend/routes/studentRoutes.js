const express = require('express')
const mongoose = require('mongoose')
const { registerStudent }= require('../db')
const router = express.Router()
const Student = require("../models/studentModel")
const Event = require("../models/eventModel")


router.get('/', (req, res)=>{
    Student.find().then((data) =>{
        res.json({
            body: data 
        })
    })
    
})

router.get('/:id', (req, res) =>{
    let id = req.params.id
    Student.findOne(id).then((student) =>{
        res.json({
            student: student
        })
    })
   
})


router.delete('/:id', (req, res)=>{
    Student.findByIdAndDelete(req.params.id).then((student)=> {
        res.json({
            success: "Deleted " + student.firstName
        })
    }).catch(e =>{
        res.status(400).json({
            fail: "Could not delete student"
        })
    })
})


router.patch('/:id/:eventId', async (req, res)=>{
    let id = req.params.id
    let eId = req.params.eventId

    let nEvent = await Event.findById(eId)
    Student.findById(id). then((data) =>{
        data.eventsAttended.push(nEvent)
        data.points += nEvent.pointWorth
        data.sumPoints  += nEvent.pointWorth
        data.save()
        console.log( data.eventsAttended , data.points, data.sumPoints)
    }).catch(e =>{
        res.json({
            msg : "Couldn't update student"
        })
    })
    
})




module.exports = router