require('dotenv').config();
const port = process.env.mysqlPORT || process.argv[2] || 5010;
// Import required packages
const express = require('express');
const cors = require('cors');

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
  database: "test"
});
con.connect((err) => {
  if (err){console.log("'Mysyql' initial connection error");}
  else{app.listen(port, ()=>{console.log("'Mysyql' Port: " + port);});}
});

//API Routes (API endpoints)
//Get All
app.get('/', (req, res) => {
  let q ="SELECT * FROM users WHERE name LIKE '%"+ req.query._name +"%'";
  if (req.query._age) {q += " AND age = '"+ req.query._age +"'";}
  q += " ORDER BY id DESC LIMIT "+ req.query._limit;
  con.query(q, (err, rows)=>{
    res.json(rows)
  }) 
});
//Insert
app.post('/', (req, res) => {
  con.query("INSERT INTO users (name, age, photo) VALUES ('"+ req.body.name +"', '"+ req.body.age +"', '"+ req.body.photo +"')", (err, data)=>{
    res.json(data.insertId)
  })
});
//Update
app.put('/:id', (req, res) => {
    con.query("UPDATE users SET name = '"+ req.body.name +"', age = '"+ req.body.age +"', photo = '"+ req.body.photo +"' WHERE id='"+ req.params.id +"'", (err, data)=>{
      res.json(data)
  })
});
//Delete
app.delete('/:id', (req, res) => {
    con.query("DELETE FROM users WHERE id='"+ req.params.id +"'", (err, data)=>{
      //GET Row to add instead
      con.query("SELECT * FROM users WHERE id=(SELECT Max(id) from users where id < '"+ req.query.lasttableid +"')", (err, rows)=>{
        res.send(rows)
      }) 
  });
});
//404
app.use((req, res) => {
  res.status(404).json("404 , no routes !")
}); 