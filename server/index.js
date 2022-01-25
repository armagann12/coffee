const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv")
const route = require("./routes/route")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
dotenv.config()

app.listen(3001, () => {
    console.log("App Listening at PORT 3001")
  })

const serverURL = process.env.SERVER_URL;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

mongoose.connect(serverURL, connectionParams)
    .then( () => {
        console.log('Connected to the Database')
    })
    .catch( (err) => {
        console.error("Error connecting to the database.", err);
    })

app.use(express.json());
app.use(cors())
app.use(bodyParser.json());
app.use("/", route)