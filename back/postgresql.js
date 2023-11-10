require('dotenv').config();
const port = process.env.postgreSQLPORT || process.argv[2] || 5030;
// Import required packages
const express = require('express');
const cors = require('cors');

// Create an Express application
const app = express();
app.use(cors());
app.use(express.json()); //for req.body to get data from ajax requests payload
app.use(express.urlencoded({extended:true}));

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

    // client.query("SELECT * FROM users", (err, rows)=>{
    //   console.log(rows.rows)
    // })

  });}
})

//API Routes (API endpoints)
//Get All
app.get('/', (req, res) => {
  let q ="SELECT * FROM users WHERE name LIKE '%"+ req.query._name +"%'";
  if (req.query._age) {q += " AND age = '"+ req.query._age +"'";}
  q += " ORDER BY id DESC LIMIT "+req.query._limit;
  client.query(q, (err, data)=>{
    res.json(data.rows);
  })
});
//Insert
app.post('/', (req, res) => {
  client.query("INSERT INTO users (name, age, photo) VALUES ('"+ req.body.name +"', "+ req.body.age +", '"+ req.body.photo +"') RETURNING id;", (err, data)=>{    
    res.json(data.rows[0].id)
  })
});
//Update
app.put('/:id', (req, res) => {
  client.query("UPDATE users SET name='"+ req.body.name +"', age = '"+ req.body.age +"', photo = '"+ req.body.photo +"' WHERE id='"+ req.params.id +"'", (err, data)=>{
    res.json(data)
  })
});
//Delete
app.delete('/:id', (req, res) => {
  client.query("DELETE FROM users WHERE id='"+ req.params.id +"'", (err, data)=>{
      //GET Row to add instead
      client.query("SELECT * FROM users WHERE id=(SELECT MAX(id) from users where id < '"+ req.query.lasttableid +"')", (err, rows)=>{
        res.send(rows.rows)
      }) 
  });
});
//404
app.use((req, res) => {
  res.status(404).json("404 , no routes !")
});
