const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config({path: './config.env'})
const port =  5000

//middleware
app.use(cors())
app.use(express.json())

//mongodb connection
const con = require('./db/connection')

//using Routes
app.use(require("./routes/route"))


con.then(db=>{
    if(!db)return process.exit(1)
    app.listen(port, ()=>{
        console.log("server is running on port: ", port)
    })
}).catch(error =>{
    console.log("Connection Failed")
})

