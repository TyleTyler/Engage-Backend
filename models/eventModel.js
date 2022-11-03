
const mongoose =require('mongoose')
const eventSchema = mongoose.Schema({
    eventName: {
        type: String,
        required :true
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventType: {
        type: String,
        required: true
    },
    pointWorth:{
        type: Number,
        required: true
    }
})

const event = mongoose.model('event', eventSchema)

module.exports = event