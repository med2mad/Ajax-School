const fs = require('fs');
const multer = require('multer');

const storg = multer.diskStorage({destination: (req,file,callback)=>{
                                        const p = __dirname+'/../../public/uploads';
                                        fs.mkdirSync(p, {recursive:true});
                                        callback(null,p);
                                      }, 
                                  filename: (req,file,callback)=>{
                                        callback(null, file.originalname);
                                      }
                                });

const midleware = multer({storage: storg , 
                          limits: {fileSize:1024*1024*10} ,
                          fileFilter: (req, file, callback)=>{
                                if(file.mimetype.split("/")[0]!=="image")
                                  callback("Error: Only Images!", false);
                                else {return callback(null, true);}
                              }
                        });

module.exports = midleware.single("photo");