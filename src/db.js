const Student = require('./models/studentModel')
const Event = require('./models/eventModel')

//Function to add a student to the "Students" Collection
const registerStudent = async (s) =>{
    const {eventsAttended} = s
    if(eventsAttended){
        const totalPoints = await getTotal(eventsAttended)
        s = {...s, points : totalPoints, sumPoints : totalPoints}
    }
    let nStudent = new Student(s)
    try{   
        await nStudent.save()
    }
    catch(e){
        throw("Could not save student")
    }
    return nStudent
}


//Function for register page, gets total points of "Events already attended"
const getTotal = async (eventList) => {
    let points = 0
    for(let i = 0; i < eventList.length; i++){
        let nEvent = await Event.findById(eventList[i])
        points += nEvent.pointWorth
    }
    return points
}


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


