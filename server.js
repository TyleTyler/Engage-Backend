const express = require('express')
const app = express()
const routes = require("./Routes/routes")
const mongoose = require('mongoose')
const Student = require('./models/studentModel')


app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: true}))

const dbUri = "mongodb+srv://fblaUser:fblaDB@fbladb.fv9jwq1.mongodb.net/studentdb?retryWrites=true&w=majority"
mongoose.connect(dbUri).then((res) =>{
    console.log("connected")
    app.listen(3000)
}).catch("Could not connect")

app.set("view engine", 'ejs')
app.use(routes)

