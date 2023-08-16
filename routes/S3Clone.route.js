const fs = require('fs');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.post('/createBucket', auth.userAuth, async(req, res)=>{
    const folderName = req.body.folderName;
    if (!folderName){
        return res.json({status: 400, message: "Folder name not given"});
    }
    
    const rootFolder = 'rootFolder'
    const folderPath = `${rootFolder}/${folderName}`;
    try {
        if(!fs.existsSync(rootFolder)){
            fs.mkdirSync(rootFolder);
        }
        if (!fs.existsSync(folderPath)){
            fs.mkdirSync(folderPath);
            return res.json({status: 200, message: "Bucket created"});
        } else {
            return res.json({status: 200, message: "Bucket already exists"});
        }

    } catch (error){
        console.log(error);
    }

})

module.exports = router;