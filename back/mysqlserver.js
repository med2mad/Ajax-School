const port = process.env.mysqlPORT || process.argv[2] || 5010;
// Import required packages
const express = require('express');
const cors = require('cors');

// Create an Express application
const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true})); //for req.body to get data directly (no Ajax) from <form> text values (urlencoded)
app.use(express.json()); //for req.body to get data from ajax requests payload
app.use(express.static(__dirname));

const con = require('./configurations/mysql');
con.connect((err) => {
  if (err){console.log("'Mysyql' initial connection error");}
  else{app.listen(port, ()=>{console.log("'Mysyql' Port: " + port);});}
});

//API Routes (API endpoints)
const {getAll, add, edit, remove, notFound, addUser} = require('./controllers/mysql');
//Get All
app.get('/', getAll);
//Insert
app.post('/', add);
app.post('/sub', addUser, (req, res)=>{res.redirect('http://localhost:8080/axios')});
//Update
app.put('/:id', edit);
//Delete
app.delete('/:id', remove);
//404
app.use(notFound);