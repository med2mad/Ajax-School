const express = require('express');
const cors = require('cors');
const multer = require('./multer');
const { querySanitizer } = require('../configurations/validations');
const responseTime = require('response-time');

const app = express();

app.use(cors({origin:'http://localhost:8080', exposedHeaders: '*'}));//cors + access x-response-time header
app.use(responseTime({suffix:false}));//add x-response-time to response headers

app.use(express.json());
app.post('*', multer, photoParser); app.put('*', multer, photoParser);

app.use(querySanitizer());

module.exports.app = app;



function photoParser(req, res, next){//parses the name of the photo in a new variable called "req.PHOTO_PARSED"
    if(req.file){req.PHOTO_PARSED = req.file.filename;}
    else{req.PHOTO_PARSED = req.body.selectedPhotoName;}
    next();
}