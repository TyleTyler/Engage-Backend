const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Event = require("../models/eventModel")
const { registerEvent } = require('../db')


router.get("/", (req, res) =>{
    res.json({
        msg: "These are all of the events"
    })
})

router.post("/create", (req, res) =>{
    registerEvent(req.body).then((data)=>{
        res.status(200).json({msg: "Saved " + req.body.eventName})
    }).catch(e =>{
        res.status(400).json({
            error: e
        })
    })
})


module.exports = router