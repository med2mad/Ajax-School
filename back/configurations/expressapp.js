const express = require('express');
const cors = require('cors');
const multer = require('./multer');
const { querySanitizer } = require('../configurations/validations');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());
app.post('*', multer); app.put('*', multer);
app.post('*', photoParser); app.put('*', photoParser);//parses the name of the photo in a new variable called "req.PHOTO_PARSED"

app.post('*', verifyUser); app.put('*', verifyUser); app.delete('*', verifyUser);
app.use(querySanitizer());

function photoParser(req, res, next){
    if(req.file){req.PHOTO_PARSED = req.file.filename;}
    else{req.PHOTO_PARSED = req.body.selectedPhotoName;}
    next();
}

//verify user before any action in the app
function verifyUser(req, res, next) {
    console.log(req.path);
    if (req.path=='/auth/login' || req.path=='/signup'){next()}
    else{
        jwt.verify(req.body.token, 'serversecret', (err, decoded)=>{
            if(err){ res.send('action fail'); }else{next()}
        })
    }
}

module.exports.app = app;