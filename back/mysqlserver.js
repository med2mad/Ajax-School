require('dotenv').config();
const port = process.env.mysqlPORT;
// Import required packages
const express = require('express');
const cors = require('cors');
const multer = require('multer');
let n;
const strg = multer.diskStorage({ destination:'./uploads', //can give a function which makes it create the folder if doesn't exist
                                  filename: function(req,file,callback){n = Date.now()+file.originalname; callback(null,n);}
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

// Connect to Mysql2
const mysql = require('mysql2');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sqlDB"
});
con.connect((err) => {
  if (err){console.log("'Mysyql' initial connection error");}
  else{app.listen(port, ()=>{console.log("'Mysyql' Port: " + port);});}
});

//API Routes (API endpoints)
//Get All
app.get('/', async (req, res) => {
  let q ="SELECT * FROM users WHERE name LIKE '%"+ req.query._name +"%'";
  if (req.query._age) {q += " AND age = '"+ req.query._age +"'";}
  q += " ORDER BY id DESC LIMIT "+ req.query._limit;
  con.query(q, (err, rows)=>{
    res.json(rows)
  })
});
//Insert
app.post('/', async (req, res) => {
  con.query("INSERT INTO users (name, age, photo) VALUES ('"+ req.body.name +"', '"+ req.body.age +"', '"+ n +"')", (err, data)=>{
    n='';
    res.json(data)
  })
});
app.post('/upload', uploads.single("photo"), async (req, res) => {
  res.json('uploaded')
});
//Update
app.put('/:id', async (req, res) => {
    con.query("UPDATE users SET name = '"+ req.body.name +"', age = '"+ req.body.age +"' WHERE id='"+ req.params.id +"'", (err, data)=>{
      res.json(data)
  })
});
//Delete
app.delete('/:id', (req, res) => {
    con.query("DELETE FROM users WHERE id='"+ req.params.id +"'", (err, data)=>{
      res.json(data);
  });
});
//404
app.use((req, res) => {
  res.status(404).json("404 , no routes !")
});
