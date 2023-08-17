const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');
const { upload } = require('../middleware/multer');
const express = require('express');
const router = express.Router();

router.get('/getBuckets', auth.userAuth, async(req, res)=>{
    const rootPath = path.join('rootFolder');

    fs.readdir(rootPath, (err, buckets)=>{
        const directories = buckets.filter((bucket)=>{
            const filePath = path.join(rootPath, bucket);
            return fs.statSync(filePath).isDirectory();
        })
        if (directories.length!==0){
            return res.json({status: 200, success: directories});
        } else if(directories.length==0){
            return res.json({status: 404, message: "No Buckets found"});
        }
    })
})
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

});
router.post('/upload', auth.userAuth, upload().single('file'), (req, res)=>{
    if (req.file){
        return res.json({status: 200, success: "File uploaded successfully"});
    }
})

module.exports = router;