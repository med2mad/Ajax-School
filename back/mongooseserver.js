require('dotenv').config();
const port = process.env.mongoosePORT;
// Import required packages
const express = require('express');
const cors = require('cors');

const multer = require('multer');
let randomImgName;
const strg = multer.diskStorage({ destination: function(req,file,callback){callback(null,'./uploads');}, 
                                  filename: function(req,file,callback){randomImgName = Date.now()+file.originalname; callback(null,randomImgName);}
                                });
const uploads = multer({storage:strg, fileFilter:function(req, file, cb){fileCheck(file, cb)}});
function fileCheck(file, cb) {
  if (file.mimetype.split("/")[0]!=="image")
      {cb("Error: Only Images!");}
  else {return cb(null, true);}
}

// Create an Express application
const app = express();
app.use(cors());
app.use(express.json()); //req.body gets data from ajax requests payload
app.use(express.urlencoded({extended:true})); //req.body gets <form> values

// Connect to MongoDB using Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/medDB', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    app.listen(port, () => {console.log('Mongoose Port: ' + port);});
  })
  .catch((err) => {
    console.log('Mongoose initial connextion error: ', err);
  });

// Define a schema for the 'users' collection
const usersSchema = new mongoose.Schema({
  name: String,
  age: Number,
  photo: String,
  timestamp:{type:Date,
            default: function(){return new Date()}}
});
// Create a Mongoose model based on the schema
const usersModel = mongoose.model('users', usersSchema, 'users');

//API Routes (API endpoints) 
//Get All
app.get('/', (req, res) => {
  if(req.query._limit==0){res.json([]);}
  else{
    let q = {"name":{ $regex: '.*' + req.query._name + '.*' }};
    if (req.query._age) {q.age = req.query._age;}
    usersModel.find(q).sort({"timestamp":-1}).limit(req.query._limit).then((data)=>{
      res.json(data);
    });
  }
});
//Insert
app.post('/', (req, res) => {
  req.body.photo=randomImgName;
  const row = new usersModel(req.body);
  row.save().then((data)=>{
    randomImgName='';
    res.json(data)
  });
});
app.post('/upload', uploads.single("photo"), async (req, res) => {
  res.json('uploaded')
});
//Update
app.put('/:id', (req, res) => {
  usersModel.findById(req.params.id).then((row)=>{
    row.name=req.body.name;
    row.age=req.body.age;
    row.save().then((data)=>{
      res.json(data)
    });
  });
});
//Delete
app.delete('/:id', (req, res) => {
  usersModel.findByIdAndDelete(req.params.id).then((data)=>{
    res.json(data);
  });
});
//404
app.use((req, res) => {
  res.status(404).json("404 , no routes !")
});
