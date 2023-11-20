// Import required packages
const express = require('express');
const cors = require('cors');
// const multer = require('./configurations/multer');
const expressFileupload = require('express-fileupload');
const mysqlCon = require('./configurations/mysql');

// Create an Express application
const app = express();
app.use(express.static(__dirname)); 
app.use(cors());
app.use(express.json());
// app.use(multer);
app.use(expressFileupload());


const port = process.env.mysqlPORT || process.argv[2] || 5010;
mysqlCon.connect((err) => {
  if (err){console.log("'Mysyql' initial connection error");}
  else{app.listen(port, ()=>{console.log("'Mysyql' Port: " + port);});}
});
//in MVC use : const conn = await mysqlCon.createConnection({ database: test }); //OR send a function as parameter

//API Routes (API endpoints)
const {getAll, add, edit, remove, notFound, subscribe} = require('./controllers/mysqlCrl');
//Get All
app.get('/',  getAll);
//Insert
app.post('/sub', subscribe);
app.post('/', (req, res) => {
  let photoName = req.body.selectedPhotoName;
  if(req.files){photoName = req.files.photo.name+'.'+req.files.photo.mimetype.split("/")[1];}
  if(req.files){req.files.photo.mv( ''+photoName, (err, result)=>{});}
  
  con.query("INSERT INTO users (name, age, photo) VALUES ('"+ req.body.name +"', '"+ req.body.age +"', '"+ photoName +"')", (err, data)=>{
      res.json({"id":data.insertId, "photoName":photoName});
  });
});
//Update
app.put('/:id', edit);
//Delete
app.delete('/:id', remove);
//404
app.use(notFound);