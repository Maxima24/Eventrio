const mongoose = require('mongoose')
// const 
const eventSchema = new mongoose.Schema({
    eventName:{
        type:String,
        required:[true,'An event must have a name'],
        unique:true,
        trim:true,
        maxlength:[40,"an event must have at most 40 characters"],
        minlength:[4,'a tour name must have more or  than 10 characters'],
       
    },
    date:{
        type:Date,
        required:[true,'an Event must have a date'],
    },
    location:{
        type:String,
        required:[true,'Location should be added']
    },
    status:{
        type:String,
        default:'upcoming'
    }
})
const Event = mongoose.model("Event",eventSchema)
module.exports = Event