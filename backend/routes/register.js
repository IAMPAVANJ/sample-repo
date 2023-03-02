const express=require('express');
const userModel = require("../Models/registerSchema");
const router = express.Router();
const bcrypt = require("bcrypt");
router.use(express.urlencoded({ extended: true }))
router.use(express.json())

router.post("/user/register", async(req,res)=> {
    
    try{
        const {name, email, phone, profession, password}=req.body;
        const check = await userModel.findOne({email:email});
        if(check) {
            return res.status(409).json({
                status:"Failed",
                message: "Email already exists"
            })
        }
        bcrypt.hash(password,10, async(err, cryptedPassword)=>{
            const result = await userModel.create ({
                name,
                email,
                phone:cryptedPassword,
                profession,
                password: cryptedPassword
            })
            return res.status(201).json({
                status: "Success",
                message: result
            })

            
        })
    }catch(e){
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
});

module.exports = router;