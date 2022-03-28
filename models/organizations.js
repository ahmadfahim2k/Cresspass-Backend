const mongoose = require('mongoose')
const userModel = require('./users')

const organizationSchema = new mongoose.Schema({
    //organization id is automatically created by mongo
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    members: {
        type: Array(Number), //user ID
        required: false
    },
    tags: {
        type: Array,
        required: false
    }
})

const organizationModel = mongoose.model("organization", organizationSchema)
module.exports = organizationModel