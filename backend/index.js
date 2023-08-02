require('dotenv').config()
const express = require('express')
const cors = require('cors')
// const { Configuration, OpenAIApi } = require('openai')
const { router } = require('./router/routes.js')
const { uploadImage } = require('./controller/image-controller.js')
const DBConnection = require('./database/db.js')
const app = express()


app.use(cors())
app.use(express.json())

app.use('/', router)

// Connecting to DataBase
DBConnection()


// Listening
app.listen(5000 , (req,res) => {
    console.log('Serving on port 5000');
})