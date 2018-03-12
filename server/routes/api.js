const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const video = require('../models/video');

const db = 'mongodb://ram:ram123@ds163418.mlab.com:63418/appointment';
mongoose.Promise = global.Promise;
mongoose.connect(db, (err) =>{
    if(err){
        console.log('error! '+ error);
        
    }
});
router.get('/videos', (req,res) => {
    console.log(res);
    video.find({}).
    exec((err, videos)=>{
        if(err){
            console.log("error");
            
        }else {
            res.json(videos);
        }
    })
});
router.get('/videos/:id', (req,res) => {
    console.log(res);
    video.findById(req.params.id).
    exec((err, video)=>{
        if(err){
            console.log("error");
            
        }else {
            res.json(video);
        }
    })
});

router.delete('/video/:id', (req,res) => {
    console.log(res);
    video.findByIdAndRemove(req.params.id, (err, deletvideo) => {
        if(err){
            console.log("error");
            
        }else {
            res.json(deletvideo);
        }
    });
});

router.put('/video/:id', (req,res) => {
    console.log(res);
    video.findByIdAndUpdate(req.params.id,
        {
        $set: {
            title:req.body.title,
            url:req.body.url,
            description:req.body.description,
         
        }
    },
    {
        new:true
    },
    (err, updatevideo) => {
        if(err) {
            console.log(err);
        }else {
            res.json(updatevideo);
        }
    }
);

});

router.post('/video', (req,res) => {
    console.log(res);
    let newvideo = new video();
    newvideo.title = req.body.title;
    newvideo.url = req.body.url;
    newvideo.description = req.body.description;
    newvideo.save((err, nsertvideo) =>{
        if(err){
            console.log(err);
        }else {
            res.json(nsertvideo);
        }
    })
});

module.exports = router;