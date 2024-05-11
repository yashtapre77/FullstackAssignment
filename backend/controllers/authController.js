const authController = require("express").Router()
const user = require(".../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

authController.post("/register",async(req,res) => {
    try{
        const isExisting = await User.findOne({email:req.body.email}) 
        if(isExisting){
            throw new Error("Already such an account")
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create({...req.body, password:hashedPassword})

        const {password,...other} = newUser._doc
        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:'5h'})

        return res.status(201).json({user:others, token})
    }catch(error){
        return res.status(500).json(error)
    }
})

authController.post("/login",async(req,res) => {
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user){
            throw new Error("Invailed Credentials")
        }

        const comaprePass = await bcrypt.compare(req.body.password, user.password)
        if(!comaprePass){
            throw new Error("Invailed Credentials")
        }

        const {password,...others} = user._doc
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'5h'})

        return res.status(200).json({user: others, token})
    }catch(error){
        return res.status(500).json(error)
    }
})

module.exports = authController