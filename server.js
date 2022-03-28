//entry point for the api
//api setup, db setup
const express = require("express");
const app = express(); //used to operate the express operations

//using cors
const cors = require('cors');
app.use(cors());

//connecting to mongodb
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://ahmadfahim2k:y6SVdzLdytw5vqEU@cluster0.j0mmq.gcp.mongodb.net/cresspass?retryWrites=true&w=majority") 

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json());
//routes
const usersRoutes = require('./routes/users')
app.use('/users', usersRoutes)

const organizationsRoutes = require('./routes/organizations')
app.use('/organizations', organizationsRoutes)

const eventsRoutes = require('./routes/events')
app.use('/events', eventsRoutes)

const supervisorRoutes = require('./routes/supervisors.js')
app.use('/supervisors', supervisorRoutes)

//starting server
console.log("Pausers");
app.listen(6969, () => { //() => {} is a callback function, basically runs the moment you get your server up and running
    console.log(`Server running. 
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⣿⣿⣿⠿⠿⠟⠛⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠿⠿⠛⠿⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣯⣿⣿⣿⣛⡛⠛⠛⠿⠷⣦⣄⡀⠀⠀⠀⠀⠀⠈⣉⣻⣿⣿⣿⣿⣦⣤⣤⣄⣀⡀⠀⠀⠀⠀⠈⠙⠻⢿⣿⣿⣿
    ⣿⣿⣿⣻⣿⡿⠟⣋⣉⣁⣀⣈⣉⣛⠻⢶⣄⡀⠀⠈⠉⠀⠀⣀⣤⣶⣿⣿⣥⣤⣤⣤⣄⣀⣀⠈⠉⠉⠙⠛⠻⢶⣦⣀⠀⠀⠀⠙⢿⣿
    ⣿⣿⣿⣿⡷⠞⠋⠉⠀⠀⠀⠀⠀⠉⠛⠲⣌⡛⢶⣤⣤⣶⡟⢋⣩⡭⠷⠶⠛⠛⠶⠶⠭⢭⣝⡛⠷⣶⣄⡀⠀⠀⠈⠙⢷⣄⠀⠀⠀⠙
    ⣿⡿⠋⢁⣠⣤⣤⣤⣀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠲⣬⣿⡿⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠳⢤⡙⠻⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀
    ⡟⠀⣰⣿⡿⢿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⡽⠋⣠⣴⣾⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢦⣈⠙⠁⠀⠀⠀⠀⠀⠀⠀
    ⡇⠀⣿⣏⠀⠀⣹⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠘⠁⢰⣿⠟⠛⢿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠓⣄⠀⠀⠀⠀⠀⠀
    ⡆⠀⢿⣿⣷⣶⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⣿⣿⣄⠀⣸⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⠟⠀⠀⠀⠀⠀⠀
    ⣷⣄⠈⠙⠛⠛⠛⠉⠁⠀⠀⠀⠀⠀⠀⣀⣠⣾⣇⠀⠘⢿⣿⣿⣿⣿⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠴⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀
    ⣿⣿⡓⠶⠤⠤⠤⠤⠤⠤⠤⠤⠶⣒⡋⠉⠀⠘⢿⣦⡀⠀⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⠞⢁⣠⡾⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⣿⣿⣿⣷⣶⣶⡶⠶⠶⠶⠚⠛⠉⠉⠀⠀⠀⠀⠀⠹⣿⡲⠶⢤⣤⣀⣀⣀⣀⣀⣤⣤⠴⠶⠛⣉⣤⡶⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⣿⣿⣿⠿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠶⣦⣤⣬⣭⣭⣅⣤⣤⡴⠶⠞⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⣿⣿⣁⣠⣤⣤⣤⣶⣦⣤⣤⣤⣤⣤⣤⣤⣤⣄⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⣿⣿⠋⠁⠀⠀⣀⣀⣀⣀⣀⣀⣀⣉⣉⠉⠉⠉⠙⠛⠛⠿⢷⣶⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⣿⣿⣷⣄⠀⣾⣿⠉⠉⠉⠉⠉⠉⠉⠉⠙⠛⠛⠷⠶⣦⣤⣄⣀⡈⠉⠉⠛⠻⠷⣶⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⣿⣿⣿⣿⣆⠈⢿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠛⠛⠿⢷⣶⣦⣄⣀⠈⠉⠛⠻⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⣿⣿⣿⣿⣿⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠙⠿⣷⣦⡀⠀⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⣿⣿⣿⣿⣿⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣿⣷⠀⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⣿⣿⣿⣿⣿⠀⢸⣿⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⣠⣿⠟⠀⣾⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⣿⣿⣿⣿⣿⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⠟⠁⣠⣼⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⣿⣿⣿⣿⣿⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⡿⠃⢀⣼⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⣿⣿⣿⣿⣿⠀⣾⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡾⠋⠀⣠⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀
    ⣿⣿⣿⣿⣿⠀⢿⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⡶⠟⠋⢀⣤⣾⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿
    ⣿⣿⣿⣿⣿⠀⠀⠙⠿⣿⣷⣦⣤⣤⣤⣤⣤⣤⣤⣤⡶⠞⠋⠁⢀⣠⣶⡿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿
    ⣿⣿⣿⣿⣿⣷⣤⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣠⣤⣶⣿⠿⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿`);
}); 