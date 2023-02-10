const Student = require("../models/studentModel")
const { registerStudent }= require('../db')
const { registerEvent } = require('../db')
const mongoose = require('mongoose')
const Event = require("../models/eventModel")
const student = require("../models/studentModel")
const date = (new Date).toLocaleDateString()


//!This function is to reset the Students points at the end of the quarter
if(date == "1/24/2022" || date == "4/10/2022"){
    Student.aggregate([
        {
            $set:{
                totalPoints : { $add : ["$totalPoints", "$points"]},
                points : 0
            }
        }
    ])
}else{
    console.log("Today is " + date+ ", it is not yet the end of the quater")
}


const getRankedStuds = async (filters) =>{
    let studs;
    if(filters)
        { studs = await Student.aggregate([
            {
                $addFields : {
                    rankPoints : {$divide : 
                        [{$add:["$points", {$divide:["$sumPoints",2]}]},2]}
                }
            },
            {
                $setWindowFields:{
                    sortBy : filters,
                    output:{
                        rank: {
                            $rank : {}
                        }
                    }
                }
            }
        ])
    }else{
            { studs = await Student.aggregate([
                {
                    $addFields : {
                        rankPoints : {$divide : 
                            [{$add:["$points", {$divide:["$sumPoints",2]}]},2]}
                    }
                },
                {
                    $setWindowFields:{
                        sortBy :{"rankPoints" : -1},
                        output:{
                            rank: {
                                $rank : {}
                            }
                        }
                    }
                }
            ])
        }
    }
    // console.log(studs)
    return (studs)
}


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

let getListofEvents = async (req, res) =>{
    let list = req.params.list.split(".")
    let eventList = []
    for(id of list){
        let event = await Event.findById(id)
        eventList.push(event)
    }
    res.json(eventList)
}

let getPossibleEvents = (req, res) =>{
    let name = req.params.name
    let possibleNames = []
    Event.find()
    .then(events =>{
        events.forEach(event =>{
            // console.log(event)
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

let getFilteredEvents = async (req, res) =>{
    let filters = [];
    let params = req.params.id.indexOf(",") == -1 ? req.params.id.split(".") : req.params.id.split(",").map( e=> e.split("."))
    filters.push(params[0])
    filters.push(params[1])
    console.log(filters)
    let finalEvents = []

    const sortedEvents = await  Event.find().sort([filters])
    if(params[2]){
        let name = params[2].toString()
        for(event of sortedEvents){
            if(event.eventName.toLowerCase().includes(name.toLowerCase())){
                finalEvents.push(event)
            }
        }   
    }
    console.log("___________________    ")
    res.json(finalEvents.length >= 1 ? finalEvents : sortedEvents)
    
}

let getFilteredStuds = async (req, res) =>{

    let filters = [];
    let finalStuds =[];
    let finalFilter = {}
    let studParam;
    if(req){
        studParam = req.params.name.split(",").map(e=> e.split("."))
        filters.push(studParam[0][0])
        filters.push(studParam[0][1])
        finalFilter[filters[0]] = parseInt(filters[1])
    }
 
    const studs = await getRankedStuds(filters.length >= 1 ? finalFilter : false )
   

    if(studParam[1]){
        let name = studParam[1].toString()
        for(students of studs){
            if(students.firstName.toLowerCase().includes(name.toLowerCase()) ||students.lastName.toLowerCase().includes(name.toLowerCase())  ){
                finalStuds.push(students)
            }
        }   
        // console.log(finalStuds)
    }
    res.json(finalStuds.length >= 1 ? finalStuds : studs)
}

let getAllStudents = (req, res)=>{
    Student.find().then((data) =>{
        res.json({
            body: data 
        })
    })
}



let getOneStudent = async (req, res) =>{
    let numCheck = /\d/g
    let parameter = req.params.param
    getRankedStuds(false).then(students => {
        for(stud of students){
           if(stud.idNum == parameter){
            console.log(stud)
            res.json(stud)
           }
        }
    })
    .catch(e =>{
        res.json({
            error : "Student does not exist"
            })
        }
    )        
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

let updateStudentEvents = async (req, res)=>{
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

let updateStudentInfo = async (req, res)=>{
    let id = req.params.id
    let {updateParams} = req.params 
   
    if(updateParams.indexOf(".") != -1){
       updateParams = updateParams.split(".").map( e =>{ return e.split(",")})
       updateParams.forEach(e =>{
         let tempParam ={}
         tempParam[e[0]] = e[1]
         Student.findOneAndUpdate({idNum : id}, {
            $set: tempParam
        }).then(e=>{console.log("Updated Stud")})
        })

        
    }else{
        updateParams = updateParams.split(",")
        let tempParam ={}
        tempParam[updateParams[0]] = updateParams[1]
        Student.findOneAndUpdate({idNum : id}, {
            $set: tempParam
        }).then(e=>{console.log("Updated Stud")})
    }

    Student.findOne({idNum : id})
    .then(updatedStud => {
        res.json(updatedStud)
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


let getRanks = (req, res)=>{
  getRankedStuds().then(studs =>{res.json(studs)})
}



module.exports = { getAllEvents , getOneEvent , createEvent, getAllStudents,
    getOneStudent, deleteStudent, updateStudentEvents, getTopTen , postStudent, getFutureEvents, getFilteredEvents,
    getPossibleEvents, getFilteredStuds , getListofEvents, getRankedStuds, getRanks, updateStudentInfo}