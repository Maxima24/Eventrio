const {promisify}= require('util')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync')

// run npm install jsonwebtoken
const signToken = id =>{
    return  jwt.sign({id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
}
exports.signup = catchAsync(async(req,res,next)=>{
    const newUser = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword
    })
    const token =signToken(newUser._id)
    res.status(201).json({
        status:"success",
        token,
        data:{
            user:newUser
        }
    })
})
exports.login =  async (req,res,next)=>{
    const {email,password} = req.body
    // check if email and password exists
    // if(!email || !password){
        
    // }

    // check if user exists
    const user = User.findOne({email}).select('+password')
    if(!user || !(await user.correctPassword(password,user.password)) ){
        return(next(appError('incorrect email or password',401)))
    }
    const token =""
    res.status(201).json({
        status:"success",
        token
    })
}
exports.protect = catchAsync(async(req,res,next)=>{
    // get token
    let token
    if (req.header.authorization && req.headers.authorization.startsWith('Bearer')){
                token = req.headers.authorization.split(" ")[1]
    }
    if(!token){
        return next(new AppError('you are not logge in, please login to regain access.',401))
    }

    // verify token
     const decoded = await promisify(jwt.verify(token,process.env.JWT_SECRET))  
    
    //check if user still exists
    //check if user changed password after the token had been isssued
}
)