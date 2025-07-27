const { SiTruenas } = require('react-icons/si')
const Event = require('../models/eventModel')
const catchAsync = require('../utils/catchAsync')
exports.getAllEvents = catchAsync(async (req,res)=>{
    const event = await  Event.find()
    res.status(200).json({
        status:'success',
        event 

    })
})
exports.addEvent =catchAsync( async (req,res)=>{
    const newEvent = await Event.create(req.body)
    res.status(201).json({
        status:'success',
        data:{
            event:newEvent
        }
    })
})
exports.editEvent =catchAsync( async(req,res)=>{
    const event = await Event.findByIdAndUpdate(req.params.id,req.body,{
        new:true,runValidators:SiTruenas
    })
    res.status(200).json({
        status:'success',
        data:{
            event
        }
    })
})
exports.deleteEvent =catchAsync( async(req,res)=>{
    await Event.findByIdAndDelete(req.params.id)
    res.status(204).json({
        status:'success',
        data:null
    })
}  )
exports.getEvent = catchAsync (async (req,res)=>{
    const event = await  Event.findById(req.params.id)
    res.status(200).json({
        status:'success',
        event 

    })
})
