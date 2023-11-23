require('dotenv').config();
const port = process.env.mongoosePORT || process.argv[2] || 5020;//get port from 
// Import required packages
const express = require('express');
const cors = require('cors');
const multer = require('./configurations/multer');
// const expressFileupload = require('express-fileupload');

// Create an Express application
const app = express();
app.use(cors());
app.use(express.json()); //req.body gets data from ajax requests payload
// app.use(express.urlencoded({extended:true}));
app.use(multer);
app.use(customParser); //parses the name of the photo in a new variable called "req.PHOTO_PARSED"
// app.use(expressFileupload());

// Connect to MongoDB using Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/medDB', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    app.listen(port, () => {console.log("Mongoose: " + port);});
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
app.get('/', async (req, res) => {
  if(req.query._limit==0){res.json([]);}
  else{
    let q = {"name":{ $regex: '.*' + req.query._name + '.*' }};
    if (req.query._age) {q.age = req.query._age;}
      usersModel.find(q).sort({"timestamp":-1}).select("-__v -timestamp").limit(req.query._limit).then((data)=>{
      res.json(data);
    });
  }
});

//Insert
app.post('/', (req, res) => {
  req.body.photo = req.PHOTO_PARSED; //see schema

  const row = new usersModel(req.body);
  row.save().then((data)=>{
    res.json({"id":data._id, "photo":req.PHOTO_PARSED});
  });
});

//Update
app.put('/:id', (req, res) => {
  usersModel.findById(req.params.id).then((row)=>{
    row.name=req.body.name;
    row.age=req.body.age;
    row.photo=req.PHOTO_PARSED;
    row.save().then((data)=>{
      res.json({"photo":req.PHOTO_PARSED})
    });
  });
});
//Delete
app.delete('/:id', (req, res) => {
  usersModel.findOneAndDelete({"_id":req.params.id}).then((data)=>{
    //GET replacement row
    usersModel.find({"_id":{$lt:req.query.lasttableid}}).sort({"timestamp":-1}).select("-__v -timestamp").limit(1).then((data)=>{
      res.json(data);
    });
  });
});
//404
app.use((req, res) => {
  res.status(404).json("404 , no routes !")
});

function customParser (req, res, next){
  if(req.file){req.PHOTO_PARSED = req.file.filename;}
  else{req.PHOTO_PARSED = req.body.selectedPhotoName;}
  next();
}