const express = require('express')
const mongoose = require('mongoose')
const { getAllStudents, getOneStudent, deleteStudent, updateStudentEvents, getTopTen, postStudent, getFilteredStuds, getRankedStuds, getRanks, updateStudentInfo } = require('./routeFunction')
const router = express.Router()
const Student = require("../models/studentModel")

//This end point returns a list of all possible students
router.get('/', (req, res)=> getAllStudents(req, res))

//This end point returns a list of the top 10 (of all time) students
router.get('/top10', (req, res) => getTopTen(req,res))

//This end point returns a specific student //?Given a name, id, or id#
router.get('/:param', (req, res) => getOneStudent(req, res))

//This end point retuns a list of filtered students //?Given an array of filters
router.get("/filter/:name", (req, res) => getFilteredStuds(req, res))


//This end point deletes a student //?Given a student database id
router.delete('/:id', (req, res)=> deleteStudent(req, res))

//This end point updates a student participation at any event //?Given a student and event databaseID
router.patch('/:id/:eventId', (req, res) => updateStudentEvents(req, res))

//This end point updates a students basic info //?Given a student databseID and a json body 
router.patch('/update/:id/:updateParams' , (req, res) => updateStudentInfo(req,res))


//This end point creates a student //?Given a json body based around student model
router.post('/', (req, res)=> postStudent(req, res)) 
module.exports = router