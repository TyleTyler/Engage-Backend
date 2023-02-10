const express = require('express')
const router = express.Router()
const { getAllEvents, getOneEvent, createEvent, getFutureEvents, getFilteredEvents, getPossibleEvents, getListofEvents } = require('./routeFunction')

//This end points returns all possible events
router.get("/", (req,res) => getAllEvents(req,res))

//This end point returns all future events (in respect to the current date)
router.get("/future", (req, res)=> getFutureEvents(req, res))

//This end point returns a specific event //?Given an event ID
router.get("/:id", (req, res) => getOneEvent(req,res))

//This end point returns an array of filtered events //?Given an array of filters
router.get("/filter/:id", (req, res) => getFilteredEvents(req, res))

router.get("/list/:list", (req, res) => getListofEvents(req, res))

//This end point returns an array of events with starting with a //?Given string 
//*This end point is for the "search" feature
router.get("/name/:name", (req, res) => getPossibleEvents(req, res))



//This end point creates an event //?Given a proper event object body
router.post("/create", (req, res) => createEvent(req, res))





module.exports = router