const app = require('./configurations/expressapp');
const { body, query, param, check, validationResult, matchedData } = require('express-validator');

//API Routes (API endpoints)
const {getAll, add, edit, remove, notFound, subscribe} = require('./controllers/js/mysql');
const {getAlls, adds, edits, removes} = require('./controllers/orm/mysql');
//Get
app.get('/', getAlls);
//Insert
app.post('/', body('*').notEmpty(), (req, res, next)=>{if(validationResult(req).isEmpty()){next()}} , add);
//Update
app.put('/:id', edits);
//Delete
app.delete('/:id', removes);

// const a = [query('name').trim().notEmpty(), param('name').trim().notEmpty(), body('name').escape().trim().notEmpty()];
app.post('/sub/:id', query('*').notEmpty(), (req, res, next)=>{

    res.send(validationResult(req));

});


//404
app.use(notFound);