require('dotenv').config();
const port = process.env.PORT;
// Import required packages
const express = require('express');
const cors = require('cors');
// Create an Express application
const app = express();
app.use(cors());
app.use(express.json());

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

//Routes (API endpoints)
//Get
app.get('/', async (req, res) => {
  con.query('SELECT * FROM users LIMIT 1', (err, rows)=>{
    res.json(rows)
  })
});
//Insert
app.post('/', async (req, res) => {
  console.log(req.body);  
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
  res.status(404).json("404 , no routes bitches !")
});
