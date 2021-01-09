const express= require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const mongodb = require('mongodb')
const mongoose = require('mongoose')
const homeRoutes = require('./router')

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(homeRoutes)

mongoose.connect('mongodb+srv://muthukumar:muthukumar1234@cluster0.8ekgi.mongodb.net/candidates?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true }).then(success=>{
    app.listen(9080)
    console.log("db connexted")
}).catch(err=>{
    throw err
})