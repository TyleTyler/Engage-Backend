require('dotenv').config()
const mongoose = require('mongoose')
const sRoutes = require("./routes/studentRoutes")
const eRoutes = require("./routes/eventRoutes")
const express = require("express")
const app = express()
const dbUri = process.env.DBURI
const bp = require('body-parser')


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/MERN/Students', sRoutes )
app.use('/api/MERN/Events' , eRoutes )



mongoose.connect(dbUri, () =>{
app.listen(process.env.PORT, ()=>{
    console.log("Listening")
})})

console.log(process.env.PORT)


