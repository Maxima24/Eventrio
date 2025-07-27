const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
dotenv.config({path:'./.env'})
const app = require('./app')


const DB = process.env.DATABASE
mongoose.connect(DB,{useNewUrlParser:true}).then((con)=>{
    console.log("dcb connection successful")
})
const port = 3002
app.listen(port,()=>{
    console.log(`App running on port ${port}...`)
})