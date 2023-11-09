const fs = require('fs');
const multer = require('multer');

const storg = multer.diskStorage({ destination: (req,file,callback)=>{
                                                  fs.mkdirSync('./public/uploads', {recursive:true});
                                                  callback(null,'./public/uploads');
                                                }, 
                                    filename: (req,file,callback)=>{
                                                callback(null, file.fieldname + '-' + file.originalname + Date.now());
                                              }
                                });

const midleware = multer({storage:storg , limits:{fileSize:1024*1024*1024} ,
                          fileFilter: (req, file, callback)=>{
                                        if(file.mimetype.split("/")[0]!=="image")
                                          callback("Error: Only Images!", false);
                                        else {return callback(null, true);}
                                      }
                        });

module.exports = midleware.single("photo");