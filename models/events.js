const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    //event id is automatically created by mongo
    name: {
        type: String,
        required: true
    },
    eventOrganizer: {
        type: String,
        required: true
    },
    eventPoster: {
        type: String, //url
        required: false
    },
    eventDescription: { 
        type: String,
        required: false
    },
    eventLocation: {
        type: String,
        required: false
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: false
    },
    isApproved: {
        type: Boolean,
        required: true,
        default: false
    },
    approvedDate: {
        type: Date,
        required: false
    },
    usersRegistered: {
        type: Array(Number), // user IDs
        required: false
    },
    tags: {
        type: Array,
        required: false
    }

})

const eventModel = mongoose.model("event", eventSchema)
module.exports = eventModel