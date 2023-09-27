const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config({path: './config.env'})
const port = process.env.PORT || 5000

//middleware
app.use(cors())
app.use(express.json())

//using Routes
app.use(require("./routes/route"))

app.listen(port, ()=>{
    console.log("server is running on port: ", port)
})