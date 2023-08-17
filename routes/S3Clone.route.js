const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');
const { upload } = require('../middleware/multer');
const Uploads = require('../model/uploads.model');
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

router.get('/getFiles', auth.userAuth, async(req, res)=>{
    const bucketName = req.body.bucketName;
    console.log(req.body);
    if (!bucketName){
        return res.json({status: false, message:"Provide bucket name"});
    }
    try{
        const dirPath = path.join(`rootFolder/${bucketName}`);
        if (!fs.existsSync(dirPath)){
            return res.json({status: 404, message:"Bucket name is invalid"});
        }
        fs.readdir(dirPath, (err, files)=>{
            const allFiles = files.filter(file=>{
                const filePath = path.join(dirPath, file);
                return fs.statSync(filePath).isFile();
            });
            if (allFiles.length==0){
                return res.json({status: true, message:"No files found"});
            }
            return res.json({status: true, allFiles: allFiles});

        })
    } catch(error){
        console.log(error);
    }
})

router.get('/downloadFile/:folderName/:fileName', auth.userAuth, async(req, res)=>{
    const { folderName, fileName } = req.params;
    const filePath = `rootFolder/${folderName}/${fileName}`;
    if (!fs.existsSync(filePath)){
        return res.json({status: false, message: "Bucket name or file name invalid"});
    }
    res.setHeader('Content-Dispostion', `attachment; filename=${fileName}`);
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
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

router.post('/upload', auth.userAuth, upload().single('file'), async(req, res)=>{
    if (req.file){
        console.log(req.file);
        const fullpath = req.file.destination + req.file.filename;
        const uploadData = new Uploads({
            userId: req.user._id,
            filename: req.file.filename,
            mimetype: req.file.mimetype,
            path: fullpath

            
        })
        await uploadData.save();
        return res.json({status: 200, success: "File uploaded successfully"});
    }
})

router.delete('/deleteFile/:folderName/:fileName', auth.userAuth, async(req, res)=>{
    const { folderName, fileName } = req.params;
    if (!folderName || !fileName){
        return res.json({status: false, message: "Folder or File name not provided"});
    }
    const filePath = `rootFolder/${folderName}/${fileName}`;
    if(!fs.existsSync(filePath)){
        return res.json({status: false, message: "File does not exist"});
    }
    try {
        fs.unlink(filePath, (err)=>{
            console.log(err);
        })
        return res.json({message:"File deleted succesfully"});
    } catch (error) {
        console.log(error);
    }


})



module.exports = router;