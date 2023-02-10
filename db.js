const Student = require('./models/studentModel')
const Event = require('./models/eventModel')

//?This function takes in a student JSON parameter and upload it to the database
const registerStudent = async (student) =>{
    /* 
    *If the eventsAttended property is found in the student parameter
    * it will be added to their total points*/
    const {eventsAttended} = student
    if(eventsAttended){
        const totalPoints = await getTotal(eventsAttended)
        student = {...student, points : totalPoints, sumPoints : totalPoints}
    }
    let nStudent = new Student(student)
    try{   
        await nStudent.save()
    }
    catch(e){
        throw("Could not save student")
    }
    return nStudent
}


//?This function intakes an array list of eventID's
//*It returns the total amount of points of all the events together
const getTotal = async (eventList) => {
    let points = 0
    for(let i = 0; i < eventList.length; i++){
        let nEvent = await Event.findById(eventList[i])
        points += nEvent.pointWorth
    }
    return points
}


//?This function takes in a json body with the event model
//*This function returns the same json body if saved successfully 
const registerEvent = async (event) =>{
    
    let newEvent = new Event(event)
    try{   
        await newEvent.save()
    }
    catch(error){
        throw("Could not save Event")
    }
    return newEvent
}

module.exports = { registerStudent , registerEvent }


