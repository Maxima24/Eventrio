const express = require("express")
// const dotenv = require(dotenv)
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const globalErrorHandler  = require('./controllers/errorController')
const app = express()
app.use(morgan('dev'))
app.use(express.json()) 
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true 
}))
const userRouter = require('./routes/userRoute')
const eventRouter = require('./routes/EventRoute')
const AppError = require('./utils/appError')
app.use('/api/v1/users',userRouter)
app.use('/api/v1/events',eventRouter)
// Error handling
// app.all('*',(req,res,next)=>{
   
//     next(new AppError(`cant find ${req.originalUrl} on this server`,404))
// })
app.use(globalErrorHandler)

module.exports = app


