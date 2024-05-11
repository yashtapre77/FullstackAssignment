const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const cors = require("cors")
const authController = require("./controllers/authController")
const app = express()

//connect to database
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, ()=> console.log('MongoDb has connected successfully'))

//routes
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/auth',authController)

//connect to server
app.listen(process.env.PORT, ()=> console.log('Server has been started Successfully'))