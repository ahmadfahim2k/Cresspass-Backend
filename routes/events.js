const express = require('express')
const router = express.Router()
const Event = require('../models/events')

//get all
router.get('/', async (req, res) => {
    try {
        const events = await Event.find()
        res.json(events)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})
//get one
router.get('/:id', getEvent,  (req, res) => {
    res.json(res.event)
})
//create one
router.post('/', async (req, res) => {
    const sDate = new Date(req.body.startYear, req.body.startMonth, req.body.startDay, req.body.startHour, req.body.startMinute)
    const eDate = new Date(req.body.endYear, req.body.endMonth, req.body.endDay, req.body.endHour, req.body.endMinute)
    // console.log(sDate.getTime())
    const event = new Event({ 
        name: req.body.name, //user id will be created automatically by mongo
        eventOrganizer: req.body.eventOrganizer,
        eventPoster: req.body.eventPoster,
        eventDescription: req.body.eventDescription,
        eventLocation: req.body.eventLocation,
        startDate: sDate, //gmt
        endDate: eDate, //gmt
        isApproved: false,
        approvedDate: "",
        userRegistered: [],
        tags: []
    })
    try {
        const checkEvent = await Event.findOne({name: req.body.name})
        if(checkEvent != null) {
            return res.status(400).json({message: "Event already exists"})
        }
        const newEvent = await event.save()
        res.status(201).json(newEvent)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})
//update one
router.patch('/:id', getEvent, async (req, res) => {
    if(req.body.eventPoster != null) {
        res.event.eventPoster = req.body.eventPoster
    }
    if(req.body.eventDescription != null) {
        res.event.eventDescription = req.body.eventDescription
    }
    if(req.body.eventLocation != null) {
        res.event.eventLocation = req.body.eventLocation
    }
    if(req.body.startDate != null) {
        res.event.startDate = Date(req.body.startDate)
    }
    if(req.body.endDate != null) {
        res.event.endDate = Date(req.body.endDate)
    }
    if(req.body.userRegistered != null) {
        res.event.userRegistered = req.body.userRegistered
    }
    if(req.body.tags != null) {
        res.event.tags = req.body.tags
    }

    try {
        const updatedEvent = await res.event.save()
        res.json(updatedEvent)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})
//delete one
router.delete('/:id', getEvent, async (req, res) => {
    try {
        await res.event.remove()
        res.json({ message: 'Deleted Event'})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})
//approve event

//middleware
async function getEvent(req, res, next) {
    let event;
    try {
        event = await Event.findById(req.params.id)
        if (event == null) {
            return res.status(404).json({message: "Cannot find event"})
        }
    } catch(err) {
        return res.status(500).json({message: err.message})
    }

    res.event = event
    next()
}

module.exports = router