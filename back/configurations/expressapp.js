const express = require('express');
const cors = require('cors');
const multer = require('./multer');

const app = express();
app.use(cors());
app.use(express.json()); //req.body gets data from ajax requests payload
app.use(multer);
app.use(customParser); //parses the name of the photo in a new variable called "req.PHOTO_PARSED"

function customParser (req, res, next){
    if(req.file){req.PHOTO_PARSED = req.file.filename;}
    else{req.PHOTO_PARSED = req.body.selectedPhotoName;}
    next();
}

console.log('expressapp again !');

module.exports = app;