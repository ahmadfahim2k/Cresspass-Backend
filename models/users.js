const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    //user id is automatically created by mongo
    rrn: {
        type: String,
        required: true
    },
    name: {
        type:String, 
        required:true
    },
    email: {
        type: String,
        required: false
    },
    avatar: {
        type:String, //url
        required:false
    },
    membership: {
        type: Array(Number), // organization IDs
        required: false
    },
    eventsRegistered: {
        type: Array(Number),
        required: false // event IDs
    },
    tags: {
        type: Object,
        required: false
    },
    course: {
        type: String,
        required: false
    },
    yearOfStudy: {
        type: Number,
        required: false
    }
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
