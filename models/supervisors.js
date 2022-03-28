const mongoose = require('mongoose')

const supervisorSchema = mongoose.Schema({ 
    //supervisor id is automatically created by mongo
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String, // url
        required: false
    }
})

const supervisorModel = mongoose.model("supervisor", supervisorSchema)
module.exports = supervisorModel