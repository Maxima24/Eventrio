const mongoose = require('mongoose')
// const { MdOutlineLocalGroceryStore } = require('react-icons/md')
const validator = require('validator')
const bcrypt = require('bcrypt')
const userSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:[true," input your name"]
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        validate:[validator.isEmail,"pls provide a valid email"]
    },
    photo:{
        type:String,
    },
    password:{
        type:String,
        required:[true,"input your password"],
        minlength:8,
        select:false
    },
    confirmPassword:{
        type:String,
        required:[true,"confim your password"],
        validate:{
            validator: function(el){
                return el === this.password
            }
            ,messsage:
            "passswords are not the same"
        }
    }
})
userSchema.pre('save', async function(next){
    if(this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password,12) 
this.confirmPassword = undefined    
next()
})
userSchema.methods.correctPassword =  async function(candidatePassword,userPassword){
    return  await bcrypt.compare(candidatePassword,userPassword)
}
const User = mongoose.model("User",userSchema)
module.exports = User