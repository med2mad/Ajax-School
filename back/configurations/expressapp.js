const express = require('express');
const cors = require('cors');
const multer = require('./multer');
const { querySanitizer } = require('../configurations/validations');

const app = express();
app.use(cors());

app.post('*', multer); app.put('*', multer);
app.use(express.json());
app.use(express.urlencoded( {extended:false} )) ;

app.use((req, res)=>{res.send(req.body)});


app.post('*', photoParser); app.put('*', photoParser);//parses the name of the photo in a new variable called "req.PHOTO_PARSED"
app.use(querySanitizer());

function photoParser(req, res, next){
    if(req.file){req.PHOTO_PARSED = req.file.filename;}
    else{req.PHOTO_PARSED = req.body.selectedPhotoName;}
    next();
}

module.exports.app = app;
