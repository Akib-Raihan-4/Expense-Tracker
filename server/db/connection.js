
const mongoose = require('mongoose')

const conn = mongoose.connect(process.env.ATLAS_URI)
    .then(db=>{
        console.log("DB connected")
        return db
    }).catch(err=>{
        console.log("connection failed")
    })

module.exports = conn