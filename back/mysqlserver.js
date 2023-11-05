const port = process.env.mysqlPORT || process.argv[2] || 5010;
// Import required packages
const express = require('express');
const cors = require('cors');

// Create an Express application
const app = express();
app.use(cors());
// app.use(express.urlencoded({extended:true})); 
app.use(express.json());
app.use(express.static(__dirname));

const con = require('./configurations/mysql');
con.connect((err) => {
  if (err){console.log("'Mysyql' initial connection error");}
  else{app.listen(port, ()=>{console.log("'Mysyql' Port: " + port);});}
});

//API Routes (API endpoints)
const {getAll, add, edit, remove, notFound, addUser} = require('./controllers/mysqlCrl');
//Get All
app.get('/', getAll);
app.get('/sub/:rparam', (req, res)=>{console.log(req.body);console.log(req.params);console.log(req.query);});
//Insert
app.post('/', add);
app.post('/sub/:rparam', addUser);
//Update
app.put('/:id', edit);
//Delete
app.delete('/:id', remove);
//404
app.use(notFound);