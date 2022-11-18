require('dotenv').config()
const mongoose = require('mongoose')
const sRoutes = require("./routes/studentRoutes")
const eRoutes = require("./routes/eventRoutes")
const express = require("express")
const app = express()
const dbUri = process.env.DBURI
const bp = require('body-parser')


app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect(dbUri, () =>{
app.listen(process.env.PORT, ()=>{
    console.log("Listening")
})})

app.use('/api/MERN/Students', sRoutes )
app.use('/api/MERN/Events' , eRoutes )

app.use((req, res) =>{
    res.send("This is not a page")
})




