const express = require('express');
const router = express.Router();
const User = require('../model/user.model');
const auth = require('../middleware/auth');
const crypto = require('crypto-js');

router.post('/register', async(req, res)=>{
        try{
            const {username} = req.body;
            var seed = username + new Date().getTime();
            const apikey = crypto.SHA512(seed).toString().slice(0,26);

            const userCreated = new User({username: username, apikey: apikey});
            await userCreated.save()
                .then(()=>console.log(`${username} has been successfully registered`))
                .catch((err)=>console.log(err));

            res.json({status:200, success:"New user created"});
        } catch (error){
            console.log(error);
        }
});

router.post('/login', auth.userAuth, async(req, res)=>{
    try{
        if (req.user){
            res.json({status:200, success:req.user})
        }
    } catch (error){
        console.log(error)
    }
});

module.exports = router;

