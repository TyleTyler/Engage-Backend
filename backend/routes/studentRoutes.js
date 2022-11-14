const express = require('express')
const mongoose = require('mongoose')
const { getAllStudents, getOneStudent, deleteStudent, updateStudent } = require('./routeFunction')
const router = express.Router()
const Student = require("../models/studentModel")

//End point to get all students
router.get('/', (req, res)=> getAllStudents(req, res))

//End point to get individual student or students with similar matching "anything"
router.get('/:param', (req, res) => getOneStudent(req, res))


//End point to delete a student
router.delete('/:id', (req, res)=> deleteStudent(req, res))

//End point to edit a Students attentance at an event (Points are inherit)
router.patch('/:id/:eventId', (req, res) => updateStudent(req, res))



module.exports = router