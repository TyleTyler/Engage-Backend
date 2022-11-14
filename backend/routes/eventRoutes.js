const express = require('express')
const router = express.Router()
const { getAllEvents, getOneEvent, createEvent } = require('./routeFunction')

//End point to display every event
router.get("/", (req,res) => getAllEvents(req,res))

//End point to get one event
router.get("/:id", (req, res) => getOneEvent(req,res))


//End point to create an event
router.post("/create", (req, res) => createEvent(req, res))


module.exports = router