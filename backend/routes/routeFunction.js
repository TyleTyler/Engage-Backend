const Student = require("../models/studentModel")
const { registerStudent }= require('../db')
const { registerEvent } = require('../db')
const mongoose = require('mongoose')
const Event = require("../models/eventModel")
const student = require("../models/studentModel")


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

let getPossibleEvents = (req, res) =>{
    let name = req.params.name
    let possibleNames = []
    Event.find()
    .then(events =>{
        events.forEach(event =>{
            console.log(event)
            if(event.eventName.toLowerCase().includes(name.toLowerCase())){
                possibleNames.push(event)
            }
        })
        res.send(possibleNames)
    })
}

let getFutureEvents = async (req, res) =>{
    let currentDate = new Date()
    let eventList = await Event.find().sort({eventDate : "desc"})
    let futureEvents = []

    eventList.forEach(event =>{
        if(event.eventDate >= currentDate){
            futureEvents.push(event)
        }
    })

    res.json({futureEvents : futureEvents})
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

let getFilteredEvents = (req, res) =>{
    
    let filters = req.params.id.indexOf(",") == -1 ? req.params.id.split(".") : req.params.id.split(",").map( e=> e.split("."))
    // console.log(filters)
    Event.find().sort([filters]).then( fEvents =>{
        res.json(fEvents)
    })}

let getFilteredStuds = (req, res) =>{

    let filters = req.params.name.indexOf(",") == -1 ? req.params.name.split(".") : req.params.name.split(",").map( e=> e.split("."))
    Student.find().sort([filters]).then( fEvents =>{
        res.json(fEvents)
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
let getTopTen = async (req, res) =>{
    let data  = await Student.find().sort({sumPoints : "desc"})
    let rankMap = [];
    for(let i = 0; i < 10; i++){
        rankMap.push(data[i])
    }
    res.json(rankMap)
}

let updateStudent = async (req, res)=>{
    let id = req.params != null ? req.params.id : req
    let eId = req.params != null ? req.params.eventId : res

    let nEvent = await Event.findById(eId)
    Student.findById(id).then((data) =>{
        if(!(data.eventsAttended.includes(nEvent))){
            data.eventsAttended.push(nEvent)
        }
        console.log(data.points)
        console.log(nEvent.pointWorth)
        data.points += nEvent.pointWorth
        data.sumPoints  += nEvent.pointWorth
        data.save()
    }).catch(e =>{
        res.json({
            msg : "Couldn't update student"
        })
    })
}


let postStudent = async (req, res) => {
    registerStudent(req.body).then((data)=>{
        res.status(200).json({msg: `Saved ${req.body.firstName} ${req.body.lastName}`})
    }).catch(e =>{
        res.status(400).json({
            error: e
        })
    })
}

module.exports = { getAllEvents , getOneEvent , createEvent, getAllStudents,
    getOneStudent, deleteStudent, updateStudent, getTopTen , postStudent, getFutureEvents, getFilteredEvents,
    getPossibleEvents, getFilteredStuds  }