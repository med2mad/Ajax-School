const app = require('./configurations/expressapp');
const { body, query, param, check, validationResult, matchedData } = require('express-validator');

//API Routes (API endpoints)
const {getAll, add, edit, remove, notFound, subscribe} = require('./controllers/js/mysql');
const {getAlls, adds, edits, removes} = require('./controllers/orm/mysql');
//Get
app.get('/', getAll);
//Insert
app.post('/', add);
//Update
app.put('/:id', edit);
//Delete
app.delete('/:id', remove);

// const a = [query('name').trim().notEmpty(), param('name').trim().notEmpty(), body('name').escape().trim().notEmpty()];
app.post('/sub/:id', query('name1','msg'), (req, res, next)=>{

    res.send(validationResult(req));

});


//404
app.use(notFound);