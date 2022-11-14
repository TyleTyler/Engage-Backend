const Student = require('./models/studentModel')


//Function to add a student to the "Students" Collection
const registerStudent = async (s) =>{
    
    let nStudent = new Student(s)
    try{   
        await nStudent.save()
    }
    catch(e){
        throw("Could not save student")
    }
    return nStudent
}

const Event = require('./models/eventModel')


//Fucntion to add an event to the "Events" Collection 
const registerEvent = async (e) =>{
    
    let nEvent = new Event(e)
    try{   
        await nEvent.save()
    }
    catch(e){
        throw("Could not save Event")
    }
    return nEvent
}

module.exports = { registerStudent , registerEvent }
