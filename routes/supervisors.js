const express = require('express')
const router = express.Router()
const Supervisor = require('../models/supervisors')

//get all
router.get('/', async (req, res) => {
    try {
        const supervisors = await Supervisor.find()
        res.json(supervisors)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})
//get one
router.get('/:id', getSupervisor, (req,res) => {
    res.json(res.supervisor)
})
//create one
router.post('/', async (req,res) => {
    const supervisor = new Supervisor({
        name: req.body.name, //id is automatically created by mongo
        email: req.body.email,
        avatar: req.body.avatar
    })
    try {
        const checkSupervisor = await Supervisor.findOne({name: req.body.name})
        if(checkSupervisor != null) {
            return res.status(400).json({message: "Supervisor already exists"})
        }
        const newSupervisor = await supervisor.save()
        res.status(201).json(newSupervisor)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})
//update one
router.patch('/:id', getSupervisor, async (req, res) => {
    if(req.body.email != null) {
        res.supervisor.email = req.body.email
    }
    if(req.body.avatar != null) {
        res.supervisor.avatar = req.body.avatar
    }
    try {
        const updatedSupervisor = await res.supervisor.save()
        res.json(updatedSupervisor)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})
//delete one
router.delete('/:id', getSupervisor, async (req,res) => {
    try {
        await res.supervisor.remove()
        res.json({message: "Supervisor Removed"})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

//middleware
async function getSupervisor(req, res, next) {
    let supervisor
    try {
        supervisor = await Supervisor.findById(req.params.id)
        if (supervisor == null) {
            return res.status(404).json({message: "Supervisor not found"})
        } 
    } catch(err) {
        return res.status(500).json({message: err.message})
    }

    res.supervisor = supervisor
    next()
}

module.exports = router