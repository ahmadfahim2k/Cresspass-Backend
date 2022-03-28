const express = require('express')
const router = express.Router()
const User = require('../models/users')

// Getting all
router.get('/', async (req,res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})
// Getting one
router.get('/:id', getUser, (req,res) => {
    res.json(res.user)
})
// Creating one
router.post('/', async (req,res) => {
    
    const user = new User({ 
        rrn: req.body.rrn, //user id will be created automatically by mongo
        name: req.body.name,
        email: req.body.email,
        avatar: '',
        membership: req.body.membership,
        eventsRegistered: [],
        tags: []
    })
    try {
        const checkUser = await User.findOne({rrn: req.body.rrn})
        if(checkUser != null) {
            return res.status(400).json({message: "User already exists"})
        }
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})
// Updating one
router.patch('/:id', getUser, async (req,res) => {
    if(req.body.name != null) {
        res.user.name = req.body.name
    }
    if(req.body.email != null) {
        res.user.email = req.body.email
    }
    if(req.body.avatar != null) {
        res.user.avatar = req.body.avatar
    }
    if(req.body.membership != null) {
        res.user.membership = req.body.membership
    }
    if(req.body.eventsRegistered != null) {
        res.user.eventsRegistered = req.body.eventsRegistered
    }
    if(req.body.tags != null) {
        res.user.tags = req.body.tags
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})

// Deleting one
router.delete('/:id', getUser, async (req,res) => {
    try {
        await res.user.remove()
        res.json({ message: 'Deleted User'})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

//middleware
async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({message: "Cannot find user"})
        }
    } catch(err) {
        return res.status(500).json({message: err.message})
    }

    res.user = user
    next()
}


module.exports = router