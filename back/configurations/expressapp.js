const express = require('express');
const cors = require('cors');
const { body, query, param, check, validationResult, matchedData } = require('express-validator');
const multer = require('./multer');


const app = express();
app.use(cors());
app.use(express.json()); //req.body gets data from ajax requests payload
app.use(multer);
app.use(photoNameParser); //parses the name of the photo in a new variable called "req.PHOTO_PARSED"
// app.use(namevalidation());
// app.use(agevalidation());

module.exports.agevalidation = function agevalidation() {
    return body('age').isNumeric();
}
module.exports.errors = validationResult;

function photoNameParser(req, res, next){
    if(req.file){req.PHOTO_PARSED = req.file.filename;}
    else{req.PHOTO_PARSED = req.body.selectedPhotoName;}
    next();
}

module.exports.app = app;
