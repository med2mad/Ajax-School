require('dotenv').config();
const port = process.env.postgreSQLPORT;
// Import required packages
const express = require('express');
const cors = require('cors');
// Create an Express application
const app = express();
app.use(cors());
app.use(express.json()); //req.body gets data from ajax requests payload
app.use(express.urlencoded({extended:true})); //req.body gets <form> values

// Connect to PostgreSQL
const {Client} = require('pg');
const client = new Client({
  host: "localhost",
  user: "postgres",
  port:5432, //not necessary
  password: "5432",
  database: "test"
})
client.connect().then((err) => {
    if (err){console.log("'PostgreSQL' initial connection error");}
    else{app.listen(port, ()=>{console.log("PostgreSQL Port: " + port);
  });}
})

//API Routes (API endpoints)
//Get All
app.get('/', async (req, res) => {
  let q ="SELECT * FROM users WHERE name LIKE '%"+ req.query._name +"%'";
  if (req.query._age) {q += " AND age = '"+ req.query._age +"'";}
  q += " ORDER BY id DESC LIMIT "+req.query._limit;
  client.query(q, (err, rows)=>{
    res.send(rows.rows)
  })
});
//Insert
app.post('/', async (req, res) => {
  client.query("INSERT INTO users (name, age) VALUES ('"+ req.body.name +"', "+ req.body.age +")", (err, data)=>{    
    res.json(data)
  })
});
//Update
app.put('/:id', async (req, res) => {
  client.query("UPDATE users SET name='"+ req.body.name +"', age = '"+ req.body.age +"' WHERE id='"+ req.params.id +"'", (err, data)=>{
    res.json(data)
  })
});
//Delete
app.delete('/:id', (req, res) => {
  client.query("DELETE FROM users WHERE id='"+ req.params.id +"'", (err, data)=>{
    res.json(data);
  });
});
//404
app.use((req, res) => {
  res.status(404).json("404 , no routes !")
});
