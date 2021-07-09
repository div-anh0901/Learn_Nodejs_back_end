const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const argon2 = require('argon2')
require('dotenv').config();
const User = require('../models/User');
const verifyToken = require('../middleware/auth');

router.get('/', verifyToken,async(req,res)=>{
    try{
        const user = await User.findById(req.userId).select('-password');
        if(!user) return res.status(400).json({success : false, message : 'User not found'});

        res.json({success : true, user})
    }catch(e){

    }
})

router.post('/register', async(req,res)=>{
    console.log(req.body);
    const {username ,password} = req.body;
     if(!username && !password){
        return res.json(400)
                     .json({success : true, message : 'Missing username or password'})
     }    

     try {
         const user = await User.findOne({username});
         if(user){
            return res.status(400)
                        .json({success :false, message : 'Username already token'})
        }
        const hashPassword= await argon2.hash(password);
         const newUser = new User({username , password: hashPassword});
         await newUser.save();

         const accessToken = jwt.sign(
             {userId: newUser._id},
             process.env.ACCESS_TOKEN_SECRET
         )

         res.json({success : true, message : 'User create sucessFully!', accessToken});
    } catch (e) {
        res.status(500).json({success : false, message : 'Internel server error'})
     }
});


router.post('/login',async(req,res)=>{
    const {username , password} = req.body;
    if(!username && !password){
        return res.status(400)
                    .json({success : false, message : 'Missing username or password'});
    }
    try {
        const user = await User.findOne({username});
        if(!user){
            return res.status(400)
                        .json({success:false, message : 'user not found'})
        }
    
        const passwordValid = await argon2.verify(user.password,password);
        if(!passwordValid){
            return res.status(400)
                        .json({success : false, message : 'password not found'})
        }
    
        const accessToken = jwt.sign(
            {userId : user._id},
            process.env.ACCESS_TOKEN_SECRET
        )
    
        res.json({success: true, message: 'User logged in successFully!!',accessToken})
        
    } catch (e) {
        return res.status(500).json({success : false, message : 'Internal server not'})

    }
   


});


module.exports = router;