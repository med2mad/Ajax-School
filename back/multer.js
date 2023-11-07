require('dotenv').config();
const port = process.env.multerPORT || process.argv[2] || 5999;
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const fs = require('fs');

const multer = require('multer');
let randomImgName;
const strg = multer.diskStorage({ destination: function(req,file,callback){fs.mkdirSync('./public/uploads', {recursive:true}); callback(null,'./public/uploads');}, 
                                  filename: function(req,file,callback){randomImgName =file.originalname+Date.now()+file.originalname; callback(null,randomImgName);}
                                });
const uploads = multer({storage:strg, fileFilter:function(req, file, cb){fileCheck(file, cb)}});
function fileCheck(file, cb) {
  if(file.mimetype.split("/")[0]!=="image")
    {cb("Error: Only Images!");}
  else {return cb(null, true);}
}

app.use(uploads.single("photo"));

//Insert
app.post('/upload', (req, res) => {
    res.json({newPhotoName:randomImgName})
});

app.listen(port, ()=>{console.log("'Multer' Port: " + port);});

module.exports = uploads.single("photo");