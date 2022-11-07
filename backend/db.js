const Student = require('./models/studentModel')

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
