const Student = require("../models/studentModel")
const { registerStudent }= require('../db')
const { registerEvent } = require('../db')
const mongoose = require('mongoose')
const Event = require("../models/eventModel")


let getAllEvents = (req, res) =>{
    Event.find().sort({eventDate : 'desc'})
    .then(data =>{
        res.json(data)
    })
}

let getOneEvent =  (req, res) =>{
    let id = req.params.id
    Event.findById(id)
    .then((event) =>{
        res.json(event)
    })
}

let createEvent = (req, res) =>{
    registerEvent(req.body).then((data)=>{
        res.status(200).json({msg: "Saved " + req.body.eventName})
    }).catch(e =>{
        res.status(400).json({
            error: e
        })
    })
}

let getAllStudents = (req, res)=>{
    Student.find().then((data) =>{
        res.json({
            body: data 
        })
    })
}
let getOneStudent = (req, res) =>{
    let numCheck = /\d/g
    let parameter = req.params.param
    console.log(numCheck.test(parameter))
    
    if(!(numCheck.test(parameter))){
        Student.find({firstName : parameter}).then((student) =>{
            res.json({
                student: student
            })
        })
        .catch(e =>{
            res.json({
                error : "Student does not exist"
                })
            }
        )        
    }
    else{
        Student.findById(parameter).then((student) =>{
            res.json({
                student: student
            })
        })
        .catch(e=>{
            res.json({
                error: "Error getting student"
                })   
            }
        ) 
    } 
}

let deleteStudent = (req, res)=>{
    Student.findByIdAndDelete(req.params.id).then((student)=> {
        res.json({
            success: "Deleted " + student.firstName
        })
    }).catch(e =>{
        res.status(400).json({
            fail: "Could not delete student"
        })
    })
}

let updateStudent = async (req, res)=>{
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
    
}

module.exports = { getAllEvents , getOneEvent , createEvent, getAllStudents,
    getOneStudent, deleteStudent, updateStudent  }