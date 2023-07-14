require('dotenv').config();
const port = process.env.mongoosePORT;
// Import required packages
const express = require('express');
const cors = require('cors');
// Create an Express application
const app = express();
app.use(cors());
app.use(express.json());

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
  age: Number
});
// Create a Mongoose model based on the schema
const usersModel = mongoose.model('users', usersSchema, 'users');

//Routes (API endpoints)
//Get
app.get('/', (req, res) => {
  usersModel.findOne().then((data)=>{
    res.json(data);
  });
});
//Insert
app.post('/', (req, res) => {
  const row = new usersModel(req.body);
  row.save().then((data)=>{
    res.json(data)
  });
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
