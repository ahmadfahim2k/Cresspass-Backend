const express = require('express')
const router = express.Router()
const Organization = require('../models/organizations')

//get all
router.get('/', async (req, res) => {
    try {
        const organizations = await Organization.find()
        res.json(organizations)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})
//get one
router.get('/:id', getOrganization, (req, res) => {
    res.json(res.organization)
})
//create one
router.post('/', async (req, res) => {
    const organization = new Organization({
        name: req.body.name,
        email: req.body.email,
        members: [],
        tags: []
    })
    try {
        const checkOrganization = await Organization.findOne({name: req.body.name})
        if(checkOrganization != null) {
            return res.status(400).json({message: "Organization already exists"})
        }
        const newOrganization = await organization.save()
        res.status(201).json(newOrganization)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})
//update one
router.patch('/:id', getOrganization, async (req, res) => {
    if(req.body.email != null) {
        res.organization.email = req.body.email
    }
    if(req.body.members != null) {
        res.organization.members = req.body.members
    }
    if(req.body.tags != null) {
        res.organization.tags = req.body.tags
    }
    try {
        const updatedOrganization = await res.organization.save()
        res.json(updatedOrganization)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})
//delete one
router.delete('/:id', getOrganization, async (req, res) => {
    try {
        await res.organization.remove()
        res.json({message: "Deleted organization"})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

//middleware
async function getOrganization(req, res, next) {
    let organization
    try {
        organization = await Organization.findById(req.params.id)
        if(organization == null) {
            return res.status(404).json({message: "Organization not found"})
        }
    } catch(err) {
        return res.status(500).json({message: err.message})       
    }

    res.organization = organization
    next()
}

module.exports = router