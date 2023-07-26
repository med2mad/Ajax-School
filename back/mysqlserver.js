require('dotenv').config();
const port = process.env.mysqlPORT;
// Import required packages
const express = require('express');
const cors = require('cors');
// Create an Express application
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

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
  q += " ORDER BY id DESC LIMIT "+req.query._limit;
  con.query(q, (err, rows)=>{
    res.json(rows)
  })
});
//Insert
app.post('/', async (req, res) => {
  con.query("INSERT INTO users (name, age) VALUES ('"+ req.body.name +"', "+ req.body.age +")", (err, data)=>{
    res.json(data)
  })
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
